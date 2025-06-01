import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set the document language and direction
document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';
document.title = 'واجهة المحادثة العربية | بي ستايل';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);