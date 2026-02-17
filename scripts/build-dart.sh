#!/bin/bash

# Build script for compiling Dart to JavaScript
# This script uses modern dart2js optimizations for production-ready output

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Dart to JavaScript...${NC}"

# Create dist directory for compiled output
mkdir -p dist

# Check if dart is available
if ! command -v dart &> /dev/null; then
    echo -e "${RED}Error: Dart SDK is not installed or not in PATH${NC}"
    echo "Please install Dart SDK from https://dart.dev/get-dart"
    exit 1
fi

echo -e "${YELLOW}Dart SDK version:${NC}"
dart --version

# Install/update dependencies
echo -e "${YELLOW}Installing Dart dependencies...${NC}"
dart pub get

# Compile interop.new.dart (modern js_interop)
echo -e "${YELLOW}Compiling interop.new.dart...${NC}"
dart compile js \
  --output=dist/interop.js \
  --minify \
  -O4 \
  interop.new.dart

# Generate source maps for debugging
echo -e "${YELLOW}Generating source maps...${NC}"
dart compile js \
  --output=dist/interop.dev.js \
  --enable-asserts \
  interop.new.dart

# Copy the compiled files to dartonbrowser public directory
if [ -d "dartonbrowser/public" ]; then
  echo -e "${YELLOW}Copying compiled JS to browser app...${NC}"
  mkdir -p dartonbrowser/public/dart
  cp dist/interop.js dartonbrowser/public/dart/
  cp dist/interop.dev.js dartonbrowser/public/dart/
fi

echo -e "${GREEN}Build completed successfully!${NC}"
echo -e "Output files:"
echo -e "  - ${GREEN}dist/interop.js${NC} (production build)"
echo -e "  - ${GREEN}dist/interop.dev.js${NC} (development build with source maps)"

# Display file sizes
echo -e "\n${YELLOW}File sizes:${NC}"
ls -lh dist/*.js | awk '{print "  " $9 ": " $5}'
