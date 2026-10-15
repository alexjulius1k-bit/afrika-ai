export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Method not allowed"
      })
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (typeof message !== "string" || !message.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Please enter a message."
        })
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "AI service is not configured."
        })
      };
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions:
            "You are AFRICA AI , a friendly African AI assistant. Help users learn English using simple words and clear examples. Also help with business, writing, and learning.",
          input: message.trim()
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("AI request failed:", response.status);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "The AI service could not complete your request."
        })
      };
    }

    const answer = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reply: answer || "Please try asking me again."
      })
    };
  } catch (error) {
    console.error("Chat function error:", error.message);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Something went wrong. Please try again."
      })
    };
  }
};
