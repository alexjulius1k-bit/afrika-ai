exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Method not allowed"
      })
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message || typeof message !== "string") {
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
            "You are AFRICA AI , a friendly African AI assistant. Help people learn, write, build businesses, and solve problems using simple, clear language.",
          input: message.trim()
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI request failed:", response.status);

      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "The AI service could not complete your request."
        })
      };
    }

    const reply = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: reply || "Please ask me another question."
      })
    };
  } catch (error) {
    console.error("Chat function error:", error.message);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Something went wrong. Please try again."
      })
    };
  }
};
