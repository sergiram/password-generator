import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Generator } from './Generator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Generator />
  </StrictMode>
);
