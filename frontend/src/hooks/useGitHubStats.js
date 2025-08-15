import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGitHubStats = (username) => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      if (!username) return;
      
      setLoading(true);
      setError(null);

      try {
        const [statsRes, activityRes, trendingRes] = await Promise.allSettled([
          axios.get(`http://localhost:3000/api/github/${username}/stats`),
          axios.get(`http://localhost:3000/api/github/${username}/activity`),
          axios.get(`http://localhost:3000/api/github/${username}/trending`)
        ]);

        if (statsRes.status === 'fulfilled') {
          setStats(statsRes.value.data || statsRes.value.data?.stats || {});
        } else {
          console.error('Error fetching GitHub stats:', statsRes.reason);
          setStats({});
        }

        if (activityRes.status === 'fulfilled') {
          const activityData = activityRes.value.data;
          setActivity(Array.isArray(activityData.activities) ? activityData.activities : []);
        } else {
          console.error('Error fetching GitHub activity:', activityRes.reason);
          setActivity([]);
        }

        if (trendingRes.status === 'fulfilled') {
          const trendingData = trendingRes.value.data;
          setTrending(Array.isArray(trendingData.trending) ? trendingData.trending : []);
        } else {
          console.error('Error fetching GitHub trending:', trendingRes.reason);
          setTrending([]);
        }

        const allFailed = [statsRes, activityRes, trendingRes].every(res => res.status === 'rejected');
        if (allFailed) {
          setError('GitHub API is currently unavailable. Some data may be missing.');
        }

      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(err.response?.data?.error || 'Failed to fetch GitHub statistics');
        setStats({});
        setActivity([]);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  return { stats, activity, trending, loading, error };
};
