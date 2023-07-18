#!/bin/bash

source .env-prod
## Container Name as specified in docker-compose.yml
$DOCKER_CONTAINER_NAME="hasura/graphql-engine:v2.3.0"

## Start/Restart docker container
docker-compose rm -svf $DOCKER_CONTAINER_NAME;

docker-compose up -d $DOCKER_CONTAINER_NAME --force-recreate

## Wait for port 8080
sleep 10;

## Migrate remote server setup to local dev server.
cd ../hasura-db-migrations;
hasura metadata apply --endpoint $DEV_HASURA_ENDPOINT --admin-secret $HASURA_REMOTE_SERVER_ADMIN_SECRET
hasura migrate apply --all-databases --endpoint $DEV_HASURA_ENDPOINT --admin-secret $HASURA_REMOTE_SERVER_ADMIN_SECRET
hasura metadata reload --endpoint $DEV_HASURA_ENDPOINT --admin-secret $HASURA_REMOTE_SERVER_ADMIN_SECRET
