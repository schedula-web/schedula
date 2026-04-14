const BASE_URL = "http://localhost:3001/class";

export async function createClass(data: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getClasses() {
  const res = await fetch(BASE_URL);
  return res.json();
}