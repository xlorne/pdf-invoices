#!/bin/zsh

rm -rf ./server
mkdir -p ./server

cd ../web
pnpm i
pnpm build


