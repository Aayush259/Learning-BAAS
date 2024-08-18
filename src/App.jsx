import React, { useEffect, useState } from 'react';
import conf from './app/conf/conf.js';
import { useDispatch } from 'react-redux';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import { Footer, Header } from './components/index.js';

export default function App() {

  // Loading state.
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
    .then(userData => {
      if (userData) {
        dispatch(login(userData));
      } else {
        console.log("Logout")
        dispatch(logout());
      }
    })
    .finally(() => {
      console.log("Finally")
      setLoading(false)})
  }, []);

  return !loading ? (
    <div
    className="min-h-screen flex flex-wrap content-between bg-gray-900 text-white"
    >
      Hi
    </div>
  ) : null;

  return (
    <>
    <h1 className="text-center m-10 text-3xl">Learning BAAS</h1>
    <Header />
    <Footer />
    </>
  );
};
