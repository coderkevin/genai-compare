import OpenAI from "openai";
import readUrl from "./read-url";

const OPENAI_KEY = process.env.GENAI_OPENAI_KEY;
const OPENAI_MODEL = "gpt-3.5-turbo";

const openai = new OpenAI({ apiKey: OPENAI_KEY });

const openAIQuery = async (question: string, topic: string, url: string) => {
  if (!OPENAI_KEY) {
    console.error("OPENAI_KEY not set");
    throw new Error("OPENAI_KEY not set");
  }

  const page = await readUrl(url);
  const message = `On the topic of "${topic}", using only the text below, theorize and answer the question "${question}".\n${page}`;

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: message }],
    });
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
