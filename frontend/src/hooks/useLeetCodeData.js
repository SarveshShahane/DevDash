import { useEffect, useState } from "react";
const CACHE_KEY = "leetcodeData";
const CACHE_EXPIRY = 1000 ;
import { useLeetCodeStore } from "../zustand/store";
export function useLeetCodeData(username) {
  const {leetCodeData,setLCData } = useLeetCodeStore();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
       if (!username) {
      setLoading(false);
      return;
    }
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        (setData(data), setLoading(false),setLCData(data));
        return;
      }
    }
    fetch(`http://localhost:3000/api/leetcode/${username}`)
      .then((res) => res.json())
      .then((fresh) => {
         setData(fresh);
        setLCData(fresh);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: fresh, timestamp: Date.now() })
        );
      })
      .finally(() => setLoading(false));
    }, [username]);
    console.log(data)
  return { data, loading };
}
