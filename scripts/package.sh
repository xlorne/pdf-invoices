#!/bin/zsh

rm -rf ./server
mkdir -p ./server

cd ../server
uv sync
uv run export-lib.py


cd ../web
pnpm i
pnpm build

cd ../

cp -r ./web/dist ./scripts/server/static/
cp -r ./server/*.py ./scripts/server/
cp -r ./server/*.txt ./scripts/

rm -rf ./server/requirements.txt

cd ./scripts/
docker build -t invoices-server-image:latest .