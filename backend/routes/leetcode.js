import express from "express";
const router = express.Router();
import axios from "axios";
router.get("/:username", async (req, res) => {
  const { username } = req.params;
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
    res.status(200).json(finalData);
  } catch (e) {
    res.status(404).json({
      error: "User not found or LeetCode API is down",
    });
  }
});

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

router.get("/:username/calendar", async (req, res) => {
  try {
    const { username } = req.params;
    const query = `query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }`;

    const currentYear = new Date().getFullYear();
    const variables = { username, year: currentYear };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const calendarData = response.data.data.matchedUser?.userCalendar;
    if (!calendarData) {
      return res.status(404).json({ error: "Calendar data not found" });
    }

    const submissionCalendar = JSON.parse(calendarData.submissionCalendar || "{}");
    const formattedCalendar = Object.entries(submissionCalendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
      count: parseInt(count)
    }));

    res.status(200).json({
      activeYears: calendarData.activeYears,
      streak: calendarData.streak,
      totalActiveDays: calendarData.totalActiveDays,
      dccBadges: calendarData.dccBadges,
      calendar: formattedCalendar
    });
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({ error: "Could not fetch calendar data" });
  }
});

router.get("/:username/contests", async (req, res) => {
  try {
    const { username } = req.params;
    const query = `query userContestRankingHistory($username: String!) {
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }`;

    const variables = { username };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const contestHistory = response.data.data.userContestRankingHistory || [];
    
    res.status(200).json({
      contests: contestHistory.map(contest => ({
        title: contest.contest.title,
        startTime: contest.contest.startTime,
        attended: contest.attended,
        rating: contest.rating,
        ranking: contest.ranking,
        problemsSolved: contest.problemsSolved,
        totalProblems: contest.totalProblems,
        finishTime: contest.finishTimeInSeconds
      }))
    });
  } catch (error) {
    console.error("Error fetching contest history:", error);
    res.status(500).json({ error: "Could not fetch contest history" });
  }
});

router.get("/:username/topics", async (req, res) => {
  try {
    const { username } = req.params;
    const query = `query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }`;

    const variables = { username };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const tagData = response.data.data.matchedUser?.tagProblemCounts;
    if (!tagData) {
      return res.status(404).json({ error: "Topic data not found" });
    }

    res.status(200).json({
      fundamental: tagData.fundamental || [],
      intermediate: tagData.intermediate || [],
      advanced: tagData.advanced || []
    });
  } catch (error) {
    console.error("Error fetching topic stats:", error);
    res.status(500).json({ error: "Could not fetch topic stats" });
  }
});

export default router;
