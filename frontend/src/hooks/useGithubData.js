import { useEffect, useState } from "react";
import api from "../api";
const CACHE_KEY = "githubData";
const CACHE_EXPIRY = 1000; 
export function useGithubData(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
          setData(cachedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing cached GitHub data:', error);
      }
    }
    
    setLoading(true);
    setError(null);
  api.get(`github/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((fresh) => {
        
        if (fresh.warning) {
          console.warn('GitHub API Warning:', fresh.warning);
          setError(fresh.warning);
        }
        
        setData(fresh);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ 
            data: fresh, 
            timestamp: Date.now(),
            username: username
          })
        );
      })
      .catch((error) => {
        console.error('Error fetching GitHub data:', error);
        console.error('Error details:', error.message);
        setError(error.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [username]);
  
  return { data, loading, error };
}
