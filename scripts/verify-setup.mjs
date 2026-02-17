#!/usr/bin/env node

/**
 * Cross-platform setup verification script
 * Checks environment and reports status
 */

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
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

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function commandExists(command) {
  try {
    const isWindows = process.platform === 'win32';
    const checkCommand = isWindows ? 'where' : 'which';
    execSync(`${checkCommand} ${command}`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function getVersion(command) {
  try {
    return execSync(`${command} --version`, { 
      encoding: 'utf-8', 
      stdio: 'pipe' 
    }).split('\n')[0];
  } catch {
    return 'unknown';
  }
}

function checkFile(filePath, description) {
  if (existsSync(filePath)) {
    const stats = statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    log(`  ✓ ${description}`, colors.green);
    if (stats.isFile() && sizeKB > 0) {
      console.log(`    Size: ${sizeKB}KB`);
    }
    return true;
  } else {
    log(`  ✗ ${description}`, colors.red);
    return false;
  }
}

console.log('');
log('================================', colors.blue);
log('DartInJS Setup Verification', colors.blue);
log('================================', colors.blue);
console.log('');

// Check Dart SDK
log('Checking Dart SDK...', colors.yellow);
if (commandExists('dart')) {
  const version = getVersion('dart');
  log(`  ✓ Dart SDK found: ${version}`, colors.green);
} else {
  log('  ✗ Dart SDK not found', colors.red);
  console.log('    Please install from https://dart.dev/get-dart');
}

// Check Node.js
console.log('');
log('Checking JavaScript Runtime...', colors.yellow);
if (commandExists('node')) {
  log(`  ✓ Node.js: ${getVersion('node')}`, colors.green);
}
if (commandExists('bun')) {
  log(`  ✓ Bun: ${getVersion('bun')}`, colors.green);
}
if (commandExists('deno')) {
  log(`  ✓ Deno: ${getVersion('deno')}`, colors.green);
}

// Check package managers
console.log('');
log('Checking Package Managers...', colors.yellow);
if (commandExists('npm')) {
  log(`  ✓ npm: ${getVersion('npm')}`, colors.green);
}
if (commandExists('yarn')) {
  log(`  ✓ yarn: ${getVersion('yarn')}`, colors.green);
}
if (commandExists('pnpm')) {
  log(`  ✓ pnpm: ${getVersion('pnpm')}`, colors.green);
}

// Check Dart dependencies
console.log('');
log('Checking Dart dependencies...', colors.yellow);
checkFile(join(rootDir, 'pubspec.yaml'), 'pubspec.yaml found');
if (checkFile(join(rootDir, '.dart_tool'), 'Dart dependencies installed')) {
  // Dependencies installed
} else {
  console.log('    Run: dart pub get');
}

// Check build scripts
console.log('');
log('Checking build scripts...', colors.yellow);
checkFile(join(rootDir, 'scripts', 'build-dart.mjs'), 'build-dart.mjs');
checkFile(join(rootDir, 'scripts', 'generate-types.mjs'), 'generate-types.mjs');
checkFile(join(rootDir, 'scripts', 'watch-dart.mjs'), 'watch-dart.mjs');

// Check dist directory
console.log('');
log('Checking build output...', colors.yellow);
if (checkFile(join(rootDir, 'dist'), 'dist directory exists')) {
  checkFile(join(rootDir, 'dist', 'interop.d.ts'), 'TypeScript definitions');
  checkFile(join(rootDir, 'dist', 'interop.js'), 'Production build');
  checkFile(join(rootDir, 'dist', 'interop.dev.js'), 'Development build');
} else {
  console.log('    Run: npm run build');
}

// Check browser app
console.log('');
log('Checking browser app...', colors.yellow);
if (checkFile(join(rootDir, 'dartonbrowser'), 'Browser app directory')) {
  if (checkFile(join(rootDir, 'dartonbrowser', 'node_modules'), 'Browser dependencies')) {
    // Dependencies installed
  } else {
    console.log('    Run: cd dartonbrowser && npm install');
  }
  checkFile(join(rootDir, 'dartonbrowser', 'public', 'dart'), 'Dart files in browser app');
}

// Summary
console.log('');
log('================================', colors.blue);
log('Verification Summary', colors.blue);
log('================================', colors.blue);
console.log('');

console.log('Next steps:');
console.log('  1. Run: dart pub get (if needed)');
console.log('  2. Run: npm run build (to compile Dart to JS)');
console.log('  3. Run: cd dartonbrowser && npm install (if needed)');
console.log('  4. Run: npm run dev:browser (to start dev server)');
console.log('');
