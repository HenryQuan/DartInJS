# Dart in JS - Cross-Platform Integration

> Compile Dart code to JavaScript with modern tooling for use in browsers, Node.js, Bun, and other JavaScript runtimes.

## ✨ Features

- 🔧 **Cross-Platform Build Scripts** - Works on Windows, macOS, Linux with Node, Yarn, or Bun
- 📦 **Organized Distribution** - Clean `dist/` directory structure  
- 🎯 **Auto-Generated TypeScript Definitions** - Type safety without manual maintenance
- ⚡ **Watch Mode** - Auto-rebuild on file changes
- 🌐 **Universal Runtime Support** - Works in browsers, Node.js, Bun, Deno
- ✅ **Integrated Tests** - Automated test suite to verify functionality

## 🚀 Quick Start

**Works with npm, yarn, or bun on Windows, macOS, and Linux!**

```bash
# Build Dart to JavaScript
npm run build        # or: yarn build / bun run build

# Run tests to verify setup
npm test            # or: yarn test / bun test

# Run the browser example  
npm run dev:browser

# Watch mode for development
npm run watch

# Run Node.js/Bun examples
npm run example:js   # JavaScript version
npm run example:ts   # TypeScript version (with type hints!)
```

## 🎯 Usage Example

### In Node.js/Bun/Deno with TypeScript (Recommended)

```typescript
// Import the typed dartbridge - no casting needed!
import dartbridge from './dartloader.ts';

// Full type safety and IDE autocomplete!
const sorted: number[] = dartbridge.quickSort([3, 1, 4], 0, 2);
const data: string = await dartbridge.fetchData();
dartbridge.functionName();
dartbridge.anotherFunction();
```

### In Browser (React/TypeScript)

```typescript
import { getDartBridge } from '../../shared/dartloader';

// Get the typed dartbridge
const dartbridge = getDartBridge();

// Sort an array using Dart's quicksort
const numbers = [3, 1, 4, 1, 5, 9];
const sorted = dartbridge.quickSort(numbers, 0, numbers.length - 1);
console.log(sorted); // [1, 1, 3, 4, 5, 9]

// Fetch data using Dart's http package
const data = await dartbridge.fetchData();
console.log(JSON.parse(data));

// Call other exported functions
dartbridge.functionName();
dartbridge.anotherFunction();
```

### In Node.js/Bun (JavaScript)

```javascript
// Use the dartloader to properly initialize
import dartbridge from './dartloader.mjs';

// Call Dart functions
dartbridge.functionName();
const sorted = dartbridge.quickSort([5, 2, 8, 1], 0, 3);
```

## 🏗️ How It Works

1. **Write Dart Code** - Use the full power of Dart language and packages
2. **Export Functions** - Use native `dart:js_interop` (no 3rd party dependencies)
3. **Compile to JS** - Automated build scripts handle compilation with optimizations
4. **Use Anywhere** - Import the compiled JS in any JavaScript environment

### 🔌 Unified Dartloader

The `shared/dartloader.ts` provides a **universal type-safe loader** that works seamlessly in both browser and Node.js environments:

**Key Features:**
- ✅ **Zero type casting** - Direct imports with IntelliSense
- ✅ **Universal** - Same API for browser and Node.js
- ✅ **Auto-typed** - Uses generated TypeScript definitions
- ✅ **Simple** - Just import and use

**How it works:**

```typescript
// shared/dartloader.ts exports:
export function getDartBridge(): DartBridge      // Get the typed bridge
export function initDartBridge(): Promise<DartBridge>  // Initialize for Node.js
export default dartbridge                         // Default export (auto-init)
```

**Browser usage:**
```typescript
import { getDartBridge } from '../../shared/dartloader';
const dartbridge = getDartBridge();  // Gets window.dartbridge with types
```

**Node.js usage:**
```typescript
import dartbridge from './dartloader.ts';  // Auto-initializes and returns typed bridge
```

The loader automatically detects the environment and provides the correct bridge reference with full TypeScript types!

### Example: Exposing a Dart Function

```dart
// In dart/interop.dart

import 'dart:js_interop';

// 1. Declare the JS external setter
@JS('globalThis.dartbridge.myFunction')
external set _myFunction(JSFunction f);

// 2. Implement your function
JSNumber _myFunctionImpl(JSNumber input) {
  return (input.toDartInt * 2).toJS;
}

// 3. Register in main()
void main() {
  _myFunction = _myFunctionImpl.toJS;
}
```

**TypeScript definitions are auto-generated!** Run `npm run build` and the type generator will automatically create TypeScript definitions from your Dart code:

```typescript
// dist/interop.d.ts (auto-generated)
export interface DartBridge {
  myFunction: (input: number) => number;
}
```

## 📊 Build Output

```
dist/
├── interop.js        # Production build (188KB minified)
├── interop.dev.js    # Development build with assertions
├── interop.d.ts      # TypeScript definitions
└── *.map             # Source maps for debugging
```

## 🛠️ Available Commands

All commands work with **npm**, **yarn**, or **bun** on any platform:

| Command | Description |
|---------|-------------|
| `npm run build` | Compile Dart to optimized JavaScript + auto-generate types |
| `npm run generate-types` | Regenerate TypeScript definitions from Dart code |
| `npm run watch` | Auto-recompile on file changes |
| `npm run clean` | Remove build artifacts (cross-platform) |
| `npm run verify` | Verify environment and setup |
| `npm test` | Run test suite to validate functionality |
| `npm run dev:browser` | Start browser development server |
| `npm run build:browser` | Build browser app for production |

## 🌟 Key Features

### Cross-Platform Build System
- **Universal scripts** - JavaScript-based, works on Windows, macOS, Linux
- **Multiple runtimes** - Node.js, Yarn, Bun, or Deno
- **Automated compilation** with optimization flags (-O4, --minify)
- **Multiple build variants** (production + development)
- **Source maps** for debugging
- **Watch mode** for development
- **Integrated tests** - Automated validation suite

### Type Safety
- **Auto-generated TypeScript definitions** from Dart signatures
- **No manual type maintenance** - types update automatically with your Dart code
- **IDE autocomplete** and error checking
- **Type conversions** handled automatically

### Universal Runtime Support
- **Browser compatible** (via script tag or module)
- **Node.js/Bun/Deno compatible** (ES modules)
- **Bundler friendly** (Webpack, Rollup, Vite, etc.)
- **CDN ready** for distribution

## 📁 Project Structure

```
DartInJS/
├── dart/              # Dart source files
│   ├── interop.dart   # JavaScript interop (uses dart:js_interop)
│   ├── quick.dart     # QuickSort implementation
│   ├── httpin.dart    # HTTP operations
│   └── pubspec.yaml   # Dart dependencies
├── shared/            # Shared TypeScript loader
│   ├── dartloader.ts  # Universal typed loader (browser + Node.js)
│   └── README.md      # Loader documentation
├── js-runtime/        # Node.js/Bun runtime examples
│   ├── dartloader.mjs # JavaScript loader
│   ├── dartloader.ts  # TypeScript loader (re-exports shared)
│   ├── example.mjs    # JavaScript example
│   ├── example.ts     # TypeScript example (full type safety!)
│   └── package.json
├── dartonbrowser/     # Browser example (Vite + React + TypeScript)
│   ├── src/
│   │   ├── App.tsx    # React app using getDartBridge()
│   │   └── main.tsx   # Entry point
│   └── index.html     # Loads Dart code before React
├── dist/              # Compiled output (auto-generated)
│   ├── interop.js     # Production build (optimized)
│   ├── interop.dev.js # Development build (with assertions)
│   └── interop.d.ts   # Auto-generated TypeScript definitions
├── scripts/           # Cross-platform build scripts
├── package.json       # Root package with build scripts
└── README.md
```

## 🏆 State-of-the-Art Approach

This project uses **SOTA (State-of-the-Art)** practices for Dart-to-JavaScript interop:

### ✅ Native Dart Interop
- **No 3rd party dependencies** - Uses only `dart:js_interop` from Dart SDK
- **Latest Dart 3.7.2+** - Leverages newest language features
- **Direct JS interop** - Minimal overhead, maximum performance

### ✅ Type-Safe Bridge Pattern
The `dartbridge` global namespace with shared loader is **optimal** because:
- **Explicit interface** - Clear contract between Dart and JavaScript
- **Unified loader** - Same code works in browsers and Node.js
- **Type generation** - Automatic TypeScript definitions from Dart code
- **Zero casting** - Direct imports with full type safety
- **IDE support** - Full autocomplete and type checking
- **Scalable** - Easy to add new functions without conflicts

### ✅ Modern Build System
- **Cross-platform** - Works on Windows, macOS, Linux
- **Multi-runtime** - Node.js, Yarn, Bun, Deno support
- **Automated** - One command builds everything
- **Optimized** - Production builds with -O4 and minification

### ✅ Developer Experience
- **Type safety** - Auto-generated TypeScript definitions
- **Hot reload** - Watch mode for rapid development
- **Comprehensive tests** - 17 automated tests validate everything
- **Examples** - Both JavaScript and TypeScript examples provided

### 🎯 Why This Approach?

**Traditional approaches** use complex wrappers or manual type definitions.

**This SOTA approach**:
1. Compiles Dart directly to optimized JavaScript
2. Exposes functions via a clean global namespace
3. Auto-generates TypeScript types from Dart signatures
4. Provides **unified type-safe loader** for all JS runtimes
5. **Zero type casting** - direct imports with full IntelliSense
6. Scales to hundreds of functions without complexity

**Result**: Maximum performance, full type safety, zero boilerplate.

## 💡 Quick Tips

### Getting Started
1. **Run tests first**: `npm test` to verify everything works
2. **Check examples**: Look at `js-runtime/example.ts` and `dartonbrowser/src/App.tsx`
3. **Add your Dart code**: Edit `dart/interop.dart` and export functions
4. **Rebuild**: Run `npm run build` to compile and generate types
5. **Use everywhere**: Import `dartbridge` with full TypeScript support

### Best Practices
- ✅ **Always use TypeScript** for the best experience
- ✅ **Import from shared/dartloader** for universal code
- ✅ **Let types regenerate** - don't manually edit `interop.d.ts`
- ✅ **Use watch mode** during development: `npm run watch`
- ✅ **Check browser console** to verify dartbridge initialization

### Common Patterns

**Adding a new Dart function:**
```dart
// 1. In dart/interop.dart
@JS('globalThis.dartbridge.myNewFunction')
external set _myNewFunction(JSFunction f);

JSString _myNewFunctionImpl(JSString input) {
  return input.toDart.toUpperCase().toJS;
}

void main() {
  // ... existing code ...
  _myNewFunction = _myNewFunctionImpl.toJS;
}
```

**Using it in TypeScript:**
```typescript
// 2. Rebuild: npm run build (types auto-generate!)
import dartbridge from './dartloader.ts';

// 3. Use with full IntelliSense!
const result = dartbridge.myNewFunction("hello"); // "HELLO"
```

## 🎓 Learn More

- **[Dart JS Interop](https://dart.dev/web/js-interop)** - Official Dart docs
- **[dart2js](https://dart.dev/tools/dart2js)** - Compiler documentation

---

**Previous Approach** (kept for reference):

The old manual compilation approach is still documented below for comparison:

<details>
<summary>Old Manual Approach (Click to expand)</summary>

This is finally working to use a Dart function in Javascript.

Update `@JS('globalThis.functionName')` to `window.xxx` for browsers.

Compile dart files into Javascript using:
```cmd
dart compile js -O2 -o quick.js .\quick.dart
dart compile js -O2 -o interop.js .\interop.dart
dart compile js -O2 -o interop.js .\interop.new.dart
```
The new js_interop is indeed easier to use, but the output JS file is larger and requires manual type conversions. I will still keep the initial implementation there to double check in the future.

Then, I use `bun` to run my `dartin.ts` to get my array sorted.
```cmd
bun .\dart.ts
```
You will get a long output, because it is a dart list.
```
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, [Symbol($ti)]: j {
    a: [Function: cM],
    b: [Function: cN],
    c: j {
      a: [Function: cI],
      b: [Function: bM],
      c: null,
      d: null,
      f: null,
      ...
      ...
```
However, the index will still work and will return null if it is out of bound.

</details>


