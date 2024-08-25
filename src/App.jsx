import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import { Footer, Header } from './components/index.js';

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
    <div className="bg-[#020187] text-white min-h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <Footer />

    </div>
    </>
  ) : (
    <div className="text-center">Loading...</div>
  );
};
