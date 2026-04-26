# TechPulse API

TechPulse API is a beginner-friendly Node.js and Express backend for three frontend apps:

- TechPulse CSR (React)
- TechPulse SSR (Next.js)
- TechPulse SSG (Next.js)

The API is read-only. It does not use a database, authentication, admin panel, or POST/PUT/DELETE routes.

## Install

```bash
cd techpulse-api
npm install
```

## Run

```bash
npm start
```

The API runs on:

```text
http://localhost:5000
```

For development with automatic restarts:

```bash
npm run dev
```

## API Endpoints

### Health Check

```http
GET /
```

Returns:

```json
{
  "message": "TechPulse API running"
}
```

### Get All Articles

```http
GET /api/articles
```

Returns all articles.

### Get Single Article

```http
GET /api/articles/:slug
```

Example:

```http
GET /api/articles/ai-assistants-move-into-everyday-productivity
```

Returns one article that matches the slug.

If no article is found:

```json
{
  "message": "Article not found"
}
```

### Get Articles by Category

```http
GET /api/category/:name
```

Example:

```http
GET /api/category/AI
```

Returns all articles in the category. Category matching is case-insensitive.

### Get Categories

```http
GET /api/categories
```

Returns a unique list of article categories.

## Example Article Response

```json
{
  "id": 1,
  "slug": "ai-assistants-move-into-everyday-productivity",
  "title": "AI Assistants Move Into Everyday Productivity Tools",
  "category": "AI",
  "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  "excerpt": "Modern AI assistants are becoming practical helpers inside email, documents, calendars, and team workspaces.",
  "content": "AI assistants are moving beyond novelty demos and becoming part of daily productivity workflows. Teams are using them to summarize meetings, draft documents, organize tasks, and search internal knowledge bases. The biggest shift is not only better language models, but better integration with the tools people already use every day. Companies are also paying closer attention to privacy, permissions, and audit trails so employees can use AI features without exposing sensitive data.",
  "date": "2026-01-08",
  "author": "Maya Chen"
}
```

## CORS

CORS is enabled with the `cors()` middleware, so local frontend apps can call the API during development.
