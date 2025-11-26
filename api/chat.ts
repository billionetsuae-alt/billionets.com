type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function setCorsHeaders(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
}

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = req.body ?? {};
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const systemPrompt = `You are the official conversational assistant for Billionets, an AI-first digital studio based in Dubai.

- Billionets provides: AI solutions & automation, web development, mobile apps, digital marketing, SEO & analytics, dashboards, and custom software.
- Location: 2606, Regal Tower, Business Bay, Dubai, UAE.
- Tone: professional, clear, concise, friendly, and sales-aware without being pushy.
- Always answer from Billionets' perspective using "we".
- When relevant, suggest specific services (AI automation, web dev, etc.) and invite the user to contact us.
- If you don't know something or it is outside Billionets, say so briefly and pivot back to how Billionets can help.
- Never invent prices or confidential internal details.
`;

  const contents = [
    {
      role: "user" as const,
      parts: [{ text: systemPrompt }],
    },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    })),
  ];

  try {
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Gemini API error", response.status, text);
      return res.status(500).json({ error: "Error from Gemini API" });
    }

    const data = (await response.json()) as any;
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        .join("\n") ||
      "Sorry, I couldn't generate a response right now.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat function error", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
