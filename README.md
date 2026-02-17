# Dart in JS - Modern Cross-Platform Integration

> **State-of-the-art approach to reuse Dart code in browsers and share converted JS across all platforms**

This project demonstrates how to compile Dart code to JavaScript using modern tooling and best practices, enabling seamless integration across browsers, Node.js, Bun, and other JavaScript runtimes.

## ✨ What's New

This repository now features a **complete modern build system** with:

- 🔧 **Automated Build Scripts** - One command to compile everything
- 📦 **Organized Distribution** - Clean `dist/` directory structure
- 🎯 **TypeScript Definitions** - Full type safety and IDE support
- ⚡ **Development Mode** - Watch mode for rapid iteration
- 🌐 **Cross-Platform Ready** - Use in browsers, Node.js, Bun, etc.
- 📱 **Example Browser App** - Vite + React demo included

## 🚀 Quick Start

```bash
# Build Dart to JavaScript
npm run build

# Run the browser example
npm run dev:browser

# Watch mode for development
npm run watch
```

## 📖 Documentation

For comprehensive documentation, see **[DOCUMENTATION.md](./DOCUMENTATION.md)** which includes:

- Complete setup instructions
- Usage examples for different platforms
- Development workflow guide
- API reference with TypeScript types
- Architecture explanation

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
import './dist/interop.js';

// Call Dart functions via the global dartbridge
globalThis.dartbridge.functionName();
const sorted = globalThis.dartbridge.quickSort([5, 2, 8, 1], 0, 3);
```

## 🏗️ How It Works

1. **Write Dart Code** - Use the full power of Dart language and packages
2. **Export Functions** - Use `js_interop_utils` for modern JS interop
3. **Compile to JS** - Automated build scripts handle compilation with optimizations
4. **Use Anywhere** - Import the compiled JS in any JavaScript environment

### Example: Exposing a Dart Function

```dart
// In interop.new.dart
@JS('globalThis.dartbridge.myFunction')
external set _myFunction(JSFunction f);

JSNumber _myFunctionImpl(JSNumber input) {
  return (input.toDartInt * 2).toJS;
}

void main() {
  _myFunction = _myFunctionImpl.toJS;
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
| `npm run build` | Compile Dart to optimized JavaScript |
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
- **TypeScript definitions** for all exported functions
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

- **[Full Documentation](./DOCUMENTATION.md)** - Complete guide
- **[Dart JS Interop](https://dart.dev/web/js-interop)** - Official Dart docs
- **[dart2js](https://dart.dev/tools/dart2js)** - Compiler documentation

## 🤝 Contributing

See [DOCUMENTATION.md](./DOCUMENTATION.md) for details on adding new Dart functions and extending the bridge.

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


