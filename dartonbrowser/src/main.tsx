import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../../interop';
import { App } from './App';
import { DartBridge } from './DartBridge';

// set and delete the dart bridge
DartBridge.autoBridge();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
