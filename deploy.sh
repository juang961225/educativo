#!/usr/bin/env sh
# abort on errors
set -e
# build static files
npm run generate
# navigate into the build output directory
cd .output/public
# create a fresh new git repo in the output directory
git init
git add -A
git commit -m 'deploy'
# Force push to the "publishing source" of your GitHub pages site
# in this case, the gh-pages branch
git push -f git@github.com:juang961225/educativo.git main:gh-pages
# Back to previous directory (the root of your repo)
cd ..