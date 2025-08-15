import express from "express";
const router = express.Router();

async function fetchWithRetry(url, options, retries = 3, timeout = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (retries > 0 && (error.name === 'AbortError' || error.code === 'UND_ERR_CONNECT_TIMEOUT')) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1, timeout);
    }
    
    throw error;
  }
}

router.get("/:username", async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("GitHub Token is missing!");
      return res.status(500).json({ error: "Server configuration error - GitHub token is missing" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "DevDash",
    };

    const username = req.params.username;

    let response;
    try {
      response = await fetchWithRetry(`https://api.github.com/users/${username}`, {
        headers: headers,
      });
    } catch (error) {
      console.error(`Failed to fetch user data after retries:`, error);
      return res.status(503).json({ 
        error: "GitHub API is currently unavailable. Please try again later.",
        details: error.message 
      });
    }

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} - ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `GitHub API error: ${response.status} - ${response.statusText}`
      });
    }

    const data = await response.json();
    
    const profile = {
      username: data.login || username,
      name: data.name || username,
      avatar: data.avatar_url || "",
      bio: data.bio || "",
      followers: data.followers || 0,
      following: data.following || 0,
      created_at: data.created_at || null,
      updated_at: data.updated_at || null,
      public_repos: data.public_repos || 0,
      url: data.html_url || `https://github.com/${username}`,
    };

    let repoResponse;
    try {
      repoResponse = await fetchWithRetry(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers: headers }
      );
    } catch (error) {
      console.error(`Failed to fetch repositories after retries:`, error);
      return res.json({
        profile: profile,
        languages: [],
        stars: 0,
        forks: 0,
        repos: [],
        warning: "Repository data unavailable due to network issues"
      });
    }

    if (!repoResponse.ok) {
      console.error(`GitHub Repos API error: ${repoResponse.status} - ${repoResponse.statusText}`);
      return res.json({
        profile: profile,
        languages: [],
        stars: 0,
        forks: 0,
        repos: [],
        warning: `Repository data unavailable: ${repoResponse.status} - ${repoResponse.statusText}`
      });
    }

    const repoData = await repoResponse.json();

    const topLanguages = [];
    let totalStars = 0;
    let totalForks = 0;
    
    const repoPromises = repoData.map(async (repo) => {
      try {
        let langData = {};
        try {
          const langRes = await fetchWithRetry(repo.languages_url, {
            headers: headers,
          }, 2, 10000);
          
          if (langRes.ok) {
            langData = await langRes.json();
          } else {
            console.warn(`Failed to fetch languages for ${repo.name}: ${langRes.status}`);
          }
        } catch (error) {
          console.warn(`Network error fetching languages for ${repo.name}:`, error.message);
        }
        
        if (repo.language) topLanguages.push(repo.language);
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        
        return {
          name: repo.name,
          owner: repo.owner?.login || username,
          url: repo.html_url || "",
          description: repo.description || "",
          updated_at: repo.updated_at || null,
          stars: repo.stargazers_count || 0,
          languages: langData,
          homepage: repo.homepage || "",
          forks: repo.forks_count || 0,
          primary_language: repo.language || null,
        };
      } catch (error) {
        console.error(`Error processing repo ${repo.name}:`, error);
        return {
          name: repo.name,
          owner: repo.owner?.login || username,
          url: repo.html_url || "",
          description: repo.description || "",
          stars: repo.stargazers_count || 0,
          languages: {},
          forks: repo.forks_count || 0,
        };
      }
    });
    
    const repos = await Promise.all(repoPromises);
    
    return res.json({
      profile: profile,
      languages: topLanguages,
      stars: totalStars,
      forks: totalForks,
      repos: repos,
    });

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return res.status(500).json({ 
      error: "Server error processing GitHub data",
      message: error.message 
    });
  }
});

router.get("/:username/activity", async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: "GitHub token is missing" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "DevDash",
    };

    const username = req.params.username;
    
    let reposResponse;
    try {
      reposResponse = await fetchWithRetry(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      );
    } catch (error) {
      console.error("Error fetching repositories for activity:", error);
      return res.status(503).json({ 
        error: "GitHub API is currently unavailable for activity data",
        activities: [] // Return empty activities as fallback
      });
    }
    
    if (!reposResponse.ok) {
      return res.status(reposResponse.status).json({ 
        error: "Failed to fetch repositories",
        activities: []
      });
    }
    
    const repos = await reposResponse.json();
    
    const activityPromises = repos.slice(0, 5).map(async (repo) => {
      try {
        const statsResponse = await fetchWithRetry(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/commit_activity`,
          { headers },
          10000 
        );
        
        if (statsResponse.ok) {
          const stats = await statsResponse.json();
          return { repo: repo.name, stats };
        }
        return null;
      } catch (error) {
        console.error(`Error fetching stats for ${repo.name}:`, error.message);
        return null;
      }
    });
    
    const activities = await Promise.all(activityPromises);
    const validActivities = activities.filter(Boolean);
    
    res.json({ activities: validActivities });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    res.status(500).json({ 
      error: "Server error",
      activities: []
    });
  }
});

router.get("/:username/stats", async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: "GitHub token is missing" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "DevDash",
    };

    const username = req.params.username;
    
    let reposResponse;
    try {
      reposResponse = await fetchWithRetry(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers }
      );
    } catch (error) {
      console.error("Error fetching repositories for stats:", error);
      return res.status(503).json({ 
        error: "GitHub API is currently unavailable for stats data",
        stats: {
          totalRepos: 0,
          totalStars: 0,
          totalForks: 0,
          totalWatchers: 0,
          languageStats: {},
          repoSizes: [],
          creationDates: [],
          forkedRepos: 0,
          originalRepos: 0,
        }
      });
    }
    
    if (!reposResponse.ok) {
      return res.status(reposResponse.status).json({ 
        error: "Failed to fetch repositories",
        stats: {
          totalRepos: 0,
          totalStars: 0,
          totalForks: 0,
          totalWatchers: 0,
          languageStats: {},
          repoSizes: [],
          creationDates: [],
          forkedRepos: 0,
          originalRepos: 0,
        }
      });
    }
    
    const repos = await reposResponse.json();
    
    const stats = {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
      totalForks: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
      totalWatchers: repos.reduce((sum, repo) => sum + (repo.watchers_count || 0), 0),
      languageStats: {},
      repoSizes: [],
      creationDates: [],
      forkedRepos: repos.filter(repo => repo.fork).length,
      originalRepos: repos.filter(repo => !repo.fork).length,
    };
    
    repos.forEach(repo => {
      if (repo.language) {
        stats.languageStats[repo.language] = (stats.languageStats[repo.language] || 0) + 1;
      }
    });
    
    repos.forEach(repo => {
      if (repo.created_at) {
        const date = new Date(repo.created_at);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        stats.creationDates.push(monthYear);
      }
    });
    
    repos.forEach(repo => {
      if (repo.size) {
        stats.repoSizes.push({ name: repo.name, size: repo.size });
      }
    });
    
    res.json(stats);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    res.status(500).json({ 
      error: "Server error",
      stats: {
        totalRepos: 0,
        totalStars: 0,
        totalForks: 0,
        totalWatchers: 0,
        languageStats: {},
        repoSizes: [],
        creationDates: [],
        forkedRepos: 0,
        originalRepos: 0,
      }
    });
  }
});

router.get("/:username/trending", async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: "GitHub token is missing" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "DevDash",
    };

    const username = req.params.username;
    
    let reposResponse;
    try {
      reposResponse = await fetchWithRetry(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      );
    } catch (error) {
      console.error("Error fetching repositories for trending:", error);
      return res.status(503).json({ 
        error: "GitHub API is currently unavailable for trending data",
        trending: []
      });
    }
    
    if (!reposResponse.ok) {
      return res.status(reposResponse.status).json({ 
        error: "Failed to fetch repositories",
        trending: []
      });
    }
    
    const repos = await reposResponse.json();
    
    const trending = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        const aScore = (a.stargazers_count || 0) + (a.forks_count || 0);
        const bScore = (b.stargazers_count || 0) + (b.forks_count || 0);
        return bScore - aScore;
      })
      .slice(0, 5)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        updated_at: repo.updated_at
      }));
    
    res.json({ trending });
  } catch (error) {
    console.error("Error fetching trending repos:", error);
    res.status(500).json({ 
      error: "Server error",
      trending: []
    });
  }
});

export default router;