#!/usr/bin/env bash
set -e

figlet 'ionic package build ios'
buildId=$(ionic package build ios --release --profile prod | grep 'Build ID:' | awk '{print $3}') || buildId=-1

if [ "$buildId" == "-1" ]; then
  >&2 echo 'ERROR: ionic build failed'
fi

ttl=10
figlet "ionic package info $buildId"
status=$(ionic package info "$buildId" | grep status | awk '{print $3}')
while [ "$status" != "SUCCESS" -a "$ttl" -gt 0 ]; do
  sleep 10
  ((ttl--))
  figlet "ionic package info $buildId: status=$status, ttl=$ttl"
  status=$(ionic package info "$buildId" | grep status | awk '{print $3}')
done

figlet "ionic package download $buildId"
ionic package download "$buildId"

version=$(jq -r .version < package.json)
mv "Chatie-$buildId.ipa" "Chatie-$version.ipa"

