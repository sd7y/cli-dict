
docker_compose::with_basic stop nginx

docker_compose::with_basic up -d nginx

log::success "Reload success!"
