import { useState, useEffect } from 'react';
import api from '../api';

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
          api.get(`leetcode/${username}/calendar`).then(async r => {
            if (!r.ok) throw new Error(`Calendar API error: ${r.status}`);
            return r.json();
          }),
          api.get(`leetcode/${username}/contests`).then(async r => {
            if (!r.ok) throw new Error(`Contests API error: ${r.status}`);
            return r.json();
          }),
          api.get(`leetcode/${username}/topics`).then(async r => {
            if (!r.ok) throw new Error(`Topics API error: ${r.status}`);
            return r.json();
          }),
          api.get(`leetcode/daily/challenge`).then(async r => {
            if (!r.ok) throw new Error(`Daily challenge API error: ${r.status}`);
            return r.json();
          })
        ]);

        setCalendar(calendarRes || null);
        setContests(Array.isArray(contestsRes.contests) ? contestsRes.contests : []);
        setTopics(topicsRes || {});
        setDailyChallenge(dailyRes || null);
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
