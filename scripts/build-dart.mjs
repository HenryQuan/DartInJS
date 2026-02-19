#!/usr/bin/env node

/**
 * Cross-platform build script for compiling Dart to JavaScript
 * Works on Windows, macOS, and Linux with Node.js, Yarn, or Bun
 */

import { execSync, spawn } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const dartDir = join(rootDir, 'dart');
const distDir = join(rootDir, 'dist');

// ANSI color codes for cross-platform colored output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logError(message) {
  log(`Error: ${message}`, colors.red);
}

function logSuccess(message) {
  log(message, colors.green);
}

function logInfo(message) {
  log(message, colors.yellow);
}

/**
 * Execute a command and return the result
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      cwd: options.cwd || rootDir,
      encoding: 'utf-8',
      stdio: 'pipe',
      ...options
    });
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
}

/**
 * Check if a command exists
 */
function commandExists(command) {
  try {
    const isWindows = process.platform === 'win32';
    const checkCommand = isWindows ? 'where' : 'which';
    exec(`${checkCommand} ${command}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get file size in human-readable format
 */
function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    const bytes = stats.size;
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  } catch {
    return 'N/A';
  }
}

/**
 * Main build function
 */
async function build() {
  logSuccess('Building Dart to JavaScript...\n');

  // Create dist directory
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Check if Dart is available
  if (!commandExists('dart')) {
    logError('Dart SDK is not installed or not in PATH');
    console.log('Please install Dart SDK from https://dart.dev/get-dart');
    process.exit(1);
  }

  // Show Dart version
  logInfo('Dart SDK version:');
  try {
    const dartVersion = exec('dart --version', { stdio: 'inherit' });
  } catch (error) {
    // dart --version outputs to stderr, so we ignore the error
  }

  // Install/update Dart dependencies
  logInfo('\nInstalling Dart dependencies...');
  exec('dart pub get', { cwd: dartDir, stdio: 'inherit' });

  // Generate TypeScript definitions
  logInfo('\nGenerating TypeScript definitions...');
  const runtime = commandExists('bun') ? 'bun' : commandExists('deno') ? 'deno' : 'node';
  try {
    exec(`${runtime} scripts/generate-types.mjs`, { stdio: 'inherit' });
  } catch (error) {
    logInfo('Warning: TypeScript generation failed, continuing with build...');
  }

  // Compile Dart to JavaScript (production)
  logInfo('\nCompiling dart/interop.dart (production)...');
  exec(`dart compile js --output=${join(distDir, 'interop.js')} --minify -O4 ${join(dartDir, 'interop.dart')}`, { 
    stdio: 'inherit' 
  });

  // Compile Dart to JavaScript (development with source maps)
  logInfo('\nGenerating source maps (development)...');
  exec(`dart compile js --output=${join(distDir, 'interop.dev.js')} --enable-asserts ${join(dartDir, 'interop.dart')}`, { 
    stdio: 'inherit' 
  });

  // Copy to browser app if directory exists
  const browserPublicDir = join(rootDir, 'dartonbrowser', 'public', 'dart');
  if (existsSync(join(rootDir, 'dartonbrowser', 'public'))) {
    logInfo('\nCopying compiled JS to browser app...');
    mkdirSync(browserPublicDir, { recursive: true });
    copyFileSync(
      join(distDir, 'interop.js'),
      join(browserPublicDir, 'interop.js')
    );
    copyFileSync(
      join(distDir, 'interop.dev.js'),
      join(browserPublicDir, 'interop.dev.js')
    );
  }

  // Success summary
  logSuccess('\n✓ Build completed successfully!\n');
  console.log('Output files:');
  console.log(`  - ${colors.green}dist/interop.js${colors.reset} (production build)`);
  console.log(`  - ${colors.green}dist/interop.dev.js${colors.reset} (development build)`);
  console.log(`  - ${colors.green}dist/interop.d.ts${colors.reset} (TypeScript definitions)`);

  // Display file sizes
  logInfo('\nFile sizes:');
  console.log(`  dist/interop.js: ${getFileSize(join(distDir, 'interop.js'))}`);
  console.log(`  dist/interop.dev.js: ${getFileSize(join(distDir, 'interop.dev.js'))}`);
}

// Run the build
build().catch(error => {
  logError(error.message);
  process.exit(1);
});
