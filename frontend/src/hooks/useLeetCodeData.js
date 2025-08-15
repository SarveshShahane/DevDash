import { useEffect, useState } from "react";
const CACHE_KEY = "leetcodeData";
const CACHE_EXPIRY = 1000;
import { useLeetCodeStore } from "../zustand/store";

export function useLeetCodeData(username) {
  const { leetCodeData, setLCData } = useLeetCodeStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }
    
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data: cachedData, timestamp, username: cachedUsername } = JSON.parse(cached);
        
        if (Date.now() - timestamp < CACHE_EXPIRY && cachedUsername === username) {
          
          if (cachedData && cachedData.profile && cachedData.username) {
            setData(cachedData);
            setLCData(cachedData);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(CACHE_KEY); 
          }
        } else {
          localStorage.removeItem(CACHE_KEY); 
        }
      } catch (error) {
        localStorage.removeItem(CACHE_KEY); 
      }
    }
    
    setLCData(null);
    
    setLoading(true);
    
    fetch(`http://localhost:3000/api/leetcode/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`LeetCode API error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((rawData) => {
        
        const processedData = {
          username: rawData.username || username,
          
          profile: rawData.profile || {
            realName: rawData.realName || null,
            userAvatar: rawData.userAvatar || null,
            ranking: rawData.ranking || null,
            reputation: rawData.reputation || null,
            starRating: rawData.starRating || null
          },
          
          submitStats: rawData.submitStats || [],
          totalSolved: rawData.submitStats[0].count,
          
          easySolved: rawData.easySolved || 
            (rawData.submitStats?.find(s => s.difficulty === 'Easy')?.count || 0),
          mediumSolved: rawData.mediumSolved || 
            (rawData.submitStats?.find(s => s.difficulty === 'Medium')?.count || 0),
          hardSolved: rawData.hardSolved || 
            (rawData.submitStats?.find(s => s.difficulty === 'Hard')?.count || 0),
          
          languages: rawData.languages || [],
          
          userContestRanking: rawData.userContestRanking || null,
          submissionList: rawData.submissionList || [],
          badges: rawData.badges || [],
          solvingBeat: rawData.solvingBeat || [],
          totalProblems: rawData.totalProblems || {}
        };
        
        
        setData(processedData);
        setLCData(processedData);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ 
            data: processedData, 
            timestamp: Date.now(),
            username: username
          })
        );
      })
      .catch((error) => {
        console.error('Error fetching LeetCode data:', error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [username, setLCData]);
  
  return { data, loading };
}
