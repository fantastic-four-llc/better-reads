import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

export default function App() {
  return (
    <div>
      <h1>App Success</h1>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </div>
  );
}

const styles = {};
