import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store/store.js';
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout, Loader } from './components/index.js';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PostPage from './pages/PostPage.jsx';

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <BackgroundBeamsWithCollision>
    <RouterProvider router={router} />
    </BackgroundBeamsWithCollision>
  </Provider>
  </StrictMode>,
);
