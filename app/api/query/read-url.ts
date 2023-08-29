import fetch from "node-fetch";
import { parse } from "node-html-parser";

const PARAGRAPH_LENGTH_MIN_CHARS = 100;

const readUrl = async (url: string) => {
  if (!url.startsWith("http")) {
    url = "http://" + url;
  }

  const res = await fetch(url);
  const text = await res.text();
  const dom = parse(text);
  const paragraphs = dom.getElementsByTagName("p");
  const outputHtml = paragraphs.reduce((output, p) => {
    if (p.innerText.length < PARAGRAPH_LENGTH_MIN_CHARS) {
      return output;
    }

    return `${output}\n${p}`;
  }, "");
  const outputText = outputHtml
    .replace(/<[^>]+>/g, "")
    .replace(/([\r\n]+ +)+/g, "");
};

export default readUrl;
