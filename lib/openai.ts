import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash-latest'
});

export interface AnalysisResult {
  intent: string;
  reasoning: string[];
  insights: {
    breakdown?: { labels: string[]; values: number[] };
    tradeoffs?: { labels: string[]; values: number[] };
    keyPoints: string[];
    concerns: string[];
    positives: string[];
  };
  uncertainty: {
    overall: 'high' | 'medium' | 'low';
    notes: string[];
  };
  summary: string;
  actions: string[];
}

export async function analyzeIngredients(
  systemPrompt: string,
  userPrompt: string
): Promise<AnalysisResult> {
  try {
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}\n\nRespond ONLY with valid JSON matching the specified format. No markdown, no extra text.`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const parsed = JSON.parse(cleanText);
    return parsed as AnalysisResult;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze ingredients. Please try again.');
  }
}
