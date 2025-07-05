// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/generate-story", async (req, res) => {
  try {
    const { start, end, pois, startCoord, endCoord } = req.body;

    if (!start || !end || !Array.isArray(pois)) {
      return res.status(400).json({ error: "Missing or invalid input." });
    }

    const prompt = `
Create a funny and lighthearted travel story from "${start}" to "${end}" using the following places along the route:

${pois.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Make it:
- Easy to understand
- Max 6 paragraphs (based on distance)
- Describe some directions, locations, and fun names
- Mention current position (like “Now you’re near Sweat Palace...”)

Start funny and end hilariously. Keep it short and engaging.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const story = response.text();

    res.json({ story });
  } catch (error) {
    console.error("Error generating story:", error.message);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});


