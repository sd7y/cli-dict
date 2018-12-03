#!/usr/bin/env bash

PREVIOUS_DIR="$(pwd)"

WORKING_DIR="$(dirname $0)"
cd "$WORKING_DIR"
node ./fy.js $@
cd "$PREVIOUS_DIR"