import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType
    }
  };
}

export async function compareFaces(image1Path, image2Path) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
Compare the two face images.
Return JSON only in this format:
{
  "match": true or false,
  "confidence": number between 0 and 1
}
`;

  const result = await model.generateContent([
    prompt,
    fileToGenerativePart(image1Path, "image/jpeg"),
    fileToGenerativePart(image2Path, "image/jpeg")
  ]);
  let  text = result.response.text();
  text = text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}
