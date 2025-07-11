import express from "express";
import axios from "axios";
import fetch from "node-fetch";
const router = express.Router();

router.get("/upcoming", async (req, res) => {
  try {
    const query = `query getContestList {
      allContests {
        title
        titleSlug
        startTime
        duration
      }
    }`;

    const leetcodeResponse = await axios.post(
      "https://leetcode.com/graphql",
      { query: query },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const atcoderURL = `https://clist.by/api/v4/json/contest/?limit=3&host=atcoder.jp&filtered=true&order_by=-start&username=${process.env.CLIST_USERNAME}&api_key=${process.env.CLIST_API_KEY}`;
    const atcoderResponse = await fetch(atcoderURL);
    
    if (!atcoderResponse.ok) {
      throw new Error(`AtCoder API responded with status ${atcoderResponse.status}`);
    }
    
    const atcoderData = await atcoderResponse.json();

    const codeChefURL = `https://clist.by/api/v4/json/contest/?limit=2&host=codechef.com&filtered=true&order_by=-start&username=${process.env.CLIST_USERNAME}&api_key=${process.env.CLIST_API_KEY}`;
    const ccResponse = await fetch(codeChefURL);
    
    if (!ccResponse.ok) {
      throw new Error(`CodeChef API responded with status ${ccResponse.status}`);
    }
    
    const ccData = await ccResponse.json();

    const leetcodeContests = leetcodeResponse.data.data.allContests.slice(0, 3).map(contest => ({
      id: contest.titleSlug,
      title: contest.title,
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
      host: 'leetcode.com',
      startTime: contest.startTime,
      duration: contest.duration,
      endTime: new Date(new Date(contest.startTime).getTime() + contest.duration * 1000).toISOString()
    }));

    const finalData = {
      leetcode: leetcodeContests,
      atCoder: atcoderData.objects.map(contest => ({
        id: contest.id,
        title: contest.event,
        duration: contest.duration,
        url: contest.href,
        host: 'atcoder.jp',
        startTime: contest.start,
        endTime: contest.end
      })),
      codeChef: ccData.objects.map(contest => ({
        id: contest.id,
        title: contest.event,
        duration: contest.duration,
        url: contest.href,
        host: 'codechef.com',
        startTime: contest.start,
        endTime: contest.end
      }))
    };

    finalData.allContests = [
      ...finalData.leetcode,
      ...finalData.atCoder,
      ...finalData.codeChef
    ].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    res.json(finalData);
  } catch (error) {
    console.error("Error fetching contest data:", error.message);
    res.status(500).json({
      error: "Failed to fetch contest data",
      message: error.message
    });
  }
});

export default router;