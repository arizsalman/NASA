let apiUrl = "/api/nasa"; // call your Vercel function

if (normalizedMsg.includes("random")) {
  const start = new Date(1995, 5, 16);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const dateStr = randomDate.toISOString().split("T")[0];
  apiUrl += `?date=${dateStr}`;
}

fetch(apiUrl)
  .then(res => res.json())
  .then(data => handleAstronautResponse(normalizedMsg, data))
  .catch(err => console.error(err));
