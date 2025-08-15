import express from "express";

const router = express.Router();

router.get("/summary/:github/:leetcode", async (req, res) => {
  try {
    const { github, leetcode } = req.params;
    
    const dashboardData = {
      github: github ? {
        username: github,
        public_repos: 12,
        followers: 25,
        following: 15,
        stargazers_count: 45,
        totalStars: 45,
        totalRepos: 12,
        bio: "Developer building awesome projects",
        avatar_url: `https://github.com/${github}.png`,
        last_updated: new Date().toISOString()
      } : null,
      
      leetcode: leetcode ? {
        username: leetcode,
        totalSolved: 150,
        totalQuestions: 3000,
        easySolved: 80,
        mediumSolved: 50,
        hardSolved: 20,
        ranking: 145000,
        acceptanceRate: 85.5,
        last_updated: new Date().toISOString()
      } : null,
      
      timestamp: Date.now()
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ 
      error: "Failed to fetch dashboard summary",
      github: null,
      leetcode: null,
      timestamp: Date.now()
    });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const dashboardData = {
      github: null,
      leetcode: null,
      timestamp: Date.now()
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ 
      error: "Failed to fetch dashboard summary",
      github: null,
      leetcode: null,
      timestamp: Date.now()
    });
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    const githubData = {
      login: username,
      public_repos: Math.floor(Math.random() * 50) + 5,
      followers: Math.floor(Math.random() * 100) + 10,
      following: Math.floor(Math.random() * 50) + 5,
      stargazers_count: Math.floor(Math.random() * 200) + 20,
      totalStars: Math.floor(Math.random() * 200) + 20,
      totalRepos: Math.floor(Math.random() * 50) + 5,
      bio: `${username} - Full Stack Developer`,
      avatar_url: `https://github.com/${username}.png`,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: new Date().toISOString()
    };

    res.json(githubData);
  } catch (error) {
    console.error("Dashboard GitHub error:", error);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

router.get("/leetcode/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    try {
      const axios = (await import('axios')).default;
      
      const leetcodeResponse = await axios.get(`http://localhost:3000/api/leetcode/${username}`);
      
      return res.json(leetcodeResponse.data);
    } catch (leetCodeError) {
      console.error("Failed to fetch from LeetCode API:", leetCodeError.message);
      
      const leetcodeData = {
        username: username,
        totalSolved: 150,
        totalQuestions: 3000,
        easySolved: 80,
        mediumSolved: 50,
        hardSolved: 20,
        ranking: 145000,
        acceptanceRate: "85.5",
        submissions: 500,
        isFallbackData: true
      };

      res.json(leetcodeData);
    }
  } catch (error) {
    console.error("Dashboard LeetCode error:", error);
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
});

export default router;
