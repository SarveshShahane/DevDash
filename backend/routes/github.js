import express from "express";
const router = express.Router();

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
    console.log(`Fetching data for GitHub user: ${username}`);

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: headers,
    });

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

    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers: headers }
    );

    if (!repoResponse.ok) {
      console.error(`GitHub Repos API error: ${repoResponse.status} - ${repoResponse.statusText}`);
      return res.status(repoResponse.status).json({ 
        error: `GitHub Repos API error: ${repoResponse.status} - ${repoResponse.statusText}`
      });
    }

    const repoData = await repoResponse.json();
    console.log(`Found ${repoData.length} repositories for ${username}`);

    const topLanguages = [];
    let totalStars = 0;
    let totalForks = 0;
    
    const repoPromises = repoData.map(async (repo) => {
      try {
        const langRes = await fetch(repo.languages_url, {
          headers: headers,
        });
        
        let langData = {};
        if (langRes.ok) {
          langData = await langRes.json();
        } else {
          console.warn(`Failed to fetch languages for ${repo.name}: ${langRes.status}`);
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

export default router;