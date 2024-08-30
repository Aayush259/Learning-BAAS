import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthLayout, Footer, Header } from './components/index.js';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LandingPage from './pages/LandingPage.jsx';

export default function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="bg-blue-600 text-white min-h-screen w-screen overflow-x-hidden overflow-y-auto">
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={
              <AuthLayout authentication={false}>
                <LandingPage />
              </AuthLayout>
            }
            />

            <Route path='/home' element={
              <AuthLayout>
                <HomePage />
              </AuthLayout>
            }
            />

            <Route path='/login' element={
              <AuthLayout authentication={false}>
                <LoginPage />
              </AuthLayout>
            }
            />

            <Route path='/signup' element={
              <AuthLayout authentication={false}>
                <SignUpPage />
              </AuthLayout>
            }
            />

          </Routes>
        </Router>
        <Footer />

      </div>
    </>
  ) : (
    <div className="text-center">Loading...</div>
  );
};
