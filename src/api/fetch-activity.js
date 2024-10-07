// /api/fetch-activity.js
export default async function handler(req, res) {
  const { type } = req.query;

  // Usamos el endpoint de filtro si se proporciona un tipo, o el de random en caso contrario
  const apiUrl = type
    ? `https://bored-api.appbrewery.com/filter?type=${type}`
    : "https://bored-api.appbrewery.com/random";

  try {
    // Llamada a la API externa
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching activity: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Devolvemos el dato obtenido
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ error: "Error fetching activity" });
  }
}
