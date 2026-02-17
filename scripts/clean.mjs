#!/usr/bin/env node

/**
 * Cross-platform clean script
 * Removes build artifacts
 */

import { rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

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

log('Cleaning build artifacts...', colors.yellow);

// Remove dist directory
const distDir = join(rootDir, 'dist');
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
  log('✓ Removed dist/', colors.green);
}

// Remove compiled JS files in root
const patterns = ['*.js', '*.js.deps', '*.js.map'];
let filesRemoved = 0;

patterns.forEach(pattern => {
  try {
    const files = globSync(pattern, { cwd: rootDir });
    files.forEach(file => {
      const filePath = join(rootDir, file);
      if (existsSync(filePath)) {
        rmSync(filePath, { force: true });
        filesRemoved++;
      }
    });
  } catch (error) {
    // Ignore glob errors
  }
});

if (filesRemoved > 0) {
  log(`✓ Removed ${filesRemoved} compiled files`, colors.green);
}

// Remove browser app compiled dart
const browserDartDir = join(rootDir, 'dartonbrowser', 'public', 'dart');
if (existsSync(browserDartDir)) {
  rmSync(browserDartDir, { recursive: true, force: true });
  log('✓ Removed dartonbrowser/public/dart/', colors.green);
}

log('\n✓ Clean completed!', colors.green);
