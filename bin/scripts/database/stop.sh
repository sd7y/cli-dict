function scripts::database::stop() {
  docker_compose::with_basic stop mongo
}

scripts::database::stop