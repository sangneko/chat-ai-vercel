import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API Error:", err);
    res.status(500).json({ error: "AI response error" });
  }
}
