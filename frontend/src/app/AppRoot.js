import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../authentication/LoginPage';

export const AppRoot = () => {
  const auth = false;

  return (
    <BrowserRouter>
      {auth ? <div>auth = true</div> : <LoginPage />}
    </BrowserRouter>
  );
};
