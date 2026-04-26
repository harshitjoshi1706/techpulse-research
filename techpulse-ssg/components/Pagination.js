export default function Pagination({ visibleCount, totalCount, onLoadMore }) {
  if (visibleCount >= totalCount) {
    return null;
  }

  return (
    <div className="load-more-wrap">
      <button type="button" className="load-more-button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
}
