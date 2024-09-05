import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import AddIcon from '@mui/icons-material/Add';
import { Button, CreatePost, Footer, Header, Loader } from './components/index.js';
import { Outlet } from 'react-router-dom';

export default function App() {

  const [loading, setLoading] = useState(true);

  // State  to handle create post window.
  const [createPost, setCreatePost] = useState(false);

  const isUserLoggedIn = useSelector(state => state.auth.status);

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

        {isUserLoggedIn && createPost && <CreatePost setCreatePost={setCreatePost} />}

        {isUserLoggedIn && (<Button
          className={`!h-10 !w-10 flex items-center justify-center !rounded-full scale-150 fixed bottom-10 right-10 hover:rotate-[130deg] z-50 ${createPost ? "hidden" : ""}`}
          onClick={() => setCreatePost(true)}
        >
          <AddIcon />
        </Button>)}

        {/* <Footer /> */}

      </div>
    </>
  ) : <Loader />;
};
