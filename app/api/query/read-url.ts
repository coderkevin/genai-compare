import fetch from "node-fetch";
import { parse } from "node-html-parser";

const PARAGRAPH_LENGTH_MIN_CHARS = 750;

const readUrl = async (url: string) => {
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }

  const res = await fetch(url);
  const text = await res.text();
  const dom = parse(text);
  const paragraphs = dom.getElementsByTagName("p");
  const textParagraphs = paragraphs
    .map((p) => p.innerText.replace(/<[^>]+>/g, ""))
    .filter((p) => p.length > PARAGRAPH_LENGTH_MIN_CHARS);
  const allText = "".concat(...textParagraphs);
  return allText;
};

export default readUrl;
