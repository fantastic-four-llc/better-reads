import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, removeBook } from '../features/librarySlice';

function LibraryDashboard() {
  const count = useSelector(state => state.library.bookCount);
  const dispatch = useDispatch();

  //   const dataRows = libraryData.map((match, index) => ({
  //     id: index + 1,
  //    }));

  //   const columns = [
  //     { field: 'book_name', headerName: 'Book Name', width: 300 },
  //     { field: 'book_name', headerName: 'Book Name', width: 300 },
  //   ];

  return (
    <div className='matchTableContainer'>
      <div className='outerBox'>
        <div>
          <div>
            <button
              aria-label='Increment value'
              onClick={() => dispatch(addBook())}>
              Add Book
            </button>
            <span>{count}</span>
            <button
              aria-label='Decrement value'
              onClick={() => dispatch(removeBook())}>
              Remove Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryDashboard;
