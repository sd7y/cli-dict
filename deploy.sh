#!/usr/bin/env bash
PREVIOUS_DIR="$(pwd)"

WORKING_DIR="$(dirname $0)"
cd "${WORKING_DIR}"

COMMAND="$(basename $0)"

. "./bin/behind.sh" "$@"

cd "$PREVIOUS_DIR"