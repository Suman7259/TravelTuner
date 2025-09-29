import { Router } from "express";
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const router = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Message is required" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: { thinkingConfig: { thinkingBudget: 0 } },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Full Gemini API error:", error);

    // Check for overload
    if (error.status === 503) {
      return res.status(503).json({
        reply: "⚠️ Gemini model is busy right now. Please try again in a few seconds.",
      });
    }

    res.status(500).json({
      reply: "⚠️ Something went wrong with Gemini API",
    });
  }
});
export default router