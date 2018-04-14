#!/usr/bin/env bash
set -e

npm version

npm run build:browser:prod

echo app.chatie.io | tee www/CNAME

cp -v resources/icon.png www/assets/imgs/logo.png

#
# NOTICE: we keep the domain chatie.surge.sh just for the CNAME alias of app.chatie.io.
#   chatie.surge.sh is a totally different site from app.chatie.io,
#   which means we should keep those two sites on surge.sh.
#
surge www/ app.chatie.io
