# Dart in JS - Cross-Platform Integration

> Compile Dart code to JavaScript and use it in browsers, Node.js, React Native, or any JS runtime — share Dart logic across platforms without rewriting it.

## Why?

If you already have Dart/Flutter business logic, this lets you **reuse it in web or React Native** projects with zero rewrites. Gradually migrate from Flutter to web or React Native by compiling shared Dart code to JS, exposing it through a typed bridge, and importing it wherever you need it. No more maintaining duplicate logic in two languages.

## 🚀 Quick Start

```bash
npm run build        # Compile Dart → JS + auto-generate TypeScript types
npm test             # Verify everything works (17 tests)
npm run dev:browser  # Browser dev server (React + Vite)
npm run watch        # Auto-rebuild on file changes
npm run example:ts   # Run Node.js TypeScript example
```
> All commands work with **npm**, **yarn**, or **bun** on Windows, macOS, and Linux.

## 🎯 Usage

**TypeScript / Node.js / Bun / Deno** — import and call with full type safety:
```typescript
import dartbridge from './dartloader.ts';

const sorted: number[] = dartbridge.quickSort([3, 1, 4], 0, 2);
const data: string = await dartbridge.fetchData();
```

**Browser / React / React Native** — same API via the shared loader:
```typescript
import { getDartBridge } from '../../shared/dartloader';
const dartbridge = getDartBridge();

const sorted = dartbridge.quickSort([3, 1, 4, 1, 5, 9], 0, 5); // [1,1,3,4,5,9]
const data = JSON.parse(await dartbridge.fetchData());
```

**Adding a new Dart function** (then run `npm run build` — types auto-generate):
```dart
// dart/interop.dart
@JS('globalThis.dartbridge.myFn') external set _myFn(JSFunction f);
JSString _myFnImpl(JSString s) => s.toDart.toUpperCase().toJS;
void main() { _myFn = _myFnImpl.toJS; }
```
```typescript
// auto-generated dist/interop.d.ts
export interface DartBridge { myFn: (s: string) => string; }

// usage — full IntelliSense, no casting
dartbridge.myFn("hello"); // "HELLO"
```

## 🏗️ How It Works

1. **Write Dart** — use the full Dart SDK and packages (`dart:js_interop`, no 3rd-party deps)
2. **Compile** — `dart2js -O4 --minify` produces an optimized JS bundle in `dist/`
3. **Auto-type** — a type generator reads Dart signatures and emits `dist/interop.d.ts`
4. **Load anywhere** — `shared/dartloader.ts` auto-detects browser vs Node.js and returns the typed bridge

```
dist/
├── interop.js      # Production (188 KB minified)
├── interop.dev.js  # Dev build with assertions
├── interop.d.ts    # Auto-generated TypeScript definitions
└── *.map           # Source maps
```

## 📁 Structure

```
DartInJS/
├── dart/           # Dart source (interop.dart, quick.dart, httpin.dart)
├── shared/         # dartloader.ts — universal typed loader (browser + Node.js)
├── js-runtime/     # Node.js/Bun examples (example.mjs, example.ts)
├── dartonbrowser/  # React + Vite browser example
├── dist/           # Compiled output (auto-generated)
└── scripts/        # Cross-platform build scripts
```

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile Dart + generate TypeScript types |
| `npm run watch` | Auto-recompile on changes |
| `npm run clean` | Remove build artifacts |
| `npm test` | Run test suite |
| `npm run dev:browser` | Browser dev server |
| `npm run build:browser` | Production browser build |
| `npm run generate-types` | Regenerate types only |

## 🎓 Learn More

- **[Dart JS Interop](https://dart.dev/web/js-interop)** — Official docs for native Dart-JavaScript interop
- **[dart2js](https://dart.dev/tools/dart2js)** — Compiler reference and optimization flags (-O4, --minify)


