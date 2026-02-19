/**
 * TypeScript definitions for Dart-compiled JavaScript interop
 * 
 * AUTO-GENERATED - DO NOT EDIT MANUALLY
 * Generated from: dart/interop.dart
 * 
 * To regenerate: npm run generate-types
 */

/**
 * Global Dart bridge namespace
 */
declare global {
  interface Window {
    dartbridge: DartBridge;
  }

  const dartbridge: DartBridge;
}

/**
 * Main Dart bridge interface
 */
export interface DartBridge {
  /**
   * functionName - Dart function exposed to JavaScript
   */
  functionName: () => void;

  /**
   * quickSort - Dart function exposed to JavaScript
   */
  quickSort: (list: number[], low: number, high: number) => number[];

  /**
   * fetchData - Dart function exposed to JavaScript
   */
  fetchData: () => Promise<string>;

  /**
   * anotherFunction - Dart function exposed to JavaScript
   */
  anotherFunction: () => void;

}

export {};
