/**
 * TypeScript wrapper for Dart Bridge Loader
 * 
 * This provides proper TypeScript types for the dart-loader.mjs
 * so you can import dartbridge with full type safety without manual casting.
 */

import type { DartBridge } from '../dist/interop.js';
import dartbridgeRaw from './dartloader.mjs';

// Export the properly typed dartbridge
export const dartbridge = dartbridgeRaw as DartBridge;

// Default export for convenience
export default dartbridge;
