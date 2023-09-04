import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { addBook } from '../features/librarySlice';

function AddBookForm() {
  const dispatch = useDispatch();

  const bookData = [
    {
      title: 'Harry Potter 5',
      genre: 'Fantasy',
      summary: 'You a wizard',
      rating: 4,
    },
  ];

  const handleSubmit = e => {
    dispatch();
  };

  return (
    <div className='addBookFrom'>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            padding: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.main',
          }}>
          <FormLabel component='legend'>Title</FormLabel>
          <TextField
            sx={{ paddingBottom: 2 }}
            required
            name='title'
            variant='outlined'
            placeholder='Harry Potter and The Sorcerers Stone...'
          />
          <FormLabel component='legend'>Genre</FormLabel>
          <TextField
            sx={{ paddingBottom: 2 }}
            name='genre'
            variant='outlined'
            placeholder='Fantasy...'
          />
          <FormLabel component='legend'>Summary</FormLabel>
          <TextField
            sx={{ paddingBottom: 2 }}
            name='summary'
            variant='outlined'
            placeholder=''
          />
          <FormLabel component='legend'>Product</FormLabel>
          <FormGroup row sx={{ paddingBottom: 2 }}>
            <FormControlLabel
              control={<Checkbox name='laptop' value='yes' />}
              label='Book'
            />
            <FormControlLabel
              control={<Checkbox name='headset' value='yes' />}
              label='Audiobook'
            />
          </FormGroup>
          <Typography component='legend'>Review</Typography>
          <Rating name='rating' sx={{ paddingBottom: 2 }} />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AddBookForm;
