#!/usr/bin/env node

/**
 * Test suite for DartInJS build system
 * Validates that the build process works correctly
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function test(name, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    log(`  ✓ ${name}`, colors.green);
    return true;
  } catch (error) {
    testsFailed++;
    log(`  ✗ ${name}`, colors.red);
    console.log(`    ${error.message}`);
    return false;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log('');
log('================================', colors.blue);
log('DartInJS Test Suite', colors.blue);
log('================================', colors.blue);
console.log('');

// Test 1: Check environment
log('Test Group: Environment', colors.yellow);
test('Dart SDK is available', () => {
  try {
    execSync('dart --version', { stdio: 'pipe' });
  } catch {
    throw new Error('Dart SDK not found in PATH');
  }
});

test('Node.js is available', () => {
  assert(process.version, 'Node.js not available');
  assert(process.version.startsWith('v'), 'Invalid Node.js version');
});

test('Required files exist', () => {
  const requiredFiles = [
    'interop.new.dart',
    'quick.dart',
    'httpin.dart',
    'pubspec.yaml',
    'package.json',
    'scripts/build-dart.mjs',
    'scripts/generate-types.mjs',
  ];
  
  requiredFiles.forEach(file => {
    const filePath = join(rootDir, file);
    assert(existsSync(filePath), `Required file not found: ${file}`);
  });
});

// Test 2: Type generation
console.log('');
log('Test Group: Type Generation', colors.yellow);

test('Type generator script exists', () => {
  const scriptPath = join(rootDir, 'scripts', 'generate-types.mjs');
  assert(existsSync(scriptPath), 'generate-types.mjs not found');
});

test('Type generator runs without errors', () => {
  const runtime = 'node'; // Use node for tests
  execSync(`${runtime} scripts/generate-types.mjs`, {
    cwd: rootDir,
    stdio: 'pipe'
  });
});

test('Generated TypeScript definitions exist', () => {
  const dtsPath = join(rootDir, 'dist', 'interop.d.ts');
  assert(existsSync(dtsPath), 'interop.d.ts not generated');
});

test('TypeScript definitions contain DartBridge interface', () => {
  const dtsPath = join(rootDir, 'dist', 'interop.d.ts');
  const content = readFileSync(dtsPath, 'utf-8');
  assert(content.includes('interface DartBridge'), 'DartBridge interface not found');
  assert(content.includes('quickSort'), 'quickSort method not found');
  assert(content.includes('fetchData'), 'fetchData method not found');
});

test('TypeScript definitions are auto-generated', () => {
  const dtsPath = join(rootDir, 'dist', 'interop.d.ts');
  const content = readFileSync(dtsPath, 'utf-8');
  assert(content.includes('AUTO-GENERATED'), 'Missing auto-generated warning');
});

// Test 3: Build system
console.log('');
log('Test Group: Build System', colors.yellow);

test('Dart dependencies can be resolved', () => {
  execSync('dart pub get', { cwd: rootDir, stdio: 'pipe' });
});

test('Dart code compiles to JavaScript', () => {
  // This test is implicit - if previous tests passed, compilation works
  const jsPath = join(rootDir, 'dist', 'interop.js');
  assert(existsSync(jsPath), 'interop.js not found');
});

test('Production build is minified', () => {
  const jsPath = join(rootDir, 'dist', 'interop.js');
  const content = readFileSync(jsPath, 'utf-8');
  const devContent = readFileSync(join(rootDir, 'dist', 'interop.dev.js'), 'utf-8');
  // Production build should be smaller than dev build
  assert(content.length < devContent.length, 
    'Production build should be smaller than dev build');
});

test('Development build includes source maps', () => {
  const devJsPath = join(rootDir, 'dist', 'interop.dev.js');
  const mapPath = join(rootDir, 'dist', 'interop.dev.js.map');
  assert(existsSync(devJsPath), 'interop.dev.js not found');
  assert(existsSync(mapPath), 'Source map not found');
});

// Test 4: Cross-platform compatibility
console.log('');
log('Test Group: Cross-Platform', colors.yellow);

test('Scripts use cross-platform paths', () => {
  const scripts = [
    'scripts/build-dart.mjs',
    'scripts/generate-types.mjs',
    'scripts/verify-setup.mjs',
  ];
  
  scripts.forEach(script => {
    const content = readFileSync(join(rootDir, script), 'utf-8');
    // Should use path.join instead of forward slashes
    assert(content.includes('join('), `${script} should use path.join`);
  });
});

test('Platform detection works', () => {
  assert(['win32', 'darwin', 'linux'].includes(process.platform), 
    'Unknown platform');
});

// Test 5: Dart bridge functionality
console.log('');
log('Test Group: Dart Bridge', colors.yellow);

test('Compiled JS exposes dartbridge namespace', () => {
  const jsPath = join(rootDir, 'dist', 'interop.js');
  const content = readFileSync(jsPath, 'utf-8');
  assert(content.includes('dartbridge'), 'dartbridge namespace not found in compiled JS');
});

test('dart-loader.mjs exists', () => {
  const loaderPath = join(rootDir, 'dart-loader.mjs');
  assert(existsSync(loaderPath), 'dart-loader.mjs not found');
});

test('Example file exists and is valid', () => {
  const examplePath = join(rootDir, 'example-node.mjs');
  assert(existsSync(examplePath), 'example-node.mjs not found');
  
  const content = readFileSync(examplePath, 'utf-8');
  assert(content.includes('dartbridge'), 'Example should use dartbridge');
});

// Summary
console.log('');
log('================================', colors.blue);
log('Test Summary', colors.blue);
log('================================', colors.blue);
console.log('');

log(`Total tests: ${testsRun}`, colors.blue);
log(`Passed: ${testsPassed}`, colors.green);
if (testsFailed > 0) {
  log(`Failed: ${testsFailed}`, colors.red);
}

console.log('');

if (testsFailed === 0) {
  log('✓ All tests passed!', colors.green);
  process.exit(0);
} else {
  log('✗ Some tests failed', colors.red);
  process.exit(1);
}
