/**
 * TypeScript definitions for Dart-compiled JavaScript interop
 * 
 * This file provides type-safe access to Dart functions compiled to JavaScript.
 * Use this for better IDE support and type checking when integrating Dart code in TypeScript/JavaScript projects.
 */

/**
 * Global Dart bridge namespace
 * All Dart functions are exposed under this namespace for better organization and avoiding global scope pollution
 */
declare global {
  interface Window {
    dartbridge: DartBridge;
  }

  const dartbridge: DartBridge;
}

/**
 * Main Dart bridge interface
 * Add new methods here as you expose more Dart functions to JavaScript
 */
export interface DartBridge {
  /**
   * Test function to verify Dart interop is working correctly
   * Prints "Hello from Dart!" to the console
   */
  functionName: () => void;

  /**
   * Sorts an array of numbers using the quicksort algorithm implemented in Dart
   * 
   * @param list - Array of numbers to sort
   * @param low - Starting index (usually 0)
   * @param high - Ending index (usually list.length - 1)
   * @returns Sorted array of numbers (sorts in-place and returns the array)
   * 
   * @example
   * ```typescript
   * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5];
   * const sorted = dartbridge.quickSort(numbers, 0, numbers.length - 1);
   * console.log(sorted); // [1, 1, 2, 3, 4, 5, 5, 6, 9]
   * ```
   */
  quickSort: (list: number[], low: number, high: number) => number[];

  /**
   * Fetches data from a remote URL using Dart's http package
   * 
   * @returns Promise that resolves with the fetched data as a string
   * @throws Error if the fetch fails or returns a non-200 status code
   * 
   * @example
   * ```typescript
   * try {
   *   const data = await dartbridge.fetchData();
   *   const parsed = JSON.parse(data);
   *   console.log(parsed);
   * } catch (error) {
   *   console.error('Failed to fetch:', error);
   * }
   * ```
   */
  fetchData: () => Promise<string>;
}

export {};
