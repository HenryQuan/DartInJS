#!/bin/bash

# Verification script to check the DartInJS setup
# Run this after installation to verify everything is working

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}DartInJS Setup Verification${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check Dart SDK
echo -e "${YELLOW}Checking Dart SDK...${NC}"
if command -v dart &> /dev/null; then
    DART_VERSION=$(dart --version 2>&1 | head -n 1)
    echo -e "${GREEN}✓${NC} Dart SDK found: $DART_VERSION"
else
    echo -e "${RED}✗${NC} Dart SDK not found"
    echo "  Please install Dart SDK from https://dart.dev/get-dart"
    exit 1
fi

# Check Node.js
echo -e "\n${YELLOW}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    echo "  Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo -e "\n${YELLOW}Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm found: v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check Dart dependencies
echo -e "\n${YELLOW}Checking Dart dependencies...${NC}"
if [ -f "pubspec.yaml" ]; then
    echo -e "${GREEN}✓${NC} pubspec.yaml found"
    if [ -d ".dart_tool" ]; then
        echo -e "${GREEN}✓${NC} Dependencies installed"
    else
        echo -e "${YELLOW}!${NC} Dependencies not installed. Run: dart pub get"
    fi
else
    echo -e "${RED}✗${NC} pubspec.yaml not found"
fi

# Check build scripts
echo -e "\n${YELLOW}Checking build scripts...${NC}"
if [ -f "scripts/build-dart.sh" ]; then
    echo -e "${GREEN}✓${NC} build-dart.sh found"
    if [ -x "scripts/build-dart.sh" ]; then
        echo -e "${GREEN}✓${NC} build-dart.sh is executable"
    else
        echo -e "${YELLOW}!${NC} build-dart.sh not executable. Run: chmod +x scripts/build-dart.sh"
    fi
else
    echo -e "${RED}✗${NC} build-dart.sh not found"
fi

if [ -f "scripts/watch-dart.sh" ]; then
    echo -e "${GREEN}✓${NC} watch-dart.sh found"
else
    echo -e "${RED}✗${NC} watch-dart.sh not found"
fi

# Check dist directory
echo -e "\n${YELLOW}Checking dist directory...${NC}"
if [ -d "dist" ]; then
    echo -e "${GREEN}✓${NC} dist directory exists"
    
    if [ -f "dist/interop.d.ts" ]; then
        echo -e "${GREEN}✓${NC} TypeScript definitions found"
    else
        echo -e "${YELLOW}!${NC} TypeScript definitions not found"
    fi
    
    if [ -f "dist/interop.js" ]; then
        echo -e "${GREEN}✓${NC} Production build found"
        SIZE=$(ls -lh dist/interop.js | awk '{print $5}')
        echo -e "  Size: $SIZE"
    else
        echo -e "${YELLOW}!${NC} Production build not found. Run: npm run build"
    fi
else
    echo -e "${YELLOW}!${NC} dist directory not found. Run: npm run build"
fi

# Check browser app
echo -e "\n${YELLOW}Checking browser app...${NC}"
if [ -d "dartonbrowser" ]; then
    echo -e "${GREEN}✓${NC} Browser app directory found"
    
    if [ -d "dartonbrowser/node_modules" ]; then
        echo -e "${GREEN}✓${NC} Browser app dependencies installed"
    else
        echo -e "${YELLOW}!${NC} Browser app dependencies not installed"
        echo "  Run: cd dartonbrowser && npm install"
    fi
    
    if [ -d "dartonbrowser/public/dart" ]; then
        echo -e "${GREEN}✓${NC} Dart compiled files copied to browser app"
    else
        echo -e "${YELLOW}!${NC} Dart files not copied to browser app yet"
    fi
else
    echo -e "${RED}✗${NC} Browser app directory not found"
fi

# Summary
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}Verification Summary${NC}"
echo -e "${BLUE}================================${NC}\n"

echo -e "Core requirements:"
echo -e "  • Dart SDK: ${GREEN}✓${NC}"
echo -e "  • Node.js:  ${GREEN}✓${NC}"
echo -e "  • npm:      ${GREEN}✓${NC}"

echo -e "\nNext steps:"
echo -e "  1. Run: ${YELLOW}dart pub get${NC} (if not done)"
echo -e "  2. Run: ${YELLOW}npm run build${NC} (to compile Dart to JS)"
echo -e "  3. Run: ${YELLOW}cd dartonbrowser && npm install${NC} (if not done)"
echo -e "  4. Run: ${YELLOW}npm run dev:browser${NC} (to start dev server)"

echo -e "\nFor more information, see ${GREEN}DOCUMENTATION.md${NC}\n"
