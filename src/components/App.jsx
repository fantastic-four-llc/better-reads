import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import LibraryContainer from './LibraryContainer';

export default function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  return (
    <div>
      <h1>App Success</h1>
      <BrowserRouter>
        {loggedIn ? <LibraryContainer /> : <LoginPage />}
      </BrowserRouter>
    </div>
  );
}

const styles = {};
