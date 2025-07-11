import express from "express";
const router = express.Router();
import axios from "axios";
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  console.log(username)
  try {
    const query = `query userProblemsSolved($username: String!, $limit: Int!) {
      allQuestionsCount {    
        difficulty    
        count  
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
        badge {
          name
        }
      }
      recentSubmissionList(username: $username, limit: $limit) {
        id    
        title    
        titleSlug    
        timestamp
        statusDisplay
        lang  
      }
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
          starRating
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        badges {
          icon
          name
        }
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
    }`;

    const variables = { username: username, limit: 10 };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    const data = response.data.data;
    const finalData = {
      totalProblems: {
        easy: data.allQuestionsCount.find((q) => q.difficulty === "Easy").count,
        medium: data.allQuestionsCount.find((q) => q.difficulty === "Medium")
          .count,
        hard: data.allQuestionsCount.find((q) => q.difficulty === "Hard").count,
      },
        userContestRanking: data.userContestRanking,
        submissionList:data.recentSubmissionList,
        username:data.matchedUser.username,
        profile:data.matchedUser.profile,
        submitStats:data.matchedUser.submitStats.acSubmissionNum,
        badges:data.matchedUser.badges,
        solvingBeat:data.matchedUser.problemsSolvedBeatsStats,
        languages:data.matchedUser.languageProblemCount,
        submitStatusGlobal:data.matchedUser.submitStatsGlobal.acSubmissionNum,
    };
    console.log(finalData)
    res.status(200).json(finalData);
  } catch (e) {
    res.status(404).json({
      error: "User not found or LeetCode API is down",
    });
  }
});

// Add this endpoint for the daily challenge
router.get("/daily/challenge", async (req, res) => {
  try {
    const query = `query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
          acRate
          difficulty
          frontendQuestionId
          title
          titleSlug
          topicTags {
            name
            slug
          }
        }
      }
    }`;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    res.status(200).json(response.data.data);
  } catch (e) {
    console.error("Error fetching daily challenge:", e.message);
    res.status(500).json({ error: "Could not fetch daily challenge" });
  }
});
export default router;
