#!/usr/bin/env bash
set -x
set -e

cd "$(dirname "$0")/.."

APP_NAME=$(node -e 'console.log(require("./package.json").name)')
VERSION=$(node -e 'console.log(require("./package.json").version)')

if [ ! -e teresa ]; then
    wget https://github.com/luizalabs/teresa/releases/download/$TERESA_VERSION/teresa-linux-amd64
    mv teresa-linux-amd64 teresa
    chmod +x teresa
fi

./teresa config set-cluster staging-gcp --server $TERESA_STAGING_ENDPOINT --tls --current

echo $TERESA_PASSWORD | ./teresa login --user $TERESA_USER

echo "===> Building app..."

npm install

npm run build

echo "===> Deploy..."

./teresa --cluster=staging-gcp deploy create . --app $APP_NAME --description "release-$VERSION-$CI_COMMIT_SHORT_SHA" --no-input