const Pagination = ({ handlePrevious, handleNext, page, hasMore }) => {
  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={page === 0}
        className="pagination__button"
      >
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button
        onClick={handleNext}
        disabled={!hasMore}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
