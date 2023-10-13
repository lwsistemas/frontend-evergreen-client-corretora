import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function CustomPagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={0}
      marginPagesDisplayed={1}
      previousLabel={<button className="btn btn-outline-primary m-2">Anterior</button>}
      nextLabel={<button className="btn btn-outline-primary m-2">Próximo</button>}
      breakLabel={<span>-</span>}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      onPageChange={onPageChange}
      // pageLabel={(page) => (
      //   <button className="btn btn-primary">{page + 1}</button>
      // )}
    />
  );
}

export default CustomPagination;