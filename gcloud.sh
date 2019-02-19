#!/usr/bin/env bash
PREVIOUS_DIR="$(pwd)"

WORKING_DIR="$(dirname $0)"
cd "$WORKING_DIR"
export HTTP_PROXY=http://127.0.0.1:1081
node ./gcloud.js "$@"
cd "$PREVIOUS_DIR"