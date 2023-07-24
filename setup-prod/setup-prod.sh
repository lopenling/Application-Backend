#!/bin/bash

export HASURA_GRAPHQL_METADATA_DATABASE_URL=$HASURA_GRAPHQL_METADATA_DATABASE_URL 
export HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET
export HASURA_GRAPHQL_JWT_SECRET=$HASURA_GRAPHQL_JWT_SECRET
export HASURA_ENDPOINT=$HASURA_ENDPOINT

## Container Name as specified in docker-compose.yml
$DOCKER_CONTAINER_NAME="hasura/graphql-engine:v2.3.0"

## Start/Restart docker container
docker-compose rm -svf $DOCKER_CONTAINER_NAME;

docker-compose up -d $DOCKER_CONTAINER_NAME --force-recreate

## Wait for port 8080
sleep 10;

## Migrate remote server setup to local dev server.
cd ../hasura-db-migrations;
hasura metadata apply --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura migrate apply --all-databases --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura metadata reload --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET

