export default function Pagination({ visibleCount, totalCount, onLoadMore }) {
  if (visibleCount >= totalCount) {
    return (
      <div className="pagination">
        <p>Showing all {totalCount} {totalCount === 1 ? 'article' : 'articles'}.</p>
      </div>
    );
  }

  return (
    <div className="pagination">
      <p>
        Showing {visibleCount} of {totalCount} articles
      </p>
      <button className="button button--secondary" type="button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}
