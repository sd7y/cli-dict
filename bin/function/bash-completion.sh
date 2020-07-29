
function bash_completion::update_bash_completion() {
  local completion_dir="/etc/bash_completion.d"
  if [[ -d "${completion_dir}" ]]; then
    sudo cp "./bash_completion.sh" "${completion_dir}/deploy_bash_completion.sh"
    log::warn "Command auto-completion is available when opening a new terminal. \
If you want to be available immediately, please execute ${COLOR_GREEN}source ./bash_completion.sh${COLOR_NONE} manually."
  else
    log::warn "Can not find ${completion_dir}, bash completion will not be supported."
  fi
}