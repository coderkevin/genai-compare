import { NextResponse } from "next/server";
import openAIQuery from "./openai-query";

export async function GET() {
  try {
    return NextResponse.json({ response: await openAIQuery() });
  } catch (e: any) {
    const errorMessage =
      e instanceof Error ? e.message : `Unrecognized Error: ${e}`;
    console.error(`Error with query: ${errorMessage}`);

    return NextResponse.json(
      {
        message: "An error occurred during your request",
      },
      {
        status: 500,
      }
    );
  }
}
