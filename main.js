let apiUrl = "/api/nasa"; // call your Vercel function

// Ensure normalizedMsg is defined before using it
if (typeof normalizedMsg !== "undefined" && normalizedMsg.includes("random")) {
  const start = new Date(1995, 5, 16);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const dateStr = randomDate.toISOString().split("T")[0];
  apiUrl += `?date=${dateStr}`;
}

fetch(apiUrl)
  .then(res => {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  })
  .then(data => handleAstronautResponse(normalizedMsg, data))
  .catch(err => console.error(err));
