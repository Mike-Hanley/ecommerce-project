import React from "react";
import "./Pagination.css";

/**
 * Returns the pagination list with google logic. Takes in a setPage so the parent
 * knows what page it is on and can update it's products accordingly
 * @param {*} props
 */
const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setPage,
  firstProduct,
  lastProduct,
}) => {
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);
  const pages = [];
  let startPage;
  let endPage;

  if (totalPages <= 10) {
    //
    // less than 10 total pages so show all
    //
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 6) {
    // if totalPages is greater than 10, amd current page is less than 6
    // display first 10 pages in controls
    startPage = 1;
    endPage = 10;
  } else if (currentPage + 4 >= totalPages) {
    // if totalPages is greater than 10, amd current page is within 4 of last page
    // display last 10 pages in controls
    startPage = totalPages - 9;
    endPage = totalPages;
  } else {
    // Otherwise, display 5 pages before current page and four pages before
    startPage = currentPage - 5;
    endPage = currentPage + 4;
  }

  // Create an array of possible pages to select from
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  const unFocus = (e) => {
    e.preventDefault();
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    totalPages !== 0 && (
      <nav className="m-3 mb-4">
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            {totalPages !== 1 && (
              <li
                className={currentPage === 1 ? "disabled pageNext" : "pageNext"}
              >
                <button
                  tabIndex={currentPage === 1 ? -1 : 0}
                  onMouseDown={(event) => unFocus(event)}
                  type="button"
                  className="pageLink"
                  onClick={prevPage}
                >
                  {"<"}
                </button>
              </li>
            )}
            {pages.map((page) => (
              <li
                key={page}
                className={
                  currentPage === page ? "disabled pageItem active" : "pageItem"
                }
              >
                <button
                  tabIndex={currentPage === page ? -1 : 0}
                  onMouseDown={(event) => unFocus(event)}
                  type="button"
                  className="pageLink"
                  onClick={() => setPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            {totalPages !== 1 && (
              <li
                className={
                  currentPage === totalPages ? "disabled pageNext" : "pageNext"
                }
              >
                <button
                  tabIndex={currentPage === totalPages ? -1 : 0}
                  onMouseDown={(event) => unFocus(event)}
                  type="button"
                  className="pageLink"
                  onClick={nextPage}
                >
                  {">"}
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-2">
          <div className="position-absolute start-50 translate-middle">
            <p>
              {`${firstProduct + 1}
            -
            ${lastProduct > totalItems.length ? totalItems.length : lastProduct}
            /
            ${totalItems.length}`}
            </p>
          </div>
        </div>
      </nav>
    )
  );
};

export default Pagination;
