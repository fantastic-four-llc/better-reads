import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import { getBookList } from '../features/librarySlice';

function LibraryDashboard() {
  // const bookCount = useSelector(state => state.library.bookCount);
  // const bookData = useSelector(state => state.library.bookList);
  // const libraryStatus = useSelector(state => state.library.status);
  // const libraryError = useSelector(state => state.library.error);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (libaryStatus === 'idle') {
  //     dispatch(getBookList(userId));
  //   }
  // }, [bookStatus, dispatch]);

  // let content;
  // if (libraryStatus === 'loading' {
  //   content = <p>'Getting books...'</p>
  // } else if (libraryStatus === 'succeeded') {
  //   const rows = bookData.map((book, index) => ({
  //     id: index + 1,
  //     title: book.title,
  //     author: book.author,
  //     genre: book.genre,
  //     summary: book.summary,
  //     rating: book.rating,
  //   }));

  //   const columns = [
  //     {
  //       field: 'id',
  //       headerName: 'ID',
  //       width: 150,
  //     },
  //     { field: 'title', headerName: 'Title', width: 150 },
  //     { field: 'author', headerName: 'Author', width: 150 },
  //     { field: 'genre', headerName: 'Genre', width: 150 },
  //     { field: 'summary', headerName: 'Summary', width: 500 },
  //     { field: 'rating', headerName: 'Rating', width: 150 },
  //   ];

  //   content = <DataGrid
  //   sx={{
  //     boxShadow: 2,
  //     border: 2,
  //   }}
  //   rows={rows}
  //   columns={columns}
  // />
  // } else if (libraryStatus === 'failed') {
  //   content = <p>{error}</p>
  // }

  const bookData = [
    {
      title: 'Harry Potter',
      author: 'JK Rowling',
      genre: 'Fantasy',
      summary: 'You a wizard',
      rating: 4,
    },
    {
      title: 'Star Wars',
      author: 'George Lucas',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
    {
      title: 'Star Wars',
      author: 'George Lucas',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
    {
      title: 'Star Wars',
      author: 'George Lucas',
      genre: 'Sci-fi',
      summary: 'A long time ago....',
      rating: 3.5,
    },
  ];

  const rows = bookData.map((book, index) => ({
    id: index + 1,
    title: book.title,
    author: book.author,
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
    { field: 'author', headerName: 'Author', width: 150 },
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
        {/* {content} */}
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </div>
  );
}

export default LibraryDashboard;
