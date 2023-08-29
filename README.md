# Generative AI Demo

This demo can be used to make comparisons between multiple topics and web pages.
Type in the question prompt you wish to use, click the + button to add a query, fill in the topic and url there and click "Query".
More queries can be created with the + button

## How it works

This demo uses the openai gpt-3.5-turbo. It incorporates the question, topic and text from the url into each query prompt.

To get information from the url provided, the page is retrieved, then all text in paragraphs (`<p>` tags) is pulled, and
paragraphs smaller than a certain character threshold are discarded. This is to remove noise or less useful paragraphs
from the overall input prompt.

From there, the prompt is constructed and sent to openai. The result is received and displayed.

## How To Run

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
