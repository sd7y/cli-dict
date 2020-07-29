
if [[ -f "${SCRIPTS_DIR}/$1/$2.sh" ]]; then
  . "${SCRIPTS_DIR}/$1/$2.sh" "$*"
else
  log::error "Unsupported argument ${COLOR_RED}$2${COLOR_NONE}."
  exit 1
fi
