const express = require("express");
const articles = require("../data/articles.json");

const router = express.Router();

router.get("/articles", (req, res) => {
  res.json(articles);
});

router.get("/articles/:slug", (req, res) => {
  const { slug } = req.params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return res.status(404).json({
      message: "Article not found"
    });
  }

  res.json(article);
});

router.get("/category/:name", (req, res) => {
  const { name } = req.params;
  const categoryArticles = articles.filter(
    (article) => article.category.toLowerCase() === name.toLowerCase()
  );

  res.json(categoryArticles);
});

router.get("/categories", (req, res) => {
  const categories = [...new Set(articles.map((article) => article.category))];

  res.json(categories);
});

module.exports = router;
