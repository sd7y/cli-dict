
function docker_compose::with_basic() {
  # The key of yaml can not use environment variable, so use the way of generating file.
  echo "version: '3'
networks:
  ${DOCKER_NETWORK}:
    external: true
" > .networks.yaml
  docker-compose -f ./bin/docker-compose.yaml -f .networks.yaml -p "$DOCKER_NETWORK" "$@"
  rm .networks.yaml
}