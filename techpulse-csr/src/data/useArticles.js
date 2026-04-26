import { useCallback, useEffect, useState } from 'react';
import {
  fetchArticleBySlug,
  fetchArticles,
  fetchArticlesPage,
  fetchCategories,
  fetchCategoryArticlesPage
} from './api.js';

function useAsyncData(fetcher, deps, initialValue, errorMessage, enabled = true) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!enabled) {
      setData(initialValue);
      setIsLoading(false);
      setError('');
      return undefined;
    }

    let isMounted = true;
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    fetcher(controller.signal)
      .then((result) => {
        if (isMounted) {
          setData(result);
          setError('');
        }
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return;
        }

        if (isMounted) {
          setError(errorMessage);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, deps);

  return { data, isLoading, error };
}

export function useArticles() {
  const { data, isLoading, error } = useAsyncData(
    fetchArticles,
    [],
    [],
    'Articles could not be loaded.'
  );

  return { articles: data, isLoading, error };
}

export function usePaginatedArticles({
  pageSize = 6,
  searchTerm = '',
  category = ''
} = {}) {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    fetchArticlesPage(
      {
        limit: pageSize,
        offset: 0,
        search: searchTerm.trim(),
        category
      },
      controller.signal
    )
      .then((result) => {
        if (isMounted) {
          setArticles(result.articles);
          setTotalCount(result.totalCount);
          setHasMore(result.hasMore);
        }
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return;
        }

        if (isMounted) {
          setError('Articles could not be loaded.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pageSize, searchTerm, category]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) {
      return;
    }

    const controller = new AbortController();
    setIsLoadingMore(true);
    setError('');

    fetchArticlesPage(
      {
        limit: pageSize,
        offset: articles.length,
        search: searchTerm.trim(),
        category
      },
      controller.signal
    )
      .then((result) => {
        setArticles((currentArticles) => {
          const seen = new Set(currentArticles.map((article) => article.slug ?? article.id));
          const nextArticles = result.articles.filter(
            (article) => !seen.has(article.slug ?? article.id)
          );
          return [...currentArticles, ...nextArticles];
        });
        setTotalCount(result.totalCount);
        setHasMore(result.hasMore);
      })
      .catch(() => {
        setError('More articles could not be loaded.');
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [articles.length, category, hasMore, isLoadingMore, pageSize, searchTerm]);

  return {
    articles,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore
  };
}

export function useCategories() {
  const { data, isLoading, error } = useAsyncData(
    fetchCategories,
    [],
    [],
    'Categories could not be loaded.'
  );

  return { categories: data, isLoading, error };
}

export function useArticle(slug) {
  const { data, isLoading, error } = useAsyncData(
    (signal) => fetchArticleBySlug(slug, signal),
    [slug],
    null,
    'Article could not be loaded.',
    Boolean(slug)
  );

  return { article: data, isLoading, error };
}

export function useCategoryArticles(name) {
  const { data, isLoading, error } = useAsyncData(
    (signal) =>
      fetchCategoryArticlesPage({ name, limit: 4, offset: 0 }, signal).then(
        (result) => result.articles
      ),
    [name],
    [],
    'Category articles could not be loaded.',
    Boolean(name)
  );

  return { articles: data, isLoading, error };
}

export function usePaginatedCategoryArticles(name, { pageSize = 6, searchTerm = '' } = {}) {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(name));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!name) {
      setArticles([]);
      setIsLoading(false);
      setError('');
      return undefined;
    }

    let isMounted = true;
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    fetchCategoryArticlesPage(
      {
        name,
        limit: pageSize,
        offset: 0,
        search: searchTerm.trim()
      },
      controller.signal
    )
      .then((result) => {
        if (isMounted) {
          setArticles(result.articles);
          setTotalCount(result.totalCount);
          setHasMore(result.hasMore);
        }
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return;
        }

        if (isMounted) {
          setError('Category articles could not be loaded.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [name, pageSize, searchTerm]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || !name) {
      return;
    }

    setIsLoadingMore(true);
    setError('');

    fetchCategoryArticlesPage({
      name,
      limit: pageSize,
      offset: articles.length,
      search: searchTerm.trim()
    })
      .then((result) => {
        setArticles((currentArticles) => {
          const seen = new Set(currentArticles.map((article) => article.slug ?? article.id));
          const nextArticles = result.articles.filter(
            (article) => !seen.has(article.slug ?? article.id)
          );
          return [...currentArticles, ...nextArticles];
        });
        setTotalCount(result.totalCount);
        setHasMore(result.hasMore);
      })
      .catch(() => {
        setError('More category articles could not be loaded.');
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [articles.length, hasMore, isLoadingMore, name, pageSize, searchTerm]);

  return {
    articles,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore
  };
}
