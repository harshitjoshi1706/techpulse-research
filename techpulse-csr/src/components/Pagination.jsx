import React from "react";
function Pagination({
  visibleCount,
  totalCount,
  hasMore,
  isLoadingMore = false,
  onLoadMore
}) {
  const shouldShowLoadMore = hasMore ?? visibleCount < totalCount;

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <p>
        Showing {Math.min(visibleCount, totalCount)} of {totalCount} articles
      </p>
      {shouldShowLoadMore && (
        <button
          className="button button-primary"
          type="button"
          disabled={isLoadingMore}
          onClick={onLoadMore}
        >
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}

export default Pagination;
