import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface PaginationProps {
  numberOfPages: number;
  getItemsForPage: (pageNumber: number) => void
}

function Pagination({numberOfPages, getItemsForPage}: PaginationProps) {

  // TODO: use useEffect to change page when the numberOfPages changes. It can happen that
  // user deletes shopping lists and he is on the last page. After deletion he should be moved to
  // the previous page if the deleted item was the only one itme on that page.

  const [currentPage, setCurrentPage] = useState({
    hiddenPage: 1,
    displayedPage: 1
  });

  function isNumeric(value: string): boolean {
    return !Number.isNaN(Number(value));
  }

  function changePage(newPage: string) {

    if(!isNumeric(newPage))
      return;

    setCurrentPage(oldCurrentPage => {

      const newPageNumber = Number(newPage);

      if(newPageNumber === 0) {
        getItemsForPage(1);
        return {
          hiddenPage: 0,
          displayedPage: 1
        }
      }

      if (newPageNumber > numberOfPages && oldCurrentPage.hiddenPage > 0) {
        return oldCurrentPage;
      }

      if (newPageNumber > numberOfPages && oldCurrentPage.hiddenPage === 0) {
        const lastDigit = Number(newPage[newPage.length - 1]);

        if (lastDigit === 0) {
          getItemsForPage(1);
          return {
            hiddenPage: 0,
            displayedPage: 1
          }
        }

        if (lastDigit > numberOfPages) {
          return oldCurrentPage;
        }

        getItemsForPage(lastDigit);
        return {
          hiddenPage: lastDigit,
          displayedPage: lastDigit
        }
      }

      getItemsForPage(newPageNumber);
      return {
        hiddenPage: newPageNumber,
        displayedPage: newPageNumber
      }

    })
  }

  function moveToNextPage() {
    setCurrentPage(oldCurrentPage => {

      getItemsForPage(oldCurrentPage.displayedPage + 1);

      return {
        hiddenPage: oldCurrentPage.displayedPage + 1,
        displayedPage: oldCurrentPage.displayedPage + 1
      }
    })
  }

  function moveToPreviousPage() {
    setCurrentPage(oldCurrentPage => {

      getItemsForPage(oldCurrentPage.displayedPage - 1);

      return {
        hiddenPage: oldCurrentPage.displayedPage - 1,
        displayedPage: oldCurrentPage.displayedPage - 1
      }
    })
  }

  const isLeftButttonDisabled = currentPage.displayedPage === 1;
  const isRightButtonDisabled = currentPage.displayedPage === numberOfPages;

  const buttonLeftStyle = isLeftButttonDisabled ? " bg-gray-300" : " bg-blue-300 hover:bg-blue-400 cursor-pointer";
  const buttonRightStyle = isRightButtonDisabled ? " bg-gray-300" : " bg-blue-300 hover:bg-blue-400 cursor-pointer";

  return (
    <div className="flex justify-center mt-5 gap-2 items-center">
      <button 
        className={"p-2 rounded h-10 w-10 shadow-lg" + buttonLeftStyle}
        onClick={moveToPreviousPage}
        disabled={isLeftButttonDisabled}
      >
        <ArrowLeftIcon/>
      </button>
      <div className="p-2 flex">

        <input 
          className="size-8 text-center text-xl" 
          value={currentPage.displayedPage} 
          onChange={(e) => changePage(e.target.value)}
        ></input>

        <div className="text-xl flex items-center justify-center size-8 ">/</div>

        <div className="text-xl flex items-center text-center justify-center size-8">{numberOfPages}</div>

      </div>
      <button 
        className={"p-2 rounded h-10 w-10 shadow-lg" + buttonRightStyle}
        onClick={moveToNextPage}
        disabled={isRightButtonDisabled}
      >
        <ArrowRightIcon/>
      </button>
    </div>
  )
}

export default Pagination;