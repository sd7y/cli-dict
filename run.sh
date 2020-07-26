#!/bin/bash
cd "$(dirname $0)"
deno run --allow-net --allow-run --allow-read --allow-write --allow-env src/main.ts $1