#!/usr/bin/env bash
set -e

VERSION=$(jq -r .version < package.json)

KEYSTORE='akamobi.keystore'
APK_RELEASE_UNSIGNED='platforms/android/build/outputs/apk/android-release-unsigned.apk'
APK_RELEASE_SIGNED="chatie-$VERSION.apk"

ionic build android --release

jarsigner -verbose \
  -sigalg SHA1withRSA \
  -digestalg SHA1 \
  -keystore "$KEYSTORE" \
  -storepass "$ANDROID_SDK_KEYSTORE_PASSWORD_CHATIE" \
  "$APK_RELEASE_UNSIGNED" \
  release

rm -f "$APK_RELEASE_SIGNED"

zipalign -v 4 \
  "$APK_RELEASE_UNSIGNED" \
  "$APK_RELEASE_SIGNED" \

