
function scripts::start() {
  docker_compose::with_basic up -d
}

scripts::start