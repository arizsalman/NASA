export default async function handler(req, res) {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "NASA_API_KEY is not set in environment variables." });
  }

  const { date } = req.query;
  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) url += `&date=${date}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "NASA API error", status: response.status });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NASA API", details: err.message });
  }
}