
function scripts::database::start() {
  docker_compose::with_basic up -d mongo
}

scripts::database::start