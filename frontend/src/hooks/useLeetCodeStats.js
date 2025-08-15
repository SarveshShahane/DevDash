import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLeetCodeStats = (username) => {
  const [calendar, setCalendar] = useState(null);
  const [contests, setContests] = useState(null);
  const [topics, setTopics] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      if (!username) return;
      
      setLoading(true);
      setError(null);

      try {
        const [calendarRes, contestsRes, topicsRes, dailyRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/leetcode/${username}/calendar`),
          axios.get(`http://localhost:3000/api/leetcode/${username}/contests`),
          axios.get(`http://localhost:3000/api/leetcode/${username}/topics`),
          axios.get(`http://localhost:3000/api/leetcode/daily/challenge`)
        ]);

        setCalendar(calendarRes.data || null);
        setContests(Array.isArray(contestsRes.data.contests) ? contestsRes.data.contests : []);
        setTopics(topicsRes.data || {});
        setDailyChallenge(dailyRes.data || null);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError(err.response?.data?.error || 'Failed to fetch LeetCode statistics');
        setCalendar(null);
        setContests([]);
        setTopics({});
        setDailyChallenge(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [username]);

  return { calendar, contests, topics, dailyChallenge, loading, error };
};
