#!/usr/bin/env bash
set -e

VERSION=$(jq -r .version < package.json)

KEYSTORE='akamobi.keystore'
[ -e "$KEYSTORE" ] || {
  >&2 echo "ERROR: Keystore $KEYSTORE not found."
  exit 1
}

APK_RELEASE_UNSIGNED='platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk'
APK_RELEASE_SIGNED="Chatie-$VERSION.apk"

# rm before re-build
rm -f "$APK_RELEASE_UNSIGNED"
ionic cordova build android --release

jarsigner -verbose \
  -sigalg SHA1withRSA \
  -digestalg SHA1 \
  -keystore "$KEYSTORE" \
  -storepass "$ANDROID_SDK_KEYSTORE_PASSWORD_CHATIE" \
  "$APK_RELEASE_UNSIGNED" \
  release

# rm before re-generate
rm -f "$APK_RELEASE_SIGNED"
/usr/lib/android-sdk/build-tools/*/zipalign -v 4 \
  "$APK_RELEASE_UNSIGNED" \
  "$APK_RELEASE_SIGNED" \
