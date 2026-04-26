export function optimizedImageSrc(src, { width = 800, quality = 72 } = {}) {
  if (!src) {
    return '';
  }

  try {
    const url = new URL(src);

    if (url.hostname.includes('images.unsplash.com')) {
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', width);
      url.searchParams.set('q', quality);
      return url.toString();
    }
  } catch {
    return src;
  }

  return src;
}
