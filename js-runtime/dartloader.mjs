/**
 * Dart Bridge Loader for Node.js/Bun
 * 
 * This script properly initializes the dartbridge namespace
 * and loads the Dart compiled code in the correct order.
 */

// Step 1: Initialize the dartbridge namespace in globalThis
// This MUST happen before importing the Dart compiled code
if (typeof globalThis.dartbridge === 'undefined') {
  globalThis.dartbridge = {};
}

// Step 2: Load the Dart compiled JavaScript
// We use dynamic import to ensure the namespace is set up first
await import('../dist/interop.js');

// Step 3: Export the dartbridge for convenient access
export const dartbridge = globalThis.dartbridge;

// Default export for direct imports
export default dartbridge;
