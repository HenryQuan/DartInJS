# Shared Dart Loader

This directory contains the shared TypeScript loader for the Dart bridge that works in both Node.js and browser environments.

## Files

- **`dartloader.ts`** - Shared loader with TypeScript types

## Usage

### Browser (React/Vite)

The browser app uses a singleton pattern for convenience:

```typescript
import { DartBridge } from './DartBridge';

// Initialize once in main.tsx
DartBridge.autoBridge();

// Use anywhere in your app
DartBridge.get().functionName();
DartBridge.get().quickSort([3, 1, 2], 0, 2);
await DartBridge.get().fetchData();
```

Or use the shared loader directly:

```typescript
import { getDartBridge } from '../../shared/dartloader';

const dartbridge = getDartBridge();
dartbridge.functionName();
```

### Node.js/Bun/Deno

The loader automatically initializes when imported:

```typescript
import dartbridge from '../shared/dartloader';

// Use directly with full type safety
dartbridge.functionName();
const sorted = dartbridge.quickSort([3, 1, 2], 0, 2);
const data = await dartbridge.fetchData();
```

Or use explicit initialization:

```typescript
import { initDartBridge } from '../shared/dartloader';

const dartbridge = await initDartBridge();
dartbridge.functionName();
```

## Type Safety

All methods are fully typed based on the auto-generated `dist/interop.d.ts` file, which is generated from your Dart code. TypeScript will provide:

- ✓ Autocomplete for all Dart functions
- ✓ Compile-time type checking
- ✓ Parameter validation
- ✓ Return type inference

## Architecture

1. **Dart Code** (`dart/interop.dart`) - Defines exported functions
2. **Type Generation** - Auto-generates `dist/interop.d.ts` with TypeScript types
3. **Shared Loader** (`shared/dartloader.ts`) - Provides typed access to the bridge
4. **Platform-specific** - Browser uses singleton, Node.js uses direct import

This ensures type safety across all platforms while minimizing code duplication.
