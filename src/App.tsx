import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';

import AuthRoute from './components/auth/Route/LogRoute';
import PrivateRoute from './components/auth/Route/HomeRoute';
import Loader from './components/spinner';
import { FirebaseProvider } from './firebase';
import './styles/sass/index.scss';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Auth from './pages/auth/Auth';
import Calendar from './pages/app/calendar';

const client = new ApolloClient({
  uri: 'http://localhost:1934/graphql/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <FirebaseProvider>
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
                    <Calendar />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </FirebaseProvider>
    </ApolloProvider>
  );
}

export default App;
