/**
 * Shared TypeScript wrapper for Dart Bridge
 * 
 * This provides proper TypeScript types for dartbridge
 * so you can use it with full type safety without manual casting.
 * 
 * Works in both Node.js and browser environments.
 */

import type { DartBridge } from '../dist/interop.js';

/**
 * Get a typed reference to the dartbridge
 * In Node.js/Bun/Deno, this comes from the loader module
 * In browsers, this comes from window.dartbridge
 */
export function getDartBridge(): DartBridge {
  if (typeof window !== 'undefined' && 'dartbridge' in window) {
    // Browser environment
    return (window as any).dartbridge as DartBridge;
  } else if (typeof globalThis !== 'undefined' && 'dartbridge' in globalThis) {
    // Node.js/Bun/Deno environment
    return (globalThis as any).dartbridge as DartBridge;
  } else {
    throw new Error('Dart bridge is not initialized. Make sure the Dart code is loaded first.');
  }
}

/**
 * For Node.js/Bun/Deno: Initialize and load the dartbridge
 * This must be called before using getDartBridge()
 */
export async function initDartBridge(): Promise<DartBridge> {
  // Initialize the dartbridge namespace in globalThis if not already done
  if (typeof globalThis !== 'undefined' && !('dartbridge' in globalThis)) {
    (globalThis as any).dartbridge = {};
  }

  // Load the Dart compiled JavaScript
  await import('../dist/interop.js');

  return getDartBridge();
}

/**
 * Default export for convenience in Node.js environments
 */
let _cachedBridge: DartBridge | null = null;

const getDefaultBridge = async (): Promise<DartBridge> => {
  if (_cachedBridge) return _cachedBridge;
  _cachedBridge = await initDartBridge();
  return _cachedBridge;
};

// For top-level await environments
export default await getDefaultBridge();
