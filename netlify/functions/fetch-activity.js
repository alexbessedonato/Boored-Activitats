// api/fetch-activity.js
export default async function handler(req, res) {
  const { type } = req.query;

  // Dependiendo del tipo, elegimos la URL correcta
  const apiUrl = type
    ? `https://bored-api.appbrewery.com/filter?type=${type}`
    : "https://bored-api.appbrewery.com/random";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching activity: ${response.status}`);
    }
    const data = await response.json();

    // Configurar cabeceras CORS para permitir acceso desde cualquier origen
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ error: "Error fetching activity" });
  }
}
