import { useEffect, useState } from "react";
const CACHE_KEY = "githubData";
const CACHE_EXPIRY = 1000;

export function useGithubData(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        (setData(data), setLoading(false));
        return;
      }
    }
    fetch(`http://localhost:3000/api/github/${username}`)
      .then((res) => res.json())
      .then((fresh) => {
        console.log(fresh)
          setData(fresh);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: fresh, timestamp: Date.now() })
        );
      })
      .finally(() => setLoading(false));
  }, [username]);
  console.log(data);
  return { data, loading };
}
