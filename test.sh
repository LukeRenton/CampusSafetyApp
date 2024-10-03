#!/bin/bash
# Build static js files
echo -e "\n[INFO] Building..."
cd ./client/
npm run build

# actually start the server (localhost:5000)
echo -e "\n[INFO] Running application..."
cd ..
npm start