# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Initialize a new git repository
git init
git checkout -b gh-pages

# Add all files
git add -A

# Commit
git commit -m 'deploy'

# Push to the gh-pages branch of the confusing repository
# We need to know the remote URL. 
# Attempting to push to the origin of the parent folder
git push -f git@github.com:Rayantion26/5Years.git gh-pages

cd -
