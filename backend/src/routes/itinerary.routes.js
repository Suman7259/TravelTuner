import { Router } from "express";
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const router = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/v1/itinerary/generate
router.post("/generate", async (req, res) => {
    console.log(req.body); // DEBUG
  const { destination, duration, budget, travelStyle, preferences } = req.body;

  if (!destination || !duration || !budget || !travelStyle) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `
      You are an AI travel planner.
      Create a personalized itinerary based on these details:
      - Destination: ${destination}
      - Duration: ${duration}
      - Budget: ${budget}
      - Travel Style: ${travelStyle}
      - Preferences: ${preferences || "none"}

      Give a short response , Format the response in clear, day-wise sections like:
      Day 1 - ...
      Day 2 - ...
      Include top attractions, food recommendations, and travel tips.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { 
        thinkingConfig: { thinkingBudget: 0 }, 
        maxOutputTokens: 10 // Limit output to ~10 tokens later if needed increase the token count
      },
    });

    // Trim to ~100 words
    let itineraryText = result.text || "No itinerary generated.";
    itineraryText = itineraryText.split(/\s+/).slice(0, 10).join(' ');

    res.json({ success: true, itinerary: itineraryText });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    if (error.status === 503) {
      return res.status(503).json({ error: "⚠️ Gemini service is busy. Try again later." });
    }
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

export default router;
