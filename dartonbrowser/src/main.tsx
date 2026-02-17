import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App';
import { DartBridge } from './DartBridge';

// Wait for dartbridge to be initialized by the Dart script
// The Dart script is loaded before this module, so dartbridge should be available
DartBridge.autoBridge();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
