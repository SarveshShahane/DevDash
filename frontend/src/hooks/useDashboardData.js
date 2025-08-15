import { useState, useEffect } from 'react';
import { useUserStore } from '../zustand/store';

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({
    github: null,
    leetcode: null,
    loading: true,
    error: null
  });

  const { github: githubUsername, leetcode: leetcodeUsername } = useUserStore();

  const fetchDashboardData = async () => {
    if (!githubUsername && !leetcodeUsername) {
      setDashboardData(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }));

      const cacheKey = `dashboard_data_${githubUsername || 'none'}_${leetcodeUsername || 'none'}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      
      const CACHE_DURATION = 60 * 60 * 1000; 
      const now = Date.now();
      
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
        const parsed = JSON.parse(cachedData);
        setDashboardData({
          github: parsed.github,
          leetcode: parsed.leetcode,
          loading: false,
          error: null
        });
        return;
      }

      let githubData = null;
      let leetcodeData = null;

      if (githubUsername) {
        try {
          const githubResponse = await fetch(`http://localhost:3000/api/github/${githubUsername}`);
          if (githubResponse.ok) {
            githubData = await githubResponse.json();
          }
        } catch (error) {
          console.error('GitHub dashboard fetch error:', error);
        }
      }

      if (leetcodeUsername) {
        try {
          const leetcodeResponse = await fetch(`http://localhost:3000/api/leetcode/${leetcodeUsername}`);
          if (leetcodeResponse.ok) {
            const leetcodeArray = await leetcodeResponse.json();
            leetcodeData = leetcodeArray[0]; 
          }
        } catch (error) {
          console.error('LeetCode dashboard fetch error:', error);
        }
      }

      const newData = { github: githubData, leetcode: leetcodeData };
      
      localStorage.setItem(cacheKey, JSON.stringify(newData));
      localStorage.setItem(`${cacheKey}_timestamp`, now.toString());

      setDashboardData({
        github: githubData,
        leetcode: leetcodeData,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load dashboard data'
      }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [githubUsername, leetcodeUsername]);

  return {
    ...dashboardData,
    refetch: fetchDashboardData
  };
};

export default useDashboardData;
