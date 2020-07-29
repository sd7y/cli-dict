
function upgrade::version_1_init_network() {
  log::info "============ Version 1 ==========="
  # create the docker network
  if docker network inspect "${DOCKER_NETWORK}" ; then
    log::info "Docker network ${DOCKER_NETWORK} is already created."
  else
    log::info "Creating docker network ${DOCKER_NETWORK}"
    docker network create "${DOCKER_NETWORK}"
    log::success "Create docker network successfully."
  fi
}

upgrade::version_1_init_network