import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async (request: Request) => {
  try {
    const { source, destination, budget } = await request.json();

    if (!source || !destination || !budget) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (budget <= 0) {
      return NextResponse.json({ message: "Invalid budget" }, { status: 400 });
    }

    const prompt = `
You are a travel planning AI.  
Generate a complete JSON response ONLY in the following structure.
The user wants to travel from "${source}" to "${destination}" with a budget of ₹${budget}.

Return an array of all possible travel methods.

REQUIRED OUTPUT FORMAT (STRICT JSON):

{
  "travel_options": [
    {
      "mode": "string", 
      "travel_cost": number,
      "places_to_visit": [
        {
          "name": "string",
          "entry_fee": number,
          "description": "string"
        }
      ],
      "hotels": [
        {
          "name": "string",
          "price_per_night": number,
          "rating": number,
          "distance_from_center_km": number
        }
      ],
      "food_options": [
        {
          "type": "string", 
          "average_cost": number
        }
      ],
      "itinerary": [
        {
          "day": number,
          "activities": ["string"]
        }
      ],
      "total_estimated_cost": number,
      "budget_match": "within budget" | "exceeds budget"
    }
  ]
}

RULES:
1. Always list ALL relevant travel modes (Train, Bus, Flight, Cab, Bike Trip, Car Rental).
2. Prices MUST be realistic and in Indian Rupees.
3. Provide at least 4–6 places to visit per mode.
4. Provide at least 3 hotel options per mode.
5. Provide at least 2 food options per mode.
6. Itinerary must include at least 2 to 4 days.
7. NO extra text outside the JSON.
8. NO markdown. NO explanation. Only pure JSON output.
`;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let raw = result.response.text().trim();

    // Remove potential markdown
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Attempt to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      return NextResponse.json(
        {
          message: "Failed to parse AI JSON",
          rawResponse: raw,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Travel plan generated successfully",
        travel: parsed,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
