export default async function handler(req, res) {
  const apiKey = process.env.NASA_API_KEY; // Set this in Vercel env vars
  const { date } = req.query;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) url += `&date=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NASA API" });
  }
}
