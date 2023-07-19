#!/bin/bash


## Container Name as specified in docker-compose.yml
$DOCKER_CONTAINER_NAME="hasura/graphql-engine:v2.3.0"


## Set the values for the environment variables
HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET
HASURA_GRAPHQL_JWT_SECRET=$HASURA_GRAPHQL_JWT_SECRET
HASURA_ENDPOINT=$HASURA_ENDPOINT
HASURA_GRAPHQL_METADATA_DATABASE_URL=$HASURA_GRAPHQL_METADATA_DATABASE_URL


## Export the variables to make them available to the Docker Compose command
export HASURA_GRAPHQL_JWT_SECRET
export HASURA_GRAPHQL_ADMIN_SECRET
export HASURA_ENDPOINT
export HASURA_GRAPHQL_METADATA_DATABASE_URL


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
