import { useEffect, useState } from "react";
const CACHE_KEY = "contestData";
const CACHE_EXPIRY = 6 * 60 * 60 * 1000;
import { useContestStore } from "../zustand/store";
export const useContestData = () => {
  const { setCData } = useContestStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_EXPIRY) {
        setData(data.data);
        setLoading(false);
        setCData(data.data);
        return;
      }
    }
    fetch("http://localhost:3000/api/contests/upcoming")
      .then((res) => res.json())
      .then((fresh) => {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: fresh, timestamp: Date.now() })
        );
        setData(fresh);
      })
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
};
