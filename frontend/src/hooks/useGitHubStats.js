import { useState, useEffect } from 'react';
import api from '../api';

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
          api.get(`github/${username}/stats`).then(async r => {
            if (!r.ok) throw new Error(`Stats API error: ${r.status}`);
            return r.json();
          }),
          api.get(`github/${username}/activity`).then(async r => {
            if (!r.ok) throw new Error(`Activity API error: ${r.status}`);
            return r.json();
          }),
          api.get(`github/${username}/trending`).then(async r => {
            if (!r.ok) throw new Error(`Trending API error: ${r.status}`);
            return r.json();
          })
        ]);

        if (statsRes.status === 'fulfilled') {
          setStats(statsRes.value || {});
        } else {
          console.error('Error fetching GitHub stats:', statsRes.reason);
          setStats({});
        }

        if (activityRes.status === 'fulfilled') {
          setActivity(Array.isArray(activityRes.value.activities) ? activityRes.value.activities : []);
        } else {
          console.error('Error fetching GitHub activity:', activityRes.reason);
          setActivity([]);
        }

        if (trendingRes.status === 'fulfilled') {
          setTrending(Array.isArray(trendingRes.value.trending) ? trendingRes.value.trending : []);
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
