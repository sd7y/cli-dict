
set -e

. ./bin/function/constants.sh
. ./bin/function/log.sh
. ./bin/function/docker-compose.sh

SCRIPTS_DIR="./bin/scripts"

. "${SCRIPTS_DIR}/upgrade.sh"

if [[ -f "${SCRIPTS_DIR}/$1.sh" ]]; then
  . "${SCRIPTS_DIR}/$1.sh" $*
  log::info "Command execution completed."
else
  log::error "Unsupported argument ${COLOR_RED}$1${COLOR_NONE}."
fi
