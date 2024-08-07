import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { AppRoot } from './AppRoot';

export const theme = createTheme({
  palette: {
    // primary: { main: '#388c01' },
  },
});

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastContainer closeOnClick />
        <AppRoot />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
