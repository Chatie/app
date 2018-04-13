#!/usr/bin/env bash
set -e

npm version

npm run build:browser:prod

echo app.chatie.io | tee www/CNAME

cp -v resources/icon.png www/assets/imgs/logo.png

surge www/ app.chatie.io
