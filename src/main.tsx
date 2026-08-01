import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import 'lenis/dist/lenis.css';
import './index.css';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
);
