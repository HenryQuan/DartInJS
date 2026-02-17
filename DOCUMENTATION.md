# Dart in JS - State-of-the-Art Cross-Platform Integration

> **Reuse all your Dart code in browsers and share converted JS code across all platforms with modern tooling and optimization.**

This project demonstrates a state-of-the-art approach to compile Dart code to JavaScript and use it seamlessly across different platforms including browsers, Node.js, Bun, and more.

## 🚀 Features

- ✅ **Modern Build System**: Automated compilation scripts with optimization flags
- ✅ **TypeScript Support**: Full TypeScript definitions for type-safe integration
- ✅ **Cross-Platform**: Share compiled JS across browsers, Node.js, Bun, and other platforms
- ✅ **Development Workflow**: Watch mode for automatic recompilation during development
- ✅ **Production Ready**: Minified production builds with source maps for debugging
- ✅ **React Integration**: Example Vite + React app demonstrating browser usage
- ✅ **Module System**: ES6 module compatible output with proper packaging

## 📋 Prerequisites

- [Dart SDK](https://dart.dev/get-dart) (3.7.2 or later)
- [Node.js](https://nodejs.org/) (16.0.0 or later)
- npm or bun package manager

## 🏗️ Project Structure

```
DartInJS/
├── dist/                      # Compiled JavaScript output
│   ├── interop.js            # Production build (minified)
│   ├── interop.dev.js        # Development build (with asserts)
│   └── interop.d.ts          # TypeScript definitions
├── scripts/                   # Build automation scripts
│   ├── build-dart.sh         # Main build script
│   └── watch-dart.sh         # Development watch mode
├── dartonbrowser/            # Example browser app (Vite + React)
│   └── public/dart/          # Compiled Dart JS copied here
├── *.dart                    # Dart source files
├── package.json              # Node.js package configuration
└── pubspec.yaml              # Dart package configuration
```

## 🔧 Quick Start

### 1. Install Dependencies

```bash
# Install Dart dependencies
dart pub get

# Install Node.js dependencies (for browser app)
cd dartonbrowser && npm install
```

### 2. Build Dart to JavaScript

```bash
# Run build script
npm run build

# Or use the script directly
./scripts/build-dart.sh
```

This will:
- Compile Dart code to optimized JavaScript
- Generate both production and development builds
- Create TypeScript definitions
- Copy files to the browser app's public directory

### 3. Run the Browser Example

```bash
# Development mode with hot reload
npm run dev:browser

# Build for production
npm run build:browser

# Preview production build
npm run preview:browser
```

## 📖 Usage

### In Browser (with Vite/React)

The example app in `dartonbrowser/` shows how to use Dart functions in a React application:

```typescript
import { DartBridge } from './DartBridge';

// Use Dart functions
const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const sorted = DartBridge.get().quickSort(numbers, 0, numbers.length - 1);
console.log(sorted); // [1, 1, 2, 3, 4, 5, 5, 6, 9]

// Async operations
const data = await DartBridge.get().fetchData();
console.log(JSON.parse(data));
```

### In Node.js or Bun

```javascript
// Load the compiled Dart code
import './dist/interop.js';

// Use the dartbridge namespace
globalThis.dartbridge.functionName();

const numbers = [5, 2, 8, 1, 9];
const sorted = globalThis.dartbridge.quickSort(numbers, 0, numbers.length - 1);
console.log(sorted);
```

### With TypeScript

TypeScript definitions are automatically available:

```typescript
import { DartBridge } from './dist/interop';

declare const dartbridge: DartBridge;

// Full type checking and autocomplete
const result: number[] = dartbridge.quickSort([3, 1, 2], 0, 2);
const data: Promise<string> = dartbridge.fetchData();
```

## 🛠️ Development Workflow

### Watch Mode

For active development, use watch mode to automatically recompile when Dart files change:

```bash
npm run watch
```

### Adding New Dart Functions

1. **Write your Dart function** in a `.dart` file
2. **Export it via interop** in `interop.new.dart`:
   ```dart
   @JS('globalThis.dartbridge.myFunction')
   external set _myFunction(JSFunction f);
   
   void main() {
     _myFunction = myFunctionImpl.toJS;
   }
   ```
3. **Update TypeScript definitions** in `dist/interop.d.ts`:
   ```typescript
   export interface DartBridge {
     myFunction: (param: string) => number;
   }
   ```
4. **Rebuild**: Run `npm run build`

## 📦 Distribution

The compiled JavaScript can be distributed as:

1. **NPM Package**: The `dist/` directory contains all necessary files
2. **CDN**: Host `dist/interop.js` on any CDN
3. **Bundled**: Import directly in your bundler (Webpack, Rollup, Vite, etc.)
4. **Script Tag**: Load directly in HTML with `<script src="interop.js"></script>`

## 🎯 Optimization Flags

The build uses these optimization flags for production:

- `-O4`: Maximum optimization level
- `--minify`: Minify output for smaller file size
- Production build: ~188KB (example implementation)
- Development build: ~587KB (with assertions and debugging info)

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build Dart to JavaScript |
| `npm run watch` | Watch mode for development |
| `npm run clean` | Clean build artifacts |
| `npm run dev:browser` | Start browser dev server |
| `npm run build:browser` | Build browser app for production |
| `npm run preview:browser` | Preview production browser build |

## 🌟 Key Improvements Over Basic Approach

### Before (Manual Process)
```bash
dart compile js -O2 -o quick.js quick.dart
# Manual copying
# No type definitions
# No automation
```

### After (SOTA Approach)
```bash
npm run build
# ✅ Automated compilation
# ✅ TypeScript definitions
# ✅ Multiple build variants
# ✅ Organized output structure
# ✅ Cross-platform ready
# ✅ Development workflow
```

## 📚 Technical Details

### Dart to JavaScript Compilation

We use `dart compile js` with modern optimizations:
- **dart2js compiler**: Mature, production-ready compiler
- **Tree-shaking**: Removes unused code
- **Minification**: Reduces file size
- **Source maps**: Enable debugging in development

### Interop Strategy

Using `js_interop_utils` (modern approach):
- Type-safe JavaScript interop
- Automatic type conversions
- Promise support for async operations
- Better performance than legacy `package:js`

### Module System

- ES6 modules by default
- Works with modern bundlers
- Compatible with legacy script tags
- Namespace isolation via `dartbridge`

## 🤝 Contributing

To extend this project:

1. Add Dart functions in `.dart` files
2. Export via `interop.new.dart`
3. Update TypeScript definitions
4. Rebuild and test

## 📄 License

[Add your license here]

## 🔗 Resources

- [Dart Documentation](https://dart.dev/guides)
- [dart2js Compiler](https://dart.dev/tools/dart2js)
- [JS Interop](https://dart.dev/web/js-interop)
- [Vite Documentation](https://vitejs.dev/)

---

**Built with ❤️ using state-of-the-art Dart to JavaScript compilation**
