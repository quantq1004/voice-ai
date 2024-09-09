import React from 'react';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import configureStore from './redux/store';
import AppRouter from './routers';
import { CheckAdminProvider } from './checkAdminContext';

const theme = createTheme();

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <SnackbarProvider>
      <CheckAdminProvider>
        <ThemeProvider theme={theme}>
          <SCThemeProvider theme={theme}>
            <AppRouter />
          </SCThemeProvider>
        </ThemeProvider>
      </CheckAdminProvider>
    </SnackbarProvider>
  </Provider>
);

export default App;
