"use client";

import { useEffect, useState } from "react";
import { getClasses } from "@repo/api-client";

export const useClasses = () => {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClasses();
      setClasses(res.data || []);
    };

    fetchData();
  }, []);

  return { classes };
};