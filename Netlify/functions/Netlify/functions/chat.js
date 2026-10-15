exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (typeof message !== "string" || !message.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please enter a message." }),
      };
    }

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "AI service is not configured." }),
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions:
          "You are AFRICA AI , a helpful, respectful African AI assistant. Help users learn, build businesses, write, and solve problems. Never claim to know something you do not know.",
        input: message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI request failed:", response.status);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "The AI service could not complete your request.",
        }),
      };
    }

    const answer = (data.output || [])
      .flatMap((item) => item.content || [])
      .filter((item) => item.type === "output_text")
      .map((item) => item.text)
      .join("\n");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: answer || "Sorry, I couldn't generate a response. Please try again.",
      }),
    };
  } catch (error) {
    console.error("AFRICA AI  function error:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong. Please try again." }),
    };
  }
};
