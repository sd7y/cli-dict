
function scripts::stop() {
  docker_compose::with_basic down
}

scripts::stop