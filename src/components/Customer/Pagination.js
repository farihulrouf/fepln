import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

//{ setCurrentPage, currentPage, totalPages }
const Paginatio = ({totalPages, totalItems, currentPage}) => {
    console.log('nilai total', totalItems)
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

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-sm px-2">Total items {totalItems} </p>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
            <FaChevronRight />
          </span>
        }
        //onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalItems/5}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightgray rounded-md">
            <FaChevronLeft />
          </span>
        }
        containerClassName="flex items-center justify-center mt-2 mb-2"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-purple text-white"
        renderOnZeroPageCount={null}
      />
    </motion.div>
  );
};

export default Paginatio;
