
import { GoogleGenAI, Type } from "@google/genai";
import { Palette } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const paletteSchema = {
    type: Type.ARRAY,
    description: "An array of 2-4 color palettes.",
    items: {
        type: Type.OBJECT,
        properties: {
            paletteName: {
                type: Type.STRING,
                description: 'A creative and descriptive name for the palette.',
            },
            colors: {
                type: Type.ARRAY,
                description: 'An array of 5 hex color codes that form the palette.',
                items: {
                    type: Type.STRING,
                    description: 'A valid hex color code string (e.g., "#FFFFFF").'
                },
            },
        },
        required: ["paletteName", "colors"],
    },
};

export const generatePalettes = async (prompt: string): Promise<Palette[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a set of color palettes based on this theme: "${prompt}". Please provide creative names for each palette. Ensure each hex code is valid.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: paletteSchema,
                temperature: 0.8,
                topP: 0.9,
            },
        });

        const jsonText = response.text.trim();
        const parsedPalettes: Palette[] = JSON.parse(jsonText);
        
        // Basic validation to ensure the structure is correct
        if (!Array.isArray(parsedPalettes) || parsedPalettes.some(p => !p.paletteName || !Array.isArray(p.colors) || p.colors.length === 0)) {
            throw new Error("Invalid palette structure received from API.");
        }

        return parsedPalettes;
    } catch (error) {
        console.error("Error generating palettes with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};
