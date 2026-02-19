import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App';
import { getDartBridge } from '../../shared/dartloader';

// Validate that the dartbridge is initialized by the Dart script
// The Dart script is loaded before this module via index.html
try {
  getDartBridge();
  console.log('✓ Dart bridge initialized successfully');
} catch (error) {
  console.error('✗ Failed to initialize Dart bridge:', error);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
