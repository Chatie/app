#!/usr/bin/env bash

VERSION=$(jq -r .version < package.json)

MAJOR_MINOR=${VERSION%.*}
PATCH=${VERSION##*.}
PATCH_NEXT=$(($PATCH+1))

VERSION_NEXT="$MAJOR_MINOR.$PATCH_NEXT"

echo "$VERSION -> $VERSION_NEXT"

#
# Sync the App version to package.json
#
sed -i \
  '/"io.chatie.app" version="/s/version="[^"]*"/version="'"$VERSION_NEXT"'"/' \
  config.xml
