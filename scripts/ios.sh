#!/usr/bin/env bash
set -e

ionic cordova build ios \
  --aot \
  --minifyjs \
  --minifycss \
  --optimizejs \
  --prod \
  --release
