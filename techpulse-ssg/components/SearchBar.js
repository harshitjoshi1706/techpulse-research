export default function SearchBar({ value, onChange, placeholder = 'Search articles...' }) {
  return (
    <div className="search-wrap">
      <label htmlFor="article-search" className="sr-only">
        Search articles
      </label>
      <input
        id="article-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}
