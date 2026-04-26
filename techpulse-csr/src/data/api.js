import { API_BASE_URL } from '../config/api.js';

async function request(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function queryString(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  const value = query.toString();
  return value ? `?${value}` : '';
}

function collection(payload, key) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key];
  }

  return [];
}

function single(payload, key) {
  return payload?.[key] ?? payload;
}

function pagePayload(payload, key, limit, offset) {
  const items = collection(payload, key);
  const explicitTotal = Array.isArray(payload)
    ? items.length
    : (payload?.totalCount ?? payload?.total ?? payload?.count);
  const pageItems = items.length > limit ? items.slice(offset, offset + limit) : items;
  const hasMore =
    typeof payload?.hasMore === 'boolean'
      ? payload.hasMore
      : explicitTotal !== undefined
        ? offset + pageItems.length < explicitTotal
        : pageItems.length === limit;
  const totalCount =
    explicitTotal ?? offset + pageItems.length + (hasMore ? limit : 0);

  return {
    articles: pageItems,
    totalCount,
    hasMore
  };
}

export function categoryPath(category) {
  return `/category/${encodeURIComponent(category)}`;
}

export async function fetchArticles(signal) {
  const payload = await request('/articles', signal);
  return collection(payload, 'articles');
}

export async function fetchArticlesPage(
  { limit = 6, offset = 0, search = '', category = '' },
  signal
) {
  const query = queryString({ limit, offset, search, category });
  const payload = await request(`/articles${query}`, signal);
  return pagePayload(payload, 'articles', limit, offset);
}

export async function fetchArticleBySlug(slug, signal) {
  const payload = await request(`/articles/${encodeURIComponent(slug)}`, signal);
  return single(payload, 'article');
}

export async function fetchCategoryArticlesPage(
  { name, limit = 6, offset = 0, search = '' },
  signal
) {
  const query = queryString({ limit, offset, search });
  const payload = await request(`/category/${encodeURIComponent(name)}${query}`, signal);
  return pagePayload(payload, 'articles', limit, offset);
}

export async function fetchCategories(signal) {
  const payload = await request('/categories', signal);
  return collection(payload, 'categories');
}
