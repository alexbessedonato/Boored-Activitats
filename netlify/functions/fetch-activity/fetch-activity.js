// netlify/functions/fetch-activity.js
const fetch = require("node-fetch");

const handler = async (event) => {
  try {
    // Extract the 'type' parameter from the query string
    const { type } = event.queryStringParameters || {};

    // Set the API URL based on the type or default to a random activity
    const apiUrl = type
      ? `https://bored-api.appbrewery.com/filter?type=${type}`
      : "https://bored-api.appbrewery.com/random";

    // Fetch the data from the external API
    const response = await fetch(apiUrl);

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error(`Error fetching activity: ${response.status}`);
    }

    // Parse the response data
    const data = await response.json();

    // Return the response with a 200 status code and the data in the body
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Handle any errors and return a 500 status code with the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching activity" }),
    };
  }
};

module.exports = { handler };
