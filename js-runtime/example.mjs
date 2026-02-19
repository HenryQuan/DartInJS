/**
 * Example: Using Dart compiled code in Node.js/Bun
 * 
 * This demonstrates how to use the compiled Dart JavaScript
 * in a Node.js or Bun environment.
 */

// Use the loader to properly initialize and load Dart code
import dartbridge from './dartloader.mjs';

console.log('='.repeat(60));
console.log('Dart in JavaScript - Node.js/Bun Example');
console.log('='.repeat(60));

// Example 1: Call a simple function
console.log('\n1. Testing basic function call:');
try {
  dartbridge.functionName();
} catch (error) {
  console.error('Error:', error);
}

// Example 2: Sort an array using Dart's QuickSort
console.log('\n2. Testing QuickSort:');
const unsorted = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50, 23, 36, 18, 77];
console.log('Before sorting:', unsorted);

const sorted = dartbridge.quickSort(unsorted, 0, unsorted.length - 1);
console.log('After sorting:', sorted);

// Example 3: Sort with edge cases
console.log('\n3. Testing edge cases:');
const empty = [];
const single = [42];
const duplicate = [5, 2, 8, 2, 9, 1, 5];

console.log('Empty array:', dartbridge.quickSort(empty, 0, Math.max(0, empty.length - 1)));
console.log('Single element:', dartbridge.quickSort(single, 0, single.length - 1));
console.log('With duplicates:', dartbridge.quickSort(duplicate, 0, duplicate.length - 1));

// Example 4: Async operation - fetch data
console.log('\n4. Testing async fetch (requires internet):');
try {
  const data = await dartbridge.fetchData();
  console.log('Fetched data length:', data.length, 'characters');
  
  // Parse JSON data
  const parsed = JSON.parse(data);
  console.log('Parsed data keys:', Object.keys(parsed).slice(0, 5));
  console.log('Data sample:', JSON.stringify(parsed).substring(0, 200) + '...');
} catch (error) {
  console.error('Fetch error:', error.message);
}

// Example 5: Performance test
console.log('\n5. Performance test:');
const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
console.log('Sorting', largeArray.length, 'elements...');

const startTime = performance.now();
const sortedLarge = dartbridge.quickSort(largeArray, 0, largeArray.length - 1);
const endTime = performance.now();

console.log('Sorted in', (endTime - startTime).toFixed(2), 'ms');
console.log('First 10 elements:', sortedLarge.slice(0, 10));
console.log('Last 10 elements:', sortedLarge.slice(-10));

// Example 6: Using TypeScript types (if using TypeScript)
console.log('\n6. TypeScript Integration:');
console.log('When using TypeScript, import the types:');
console.log('  import { DartBridge } from "./dist/interop";');
console.log('  declare const dartbridge: DartBridge;');
console.log('This provides full type checking and autocomplete!');

console.log('\n' + '='.repeat(60));
console.log('All examples completed!');
console.log('='.repeat(60));

// new dummy function
dartbridge.anotherFunction();
