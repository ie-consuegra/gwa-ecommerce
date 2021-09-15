printf "\n"
echo "*  Removing old bundle files..."
rm src/server/bundle/bundle.js
rm src/client/bundles/bundle.js
rm src/client/bundles/bundle.css
rm src/client/bundles/bundle.html
echo "✔️  Done"
printf "\n"
echo "*  Bundling backend JavaScript..."
ls -1 src/server/*.js | sort | while read fn ; do cat "$fn" >> src/server/bundle/bundle.js; done
echo "✔️  Done, file can be found as bundle.js in src/server/ directory"
printf "\n"
echo "*  Bundling frontend files..."
echo "*  JavaScript..."
ls -1 src/client/js/*.js | sort | while read fn ; do cat "$fn" >> src/client/bundles/bundle.js; done
echo "✔️  Done, file can be found as bundle.js in src/client/bundles"
echo "*  CSS..."
ls -1 src/client/css/*.css | sort | while read fn ; do cat "$fn" >> src/client/bundles/bundle.css; done
echo "✔️  Done, file can be found as bundle.js in src/client/bundles"
echo "*  Building frontend.html file..."
npx html-build -c html-build-config.js src/client/index.html src/client/bundles/bundle.html
echo "✔️  Done, file can be found as bundle.html in src/client/bundles"
printf "\n"
echo "👍  Ready to test or deploy"
printf "\n"
