import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import authService from './app/services/authService.js';
import { login, logout } from './app/store/features/authSlice.js';
import { UrlLandingContextProvider } from './app/contexts/UrlLandingContext.js';
import { Button, CreatePost, Header, Loader } from './components/index.js';

interface State {
  auth: {
    status: boolean;
  };
}

export default function App() {

  // State  to handle create post window.
  const [createPost, setCreatePost] = useState(false);

  const isUserLoggedIn = useSelector((state: State) => state.auth.status);

  const dispatch = useDispatch();

  const { data: userData, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
  });

  useEffect(() => {
    userData ? dispatch(login({ userData })) : dispatch(logout());
  }, [userData]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-black text-white min-h-screen w-screen overflow-x-hidden overflow-y-auto">
        <Header />

        <UrlLandingContextProvider>
          <Outlet />
        </UrlLandingContextProvider>

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
  );
};
