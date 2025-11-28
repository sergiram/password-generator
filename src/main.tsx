import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Generator } from './Generator';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Generator />
    <Toaster richColors position="bottom-right" />
  </StrictMode>
);
