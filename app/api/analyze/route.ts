import { NextRequest, NextResponse } from 'next/server';
import { analyzeIngredients } from '@/lib/openai';
import { buildSystemPrompt, buildUserPrompt, getTimeOfDay, getDayOfWeek, type PromptContext } from '@/lib/prompt';

export const runtime = 'edge'; // Use Edge Runtime for faster cold starts

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, productType, userNote } = body;

    if (!ingredients || typeof ingredients !== 'string') {
      return NextResponse.json(
        { error: 'Invalid ingredients provided' },
        { status: 400 }
      );
    }

    // Build context for AI
    const context: PromptContext = {
      ingredients,
      productType: productType || undefined,
      userNote: userNote || undefined,
      timeOfDay: getTimeOfDay(),
      dayOfWeek: getDayOfWeek(),
    };

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(context);

    // Call OpenAI
    const result = await analyzeIngredients(systemPrompt, userPrompt);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
