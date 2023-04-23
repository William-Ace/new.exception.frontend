import React, { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import AuthRoute from './components/auth/Route/LogRoute';
import PrivateRoute from './components/auth/Route/HomeRoute';
import Loader from './components/StyleLoader';
import { FirebaseProvider } from './firebase';
import { ModalProvider } from './context/modal';
import theme from './themes/theme';
import './assets/sass/index.scss';

const Auth = React.lazy(() => import('./views/auth/Auth'));
const Home = React.lazy(() => import('./views/app/calendar'));

function App() {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseProvider>
          <ModalProvider>
            <BrowserRouter>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <AuthRoute>
                        <Auth />
                      </AuthRoute>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </BrowserRouter>
            <ToastContainer />
          </ModalProvider>
        </FirebaseProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
