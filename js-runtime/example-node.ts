/**
 * Example: Using Dart compiled code in Node.js/Bun/Deno with TypeScript
 * 
 * This demonstrates how to use the compiled Dart JavaScript
 * with full type safety in a TypeScript environment.
 */

// Import the type definitions
import type { DartBridge } from '../dist/interop.js';

// Use the loader to properly initialize and load Dart code
import dartbridge from './dart-loader.mjs';

// TypeScript knows the exact types of all dartbridge methods!
const typedBridge = dartbridge as unknown as DartBridge;

console.log('='.repeat(60));
console.log('Dart in TypeScript - Type-Safe Example');
console.log('='.repeat(60));

// Example 1: Call a simple function (TypeScript knows it returns void)
console.log('\n1. Testing basic function call:');
try {
  typedBridge.functionName(); // Type: () => void
} catch (error) {
  console.error('Error:', error);
}

// Example 2: Sort an array using Dart's QuickSort (fully typed!)
console.log('\n2. Testing QuickSort:');
const unsorted: number[] = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50, 23, 36, 18, 77];
console.log('Before sorting:', unsorted);

// TypeScript knows: quickSort(list: number[], low: number, high: number): number[]
const sorted: number[] = typedBridge.quickSort(unsorted, 0, unsorted.length - 1);
console.log('After sorting:', sorted);

// Example 3: Sort with edge cases (type-checked)
console.log('\n3. Testing edge cases:');
const empty: number[] = [];
const single: number[] = [42];
const duplicate: number[] = [5, 2, 8, 2, 9, 1, 5];

console.log('Empty array:', typedBridge.quickSort(empty, 0, Math.max(0, empty.length - 1)));
console.log('Single element:', typedBridge.quickSort(single, 0, single.length - 1));
console.log('With duplicates:', typedBridge.quickSort(duplicate, 0, duplicate.length - 1));

// Example 4: Async operation - fetch data (TypeScript knows it returns Promise<string>)
console.log('\n4. Testing async fetch (requires internet):');
try {
  const data: string = await typedBridge.fetchData(); // Type: Promise<string>
  console.log('Fetched data length:', data.length, 'characters');
  
  // Parse JSON data
  const parsed = JSON.parse(data);
  console.log('Parsed data keys:', Object.keys(parsed).slice(0, 5));
  console.log('Data sample:', JSON.stringify(parsed).substring(0, 200) + '...');
} catch (error) {
  console.error('Fetch error:', (error as Error).message);
}

// Example 5: Performance test with type safety
console.log('\n5. Performance test:');
const largeArray: number[] = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
console.log('Sorting', largeArray.length, 'elements...');

const startTime = performance.now();
const sortedLarge: number[] = typedBridge.quickSort(largeArray, 0, largeArray.length - 1);
const endTime = performance.now();

console.log('Sorted in', (endTime - startTime).toFixed(2), 'ms');
console.log('First 10 elements:', sortedLarge.slice(0, 10));
console.log('Last 10 elements:', sortedLarge.slice(-10));

// Example 6: Type checking prevents errors!
console.log('\n6. TypeScript Benefits:');
console.log('✓ IDE autocomplete for all Dart functions');
console.log('✓ Compile-time type checking');
console.log('✓ Prevents runtime errors');
console.log('✓ Better refactoring support');

// Uncomment to see TypeScript errors:
// typedBridge.quickSort("not a number array", 0, 5); // ❌ Error: string[] not assignable to number[]
// typedBridge.quickSort([1, 2, 3], "not a number", 2); // ❌ Error: string not assignable to number
// const wrongType: number = typedBridge.functionName(); // ❌ Error: void not assignable to number

console.log('\n' + '='.repeat(60));
console.log('All examples completed with type safety!');
console.log('='.repeat(60));

console.log('\n💡 Pro tip: Use this with "tsx" or "bun" for zero-config TypeScript execution:');
console.log('   npx tsx js-runtime/example-node.ts');
console.log('   bun js-runtime/example-node.ts');
