#!/bin/bash
#? File name: deploy.sh

# Build the client
echo "[INFO] Building the client..."
cd ./client/
npm run build

# Commit and push changes
cd ..
current_branch=$(git branch --show-current)

# Check if the current branch has an upstream branch
upstream_branch=$(git rev-parse --abbrev-ref --symbolic-full-name "${current_branch}@{upstream}" 2>/dev/null)

echo -e "\nEnter your commit message:"
read commit_message

if [ -z "$commit_message" ]; then  # Check if the variable is empty
  echo "Commit message cannot be empty. Exiting."
  exit 1  # Exit the script with a non-zero status
fi

git add .
git commit -m "$commit_message"

# Set branch if not already done so
if [ -z "$upstream_branch" ]; then
  echo "No upstream branch set for $current_branch. Setting it to origin/$current_branch"
  git push --set-upstream origin "$current_branch"
else
  git push
fi

echo -e "\n>>>>>>>>> Deployment complete! <<<<<<<<<\n"
