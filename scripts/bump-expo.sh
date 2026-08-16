#!/bin/bash

APP_JSON="frontend/app.json"
BUILD_JSON="frontend/android/app/build.gradle"

JSON_CONTENT=$(cat "$APP_JSON")

MODFIED_JSON=$(echo $JSON_CONTENT | jq --arg update $1 '.expo.version = $update' > $APP_JSON)

sed -i -E "s/(versionName \")([^\"]*)/\1$1/g" $BUILD_JSON

VERSION_CODE=$(( $(grep -E 'versionCode ([0-9]+)' $BUILD_JSON | grep -oE '[0-9]+') + 1))

echo $VERSION_CODE

sed -i -E "s/(versionCode )([0-9]+)/\1$VERSION_CODE/g" $BUILD_JSON

git add $APP_JSON
git add $BUILD_JSON

git commit -m 'Bump version.'

git tag "$1"

git push origin $1
