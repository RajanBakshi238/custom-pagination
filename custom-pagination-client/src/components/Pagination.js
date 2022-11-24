import React from "react";
import usePagination, {DOTS} from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    // className,
  } = props;

  

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if(currentPage === 0 || paginationRange?.length < 2){
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  }

  const onPrevious = () => {
    onPageChange(currentPage -1)
  }

  let lastPage = paginationRange[paginationRange.length-1]

  return (
    <ul>
        <li
            onClick={onPrevious}
            // disabled={currentPage === 1}
            style={{pointerEvents: currentPage === 1 ? 'none' : 'fill'}}
        >
            left arrow
        </li>
        {
            paginationRange.map((pageNumber, index) => {
                if(pageNumber === DOTS){
                    return <li key={index}>&#8230;</li>;
                }

                return (
                    <li
                        key={index}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                )
            })
        }
        <li
            onClick={onNext}
            // disabled={currentPage === lastPage}
            style={{pointerEvents: currentPage === lastPage ? 'none' : 'fill'}}
        >
            right arrow
        </li>
    </ul>
  )
};

export default Pagination;
