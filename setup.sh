#!/bin/bash
# Get all repo changes
echo -e "\n[INFO] Fetching all repo changes..."
git pull

# Install server depedencies
echo -e "\n[INFO] Installing app dependencies..."
npm install

# Install client dependencies
cd ./client/
echo -e "\n[INFO] Installing client dependencies..."
npm install --legacy-peer-deps

echo -e "\n>>>>>>>>> Project setup complete! <<<<<<<<<\n"