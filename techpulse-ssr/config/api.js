export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const error = new Error(`API request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.articles)) return payload.articles;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export function unwrapItem(payload) {
  if (!payload) return null;
  if (payload.article) return payload.article;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;
  return payload;
}

export async function getArticles() {
  return unwrapList(await request('/articles'));
}

export async function getArticle(slug) {
  return unwrapItem(await request(`/articles/${encodeURIComponent(slug)}`));
}

export async function getCategoryArticles(name) {
  return unwrapList(await request(`/category/${encodeURIComponent(name)}`));
}

export async function getCategories() {
  const payload = await request('/categories');
  return unwrapList(payload);
}
