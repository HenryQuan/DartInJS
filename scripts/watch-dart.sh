#!/bin/bash

# Watch script for Dart development
# Automatically recompiles when Dart files change

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Dart watch mode...${NC}"
echo -e "${YELLOW}Watching for changes in *.dart files${NC}"

# Initial build
./scripts/build-dart.sh

# Watch for changes using inotifywait if available
if command -v inotifywait &> /dev/null; then
    while inotifywait -e modify,create,delete *.dart 2>/dev/null; do
        echo -e "${YELLOW}Detected change, rebuilding...${NC}"
        ./scripts/build-dart.sh
    done
else
    echo -e "${YELLOW}inotifywait not available. Install inotify-tools for auto-rebuild.${NC}"
    echo "For now, run './scripts/build-dart.sh' manually after changes."
fi
