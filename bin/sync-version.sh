#!/usr/bin/env bash
set -e

VERSION=$(jq -r .version < package.json)

MAJOR_MINOR=${VERSION%.*}
PATCH=${VERSION##*.}
PATCH_NEXT=$((PATCH+1))

VERSION_NEXT="$MAJOR_MINOR.$PATCH_NEXT"

#
# Sync the App version to package.json
#
sed -i.bak \
  '/"io.chatie.app" version="/s/version="[^"]*"/version="'"$VERSION_NEXT"'"/' \
  config.xml

rm -f config.xml.bak

MSG="bump(version): app v $VERSION -> $VERSION_NEXT by sync-version.sh"
echo
echo "$MSG"
echo

git add config.xml
git commit -m "$MSG"
