function scripts::restart() {
  . "${SCRIPTS_DIR}/stop.sh"
  . "${SCRIPTS_DIR}/start.sh"
}

scripts::restart