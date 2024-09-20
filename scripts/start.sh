#!/bin/bash

echo "Step 1: Generate JS files from tsx files through transpilation."
echo "Step 2: Copy the css file into the output folder as css is not copied during transpilation."
echo "Step 3: Start rollup build and bundle the JS files."
echo "Step 4: Delete typescript generated build folder and keep the rollup generated folder."

BUILD_DIR=./build
DIST_DIR=./dist
if [ -d "$BUILD_DIR" ]; then
  rm -r ./${BUILD_DIR}
  echo "Removed build folder"
fi
if [ -d "$DIST_DIR" ]; then
  rm -r ./${DIST_DIR}
  echo "Removed dist folder"
fi

echo "Generate JS files by transpiling tsx to js."
npm run tsc
echo "Typescript build complete."

echo "Copy the CSS file from component to build folder."

cp ./src/components/Autocomplete/Autocomplete.css ./build/components/Autocomplete/Autocomplete.css && echo "Copying CSS file completed."

echo "Start rollup build." && npm run build && echo "Rollup build complete."

rm -r ./${BUILD_DIR}

