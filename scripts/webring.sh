#!/bin/sh

cd /usr/src/craftering

git pull https://codeberg.org/SystemCrafters/craftering/

mkdir -p /usr/app/static/json

cp /usr/src/craftering/websites.json /usr/app/static/json/
