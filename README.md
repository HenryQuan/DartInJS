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

### In Node.js/Bun with TypeScript (Recommended)

```typescript
import type { DartBridge } from '../dist/interop.js';
import dartbridge from './dart-loader.mjs';

const bridge = dartbridge as unknown as DartBridge;

// Full type safety and IDE autocomplete!
const sorted: number[] = bridge.quickSort([3, 1, 4], 0, 2);
const data: string = await bridge.fetchData();
```

### In Browser (React/TypeScript)

```typescript
import { DartBridge } from './DartBridge';

// Sort an array using Dart's quicksort
const numbers = [3, 1, 4, 1, 5, 9];
const sorted = DartBridge.get().quickSort(numbers, 0, numbers.length - 1);
console.log(sorted); // [1, 1, 3, 4, 5, 9]

// Fetch data using Dart's http package
const data = await DartBridge.get().fetchData();
console.log(JSON.parse(data));
```

### In Node.js/Bun

```javascript
// Use the dart-loader to properly initialize
import dartbridge from './dart-loader.mjs';

// Call Dart functions
dartbridge.functionName();
const sorted = dartbridge.quickSort([5, 2, 8, 1], 0, 3);
```

## 🏗️ How It Works

1. **Write Dart Code** - Use the full power of Dart language and packages
2. **Export Functions** - Use native `dart:js_interop` (no 3rd party dependencies)
3. **Compile to JS** - Automated build scripts handle compilation with optimizations
4. **Use Anywhere** - Import the compiled JS in any JavaScript environment

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
├── js-runtime/        # JavaScript/Bun runtime files
│   ├── dart-loader.mjs      # Loader for Node.js/Bun
│   ├── example-node.mjs     # JavaScript example
│   ├── example-node.ts      # TypeScript example (with type hints!)
│   └── package.json
├── dist/              # Compiled output (gitignored except .d.ts)
│   ├── interop.js           # Production build (186KB)
│   ├── interop.dev.js       # Development build (582KB)
│   └── interop.d.ts         # Auto-generated TypeScript definitions
├── scripts/           # Cross-platform build scripts
├── dartonbrowser/     # Example browser app (Vite + React)
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
The `dartbridge` global namespace approach is **optimal** because:
- **Explicit interface** - Clear contract between Dart and JavaScript
- **Type generation** - Automatic TypeScript definitions from Dart code
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
4. Provides type-safe loader for all JS runtimes
5. Scales to hundreds of functions without complexity

**Result**: Maximum performance, full type safety, minimal boilerplate.

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


