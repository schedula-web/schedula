"use client";

import { useEffect, useState } from "react";
import { getClasses } from "../api/class.api";

export function useClasses() {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClasses();

        console.log("API DATA:", data); // 🔥 DEBUG

        // VERY IMPORTANT FIX
        setClasses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    }

    fetchData();
  }, []);

  return { classes };
}