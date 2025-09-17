import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({ handlePrevious, handleNext, page, hasMore }) => {
  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={page === 0}
        className="pagination__button"
      >
        <MdNavigateBefore size="20" />
      </button>
      <span className="pagination__span">{page + 1}</span>
      <button
        onClick={handleNext}
        disabled={!hasMore}
        className="pagination__button"
      >
        <MdNavigateNext size="20" />
      </button>
    </div>
  );
};

export default Pagination;
