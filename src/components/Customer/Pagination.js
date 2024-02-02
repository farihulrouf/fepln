import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Paginatio = ({setCurrentPage, totalItems, currentPage, onChangeData, paginateBack, paginateFront, retrieveCustomers}) => {

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  const showNextButton = currentPage !== totalItems - 1;
  const showPrevButton = currentPage !== 0;
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    retrieveCustomers('',selected,5)
    //console.log(retrieveCustomers)
    //onChangeData()
    //currentPage(selected)
   // onChangeSearch('')
   // console.log('data', currentPage)
    //console.log(selected)
  };
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-sm px-2 py-2">Total items {totalItems} </p>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
            <FaChevronRight onClick={paginateBack}/>
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalItems/5}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
            <FaChevronLeft onClick={paginateFront} />
          </span>
        }
        containerClassName="flex items-center justify-center mt-2 mb-2"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-gray-200 text-white"
        renderOnZeroPageCount={null}
      />
    </motion.div>
  );
};

export default Paginatio;
