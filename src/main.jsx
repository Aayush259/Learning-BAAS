import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store/store.js';
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BackgroundBeamsWithCollision>
        <App />
      </BackgroundBeamsWithCollision>
    </Provider>
  </StrictMode>,
);
