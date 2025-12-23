# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Remove existing git record to start fresh
if (Test-Path .git) {
    Remove-Item -Path .git -Recurse -Force
}

# Initialize a new git repository
git init
git checkout -b gh-pages

# Add all files
git add -A

# Commit
git commit -m 'deploy'

# Push to the gh-pages branch using HTTPS (uses your stored credentials)
git push -f https://github.com/Rayantion26/5Years.git gh-pages

cd ..
