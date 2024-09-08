// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store/store';
// import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './components/index';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route path='/' element={
        <AuthLayout authentication={false}>
          <LandingPage />
        </AuthLayout>
      } />

      <Route path='/home' element={
        <AuthLayout authentication={true}>
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

      <Route path='/profile' element={
        <AuthLayout authentication={true}>
          <ProfilePage />
        </AuthLayout>
      } />

      <Route path='/post/:slug' element={
        <AuthLayout authentication={true}>
          <PostPage />
        </AuthLayout>
      } />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    {/* <BackgroundBeamsWithCollision> */}
    <RouterProvider router={router} />
    {/* </BackgroundBeamsWithCollision> */}
  </Provider>
  // </StrictMode>,
);
