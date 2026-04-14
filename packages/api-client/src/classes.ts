const BASE_URL = "http://localhost:3001";

export const createClass = async (data: any) => {
  const res = await fetch(`${BASE_URL}/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getClasses = async () => {
  const res = await fetch(`${BASE_URL}/class`);
  return res.json();
};