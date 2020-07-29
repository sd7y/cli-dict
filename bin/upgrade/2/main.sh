
function upgrade::version_2_init_mongo_user() {
  log::info "============ Version 2 ==========="
  log::info "Will init the Mongo"

  echo "MONGO_USER=arthas
MONGO_PASS=frostmourne
MONGO_ADMIN_USER=lichking
MONGO_ADMIN_PASS=frozenthrone" > ./conf/mongo/mongo-conf.env

  docker_compose::with_basic -f ./bin/upgrade/2/docker-compose.yaml up -d mongo

  docker_compose::with_basic exec mongo bash /tmp/init-mongo-user.sh

  docker_compose::with_basic stop mongo
}

upgrade::version_2_init_mongo_user