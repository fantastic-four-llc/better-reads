import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { addBook, removeBook } from '../features/librarySlice';

function LibraryDashboard() {
  const count = useSelector(state => state.library.bookCount);
  const dispatch = useDispatch();

  const userData = [
    {
      title: 'Harry Potter',
      genre: 'Fantasy',
      summary: 'You a wizard',
      rating: 4,
    },
    {
      title: 'Star Wars',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
    {
      title: 'Star Wars',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
    {
      title: 'Star Wars',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
  ];

  const rows = userData.map((book, index) => ({
    id: index + 1,
    title: book.title,
    genre: book.genre,
    summary: book.summary,
    rating: book.rating,
  }));

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 500 },
    { field: 'rating', headerName: 'Rating', width: 150 },
  ];

  return (
    <div className='libraryDashboard'>
      <Box
        sx={{
          height: 520,
          width: '100%',
        }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>

      <button aria-label='Increment value' onClick={() => dispatch(addBook())}>
        Add Book
      </button>
      <span>{count}</span>
      <button
        aria-label='Decrement value'
        onClick={() => dispatch(removeBook())}>
        Remove Book
      </button>
    </div>
  );
}

export default LibraryDashboard;
