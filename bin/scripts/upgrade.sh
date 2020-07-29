
function scripts::upgrade_version() {
  local current_version="$1"
  local target_version="$2"
  while [[ "${current_version}" -lt "${target_version}" ]]; do

    ((current_version=current_version+1))

    if [[ -f "./bin/upgrade/${current_version}/main.sh" ]]; then

      log::info "Begin upgrade the version to ${current_version}..."
      
      . "./bin/upgrade/${current_version}/main.sh"
      echo "${current_version}">./conf/version

      log::success "Upgrade the version to ${current_version} successfully."

    fi

  done
}

function scripts::upgrade() {
  local current_version="0"
  local latest_version="0"
  local temp_version
  local input

  if [[ -f "./conf/version" ]]; then
    current_version="$(cat ./conf/version)"
  fi

  # shellcheck disable=SC2045
  for upgrade_folder in $(ls -d -1 ./bin/upgrade/** 2> /dev/null); do
    local temp_version
    temp_version="$(basename "$upgrade_folder")"
    if [[ "${latest_version}" -lt "${temp_version}" ]]; then
      latest_version="${temp_version}"
    fi
  done

  if [[ "${current_version}" -lt "${latest_version}" ]]; then
    log::warn "The current version is ${current_version}, the latest version is ${latest_version}. 
Do you want to update the version? (y/n)"

    while :; do
      read -p ">" input
      if [[ "${input}" == "y" ]]; then
        scripts::upgrade_version "${current_version}" "${latest_version}"
        break
      elif [[ "${input}" == "n" ]]; then
        exit 1
      else
        echo "Please input the 'y' or 'n'"
      fi
    done
  # else
  #   log::info "The current version [${current_version}] is the latest."
  fi
}

scripts::upgrade
