import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Разрешить все запросы (можно позже ограничить доменом)
app.use(cors());

app.get("/api/books", async (req, res) => {
  const { title } = req.query;
  const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`);
  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
