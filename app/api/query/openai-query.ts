import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPENAI_KEY = process.env.GENAI_OPENAI_KEY;
const OPENAI_MODEL = "gpt-3.5-turbo";

const openai = new OpenAI({ apiKey: OPENAI_KEY });

const openAIQuery = async () => {
  if (!OPENAI_KEY) {
    console.error("OPENAI_KEY not set");
    return NextResponse.json(
      {
        message: "Config error",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: "Say hello in 5 languages" }],
    });
    console.log("completion:", completion);
    console.log("choices[0]:", completion.choices[0]);

    return completion.choices[0].message?.content;
  } catch (e: any) {
    if (e.response) {
      const message = `OpenAI Response Error: ${e.response.status}`;
      console.error(message, e.response.data);
      throw new Error(message);
    } else {
      const message = `Unexpected OpenAI Error: ${e}`;
      throw e;
    }
  }
};

export default openAIQuery;
