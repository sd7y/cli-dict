#!/bin/bash
cd "$(dirname $0)"
deno run --allow-net --allow-run --allow-read --allow-write src/http-server.ts $1