/**
 * TypeScript wrapper for Dart Bridge Loader (Node.js/Bun/Deno)
 * 
 * This is a compatibility shim that uses the shared dartloader.
 * For new code, prefer importing from '../shared/dartloader.ts'
 */

export { getDartBridge, initDartBridge } from '../shared/dartloader.js';
export { default } from '../shared/dartloader.js';
