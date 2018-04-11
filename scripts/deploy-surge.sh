#!/usr/bin/env bash
set -e

echo app.chatie.io | tee www/CNAME

cp -v resources/icon.png www/assets/imgs/logo.png

surge www/ chatie.surge.sh
