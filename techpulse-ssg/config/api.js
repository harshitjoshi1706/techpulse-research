export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function fetchFromApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${endpoint}`);
  }

  return response.json();
}

export async function getAllArticles() {
  return fetchFromApi('/articles');
}

export async function getArticleBySlug(slug) {
  return fetchFromApi(`/articles/${encodeURIComponent(slug)}`);
}

export async function getArticlesByCategory(name) {
  return fetchFromApi(`/category/${encodeURIComponent(name)}`);
}

export async function getAllCategories() {
  return fetchFromApi('/categories');
}
