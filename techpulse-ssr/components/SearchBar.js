export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-panel">
      <label className="search-label" htmlFor="article-search">
        Search articles
      </label>
      <div className="search-box">
        <span className="search-box__icon" aria-hidden="true">
          /
        </span>
        <input
          id="article-search"
          type="search"
          value={value}
          placeholder="Search by title, topic, author, or summary"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <p className="search-count">
        {resultCount} {resultCount === 1 ? 'article' : 'articles'} found
      </p>
    </div>
  );
}
