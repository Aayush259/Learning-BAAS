import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import { Footer, Header, Loader } from './components/index.js';
import { Outlet } from 'react-router-dom';

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
      <div className="bg-black text-white min-h-screen w-screen overflow-x-hidden overflow-y-auto">
        <Header />

        <Outlet />

        {/* <Footer /> */}

      </div>
    </>
  ) : <Loader />;
};
