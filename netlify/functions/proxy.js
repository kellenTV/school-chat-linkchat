// netlify/functions/proxy.js
export async function handler(event) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: "Missing ?url parameter"
    };
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NetlifyProxy/1.0)' }
    });
    const text = await response.text();

    // Return raw HTML as plain text
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error fetching " + url + ": " + err.message
    };
  }
}
