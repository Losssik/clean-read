const mongoose = require("mongoose");
const Article = require("../models/articleModel");
const createClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const cron = require("node-cron");

//needed endpoint and model of my choice
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-nano";

// ask question to AI
const chat = async (req, res) => {
  const { message } = req.body;

  try {
    const client = createClient(
      endpoint,
      new AzureKeyCredential(process.env.AI_TOKEN)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        // creativity of the agent, highest = more creative/random, lower more formal
        temperature: 0.6,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message);
    }

    res.json({ reply: response.body.choices[0].message.content });
  } catch (err) {
    console.error("AI request error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
};

// get latest trending articles
const getLatestArticle = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_KEY}`
  );
  if (!res.ok) throw new Error("Błąd pobierania newsa");
  const data = await res.json();
  console.log("NewsAPI response:", data.articles[0]);

  if (!data.articles || data.articles.length === 0) {
    throw new Error("Brak artykułów w newsapi dla danego zapytania");
  }

  return data.articles[0]; // first article from the list
};

// generate article from trending topic

const generateArticle = async (req, res) => {
  try {
    const article = await getLatestArticle();

    const client = createClient(
      endpoint,
      new AzureKeyCredential(process.env.AI_TOKEN)
    );

    const prompt = `Na podstawie tego artykułu:
        Tytuł: ${article.title}
        Treść: ${article.content && article.description}

        Napisz jeden artykuł po polsku, dosc długości (minimum 450 słów, max 800slow), dogłębny i wyczerpujący temat.
        Artykuł powinien zawierać tytuł, treść i od 1 do 5 tagów.
        Odpowiadaj WYŁĄCZNIE w formacie JSON:
        { "title": "Tytuł artykułu", "content": "Treść artykułu", "tags": ["tag1", "tag2"] }`;

    const response = await client.path("/chat/completions").post({
      body: {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a creative newspaper writer who is an expert about the topic.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 1,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message);
    }

    const aiReply = response.body.choices[0].message.content;
    const generatedArticle = JSON.parse(aiReply);

    // saving to mongodb
    const savedArticle = await Article.create(generatedArticle);

    res.status(200).json(savedArticle);
  } catch (err) {
    console.error("Błąd generowania artykułu:", err);
    res.status(500).json({ error: "Generowanie artykułu nie powiodło się" });
  }
};

//generate artcile every 6hour
setInterval(async () => {
  try {
    await generateArticle(
      // empty request to avoind error
      {},
      // empty resposne to avoid error
      {
        status: () => ({ json: () => {} }),
        json: () => {},
      }
    );
  } catch (err) {
    console.error("error in set interval XD", err);
  }
}, 6 * 60 * 60 * 1000); //6H
module.exports = { chat, generateArticle };
