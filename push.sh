sh ./build.sh
cat ./src/client/bundles/bundle.html > ./dist/frontend.html
cat ./src/server/bundle/bundle.js > ./dist/backend.js
echo "🔼  Uploading..."
clasp push -f
echo "🚀  Done! Deploy finalized at: $(date +"%T")"