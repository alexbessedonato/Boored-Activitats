export const handler = async (event, context) => {
  const { type } = event.queryStringParameters || {};

  const apiUrl = type
    ? `https://bored-api.appbrewery.com/filter?type=${type}`
    : "https://bored-api.appbrewery.com/random";

  try {
    const response = await fetch(apiUrl); // Use native fetch in Node.js 18.x
    if (!response.ok) {
      throw new Error(`Error fetching activity: ${response.status}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching activity:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching activity" }),
    };
  }
};
