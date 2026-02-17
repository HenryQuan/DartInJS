# Dart in JS - Cross-Platform Integration

> Compile Dart code to JavaScript with modern tooling for use in browsers, Node.js, Bun, and other JavaScript runtimes.

## ✨ Features

- 🔧 **Automated Build Scripts** - One command to compile everything
- 📦 **Organized Distribution** - Clean `dist/` directory structure  
- 🎯 **Auto-Generated TypeScript Definitions** - Type safety without manual maintenance
- ⚡ **Watch Mode** - Auto-rebuild on file changes
- 🌐 **Cross-Platform** - Works in browsers, Node.js, Bun, etc.

## 🚀 Quick Start

```bash
# Build Dart to JavaScript
npm run build

# Run the browser example  
npm run dev:browser

# Watch mode for development
npm run watch

# Run Node.js example
npm run example:node
```

## 🎯 Usage Example

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
2. **Export Functions** - Use `js_interop_utils` for modern JS interop
3. **Compile to JS** - Automated build scripts handle compilation with optimizations
4. **Use Anywhere** - Import the compiled JS in any JavaScript environment

### Example: Exposing a Dart Function

```dart
// In interop.new.dart

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

| Command | Description |
|---------|-------------|
| `npm run build` | Compile Dart to optimized JavaScript + auto-generate types |
| `npm run generate-types` | Regenerate TypeScript definitions from Dart code |
| `npm run watch` | Auto-recompile on file changes |
| `npm run clean` | Remove build artifacts |
| `npm run dev:browser` | Start browser development server |
| `npm run build:browser` | Build browser app for production |

## 🌟 Key Features

### Modern Build System
- **Automated compilation** with optimization flags (-O4, --minify)
- **Multiple build variants** (production + development)
- **Source maps** for debugging
- **Watch mode** for development

### Type Safety
- **Auto-generated TypeScript definitions** from Dart signatures
- **No manual type maintenance** - types update automatically with your Dart code
- **IDE autocomplete** and error checking
- **Type conversions** handled automatically

### Cross-Platform
- **Browser compatible** (via script tag or module)
- **Node.js/Bun compatible** (ES modules)
- **Bundler friendly** (Webpack, Rollup, Vite, etc.)
- **CDN ready** for distribution

## 📁 Project Structure

```
DartInJS/
├── dist/              # Compiled output (gitignored except .d.ts)
├── scripts/           # Build automation scripts
├── dartonbrowser/     # Example browser app (Vite + React)
├── *.dart            # Dart source files
├── package.json      # Node.js configuration
└── pubspec.yaml      # Dart configuration
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


