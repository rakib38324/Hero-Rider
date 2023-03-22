import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ infoPerPage, totalInfo, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInfo / infoPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='mt-10'>
      <ul className='flex gap-5 justify-center'>
        
        {pageNumbers.map(number => (
          <li key={number} className='font-semibold ' role="group">
            <Link onClick={(event) => paginate(number,event)} to='#' className="px-4 py-2 text-sm font-semibold text-black  border border-gray-600 rounded-md hover:border-gray-600 hover:text-black focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-600 focus:text-white ">
              {number}
            </Link>
          </li>
        ))}
        
      </ul>
    </nav>
  );
};

export default Pagination;