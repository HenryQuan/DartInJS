# Migration Guide: From Manual to Automated Workflow

This guide helps you understand the improvements and migrate from the old manual approach to the new state-of-the-art automated workflow.

## What Changed?

### Before (Manual Approach)
```bash
# Manual compilation for each file
dart compile js -O2 -o quick.js quick.dart
dart compile js -O2 -o interop.js interop.dart
dart compile js -O2 -o interop.js interop.new.dart

# Manual copying of files
# Manual integration in browser
# No type definitions
# No automation
```

### After (SOTA Approach)
```bash
# One command to build everything
npm run build

# Automatic compilation + optimization + type definitions + copying
# Watch mode for development
npm run watch

# Start browser app with hot reload
npm run dev:browser
```

## Key Improvements

### 1. Build System
- **Before**: Manual dart compile commands
- **After**: Automated scripts with proper error handling
- **Benefits**: 
  - One command builds everything
  - Consistent optimization flags (-O4, --minify)
  - Automatic file organization
  - Watch mode for development

### 2. File Organization
- **Before**: JS files scattered in root directory
- **After**: Clean dist/ directory structure
```
dist/
├── interop.js          # Production build (188KB)
├── interop.dev.js      # Development build (587KB)
├── interop.d.ts        # TypeScript definitions
└── *.map               # Source maps
```

### 3. TypeScript Support
- **Before**: No type definitions
- **After**: Full TypeScript support
- **Benefits**:
  - IDE autocomplete
  - Type checking
  - Better error messages
  - Improved developer experience

### 4. Cross-Platform Integration

#### Browser (Before)
```javascript
// Had to manually include compiled JS
<script src="interop.js"></script>
// Manual namespace management
```

#### Browser (After)
```javascript
// Organized loading with proper initialization
<script>window['dartbridge'] = {};</script>
<script src="/dart/interop.js"></script>
// Type-safe access
import { DartBridge } from './DartBridge';
```

#### Node.js/Bun (Before)
```javascript
// Direct import didn't work properly
// Namespace issues
// No proper examples
```

#### Node.js/Bun (After)
```javascript
// Clean module import
import dartbridge from './dart-loader.mjs';

// Type-safe usage
const sorted = dartbridge.quickSort([3, 1, 2], 0, 2);
```

### 5. Documentation
- **Before**: Basic README only
- **After**: Comprehensive documentation
  - `README.md`: Overview and quick start
  - `DOCUMENTATION.md`: Complete guide
  - `ARCHITECTURE.md`: Technical details
  - `example-node.mjs`: Working examples

### 6. Developer Experience
- **Before**: Manual everything
- **After**: Automated workflow
  - Environment verification: `npm run verify`
  - Clean build artifacts: `npm run clean`
  - Watch mode: `npm run watch`
  - Browser dev server: `npm run dev:browser`

## Migration Steps

### For Existing Users

#### Step 1: Update Your Repository
```bash
# Pull the latest changes
git pull origin main

# Install dependencies (if not done)
dart pub get
cd dartonbrowser && npm install && cd ..
```

#### Step 2: Build Using New System
```bash
# Instead of manual dart compile commands
npm run build

# Verify everything is set up correctly
npm run verify
```

#### Step 3: Update Your Integration

##### If using in Browser:
```html
<!-- Old way -->
<script src="interop.js"></script>

<!-- New way -->
<script>window['dartbridge'] = {};</script>
<script src="/dart/interop.js"></script>
```

```typescript
// Old way
// @ts-ignore
globalThis.dartbridge.functionName();

// New way
import { DartBridge } from './DartBridge';
DartBridge.get().functionName(); // Full type safety!
```

##### If using in Node.js/Bun:
```javascript
// Old way (didn't work properly)
import './interop.js';

// New way
import dartbridge from './dart-loader.mjs';
dartbridge.functionName();
```

#### Step 4: Adopt New Workflow

##### Development:
```bash
# Terminal 1: Watch Dart files
npm run watch

# Terminal 2: Run browser dev server
npm run dev:browser
```

##### Production Build:
```bash
# Build everything
npm run build:browser
```

### For New Projects

#### Step 1: Clone and Setup
```bash
git clone <repository-url>
cd DartInJS
dart pub get
cd dartonbrowser && npm install && cd ..
```

#### Step 2: Build
```bash
npm run build
```

#### Step 3: Run Examples
```bash
# Node.js example
npm run example:node

# Browser example
npm run dev:browser
```

#### Step 4: Start Developing
```bash
# Watch mode for auto-recompilation
npm run watch
```

## Breaking Changes

### None! 
The old files (`interop.dart`, `quick.dart`, etc.) are still there and work the same way. The new system adds capabilities without removing the old approach.

### Optional Improvements

You can optionally:
1. Delete old compiled `.js` files from root (they're now in `dist/`)
2. Update your HTML/JS imports to use the new organized structure
3. Use TypeScript definitions for better IDE support

## Compatibility

### What Still Works
- ✅ All original Dart code
- ✅ Manual compilation (if you prefer)
- ✅ Direct script includes
- ✅ Existing integrations

### What's Better Now
- ✅ Automated build process
- ✅ Better organization
- ✅ Type safety with TypeScript
- ✅ Development workflow
- ✅ Cross-platform support
- ✅ Comprehensive documentation

## Troubleshooting

### Build Fails
```bash
# Check if Dart SDK is installed
dart --version

# Check if in correct directory
pwd  # Should end with /DartInJS

# Run verification
npm run verify

# Clean and rebuild
npm run clean
npm run build
```

### Browser App Won't Start
```bash
# Make sure dependencies are installed
cd dartonbrowser
npm install

# Make sure Dart is built first
cd ..
npm run build

# Then start dev server
npm run dev:browser
```

### Node.js Example Fails
```bash
# Make sure dist/ is built
npm run build

# Run example
node example-node.mjs
```

### Types Not Working
```bash
# Make sure TypeScript can find the definitions
# Check that dist/interop.d.ts exists
ls -la dist/interop.d.ts

# Rebuild if needed
npm run build
```

## Benefits Summary

### For Developers
- 🚀 **Faster workflow**: One command instead of many
- 🎯 **Type safety**: Full TypeScript support
- 🔄 **Hot reload**: Watch mode + Vite HMR
- 📚 **Better docs**: Comprehensive guides
- ✅ **Verification**: Setup checker script

### For Production
- 📦 **Smaller bundles**: Better optimization (-O4)
- 🗺️ **Source maps**: Easier debugging
- 📁 **Clean structure**: Organized files
- 🔒 **Security**: CodeQL validated
- ⚡ **Performance**: Optimized builds

### For Teams
- 📖 **Documentation**: Everyone knows how it works
- 🔧 **Tooling**: Consistent build process
- 🎨 **Standards**: Best practices enforced
- 🧪 **Examples**: Reference implementations
- 🌐 **Cross-platform**: Works everywhere

## Next Steps

1. **Try it out**: Run `npm run build` and see the magic
2. **Run examples**: Check out `example-node.mjs` and the browser app
3. **Read docs**: Explore `DOCUMENTATION.md` and `ARCHITECTURE.md`
4. **Customize**: Adapt the build scripts to your needs
5. **Contribute**: Add more Dart functions and share!

## Questions?

- Check `DOCUMENTATION.md` for detailed usage
- Check `ARCHITECTURE.md` for technical details
- Check `README.md` for quick reference
- Run `npm run verify` to check your setup

## Feedback

This is a major improvement to the DartInJS workflow. If you have suggestions or find issues:
1. Open an issue on GitHub
2. Submit a pull request
3. Update the documentation

Happy coding! 🎉
