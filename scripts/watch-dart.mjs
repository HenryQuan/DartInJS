#!/usr/bin/env node

/**
 * Cross-platform watch script for Dart development
 * Automatically recompiles when Dart files change
 * Works on Windows, macOS, and Linux
 */

import { watch } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runBuild() {
  try {
    const runtime = process.env.npm_execpath?.includes('bun') ? 'bun' : 
                    process.env.npm_execpath?.includes('yarn') ? 'yarn' : 'npm';
    
    log('Detected change, rebuilding...', colors.yellow);
    execSync(`${runtime} run build:dart`, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    log('✓ Build completed', colors.green);
  } catch (error) {
    console.error('Build failed:', error.message);
  }
}

log('Starting Dart watch mode...', colors.green);
log('Watching for changes in *.dart files\n', colors.yellow);

// Initial build
runBuild();

// Watch all .dart files in the root directory
const dartFiles = ['interop.new.dart', 'interop.dart', 'quick.dart', 'httpin.dart'];

dartFiles.forEach(file => {
  const filePath = join(rootDir, file);
  try {
    watch(filePath, (eventType) => {
      if (eventType === 'change') {
        log(`\nFile changed: ${file}`, colors.yellow);
        runBuild();
      }
    });
    log(`Watching: ${file}`, colors.green);
  } catch (error) {
    // File might not exist, skip
  }
});

log('\nPress Ctrl+C to stop watching\n', colors.yellow);

// Keep the process running
process.stdin.resume();
