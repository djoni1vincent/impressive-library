// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// нормализация названия
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

app.get("/api/books", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Title required" });

  try {
    // ищем сразу до 100 книг
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=100`
    );
    const data = await response.json();

    if (!data.docs || data.docs.length === 0)
      return res.json({ docs: [] });

    const query = normalize(title);
    let exactMatch = null;
    let partialMatch = null;

    for (const doc of data.docs) {
      const docTitle = normalize(doc.title);
      if (docTitle === query) {
        exactMatch = doc;
        break;
      }
      if (!partialMatch && docTitle.includes(query)) {
        partialMatch = doc;
      }
    }

    const result = exactMatch || partialMatch || data.docs[0];
    res.json({ docs: [result] });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal error" });
  }
});
