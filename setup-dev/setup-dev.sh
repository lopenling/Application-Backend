#!/bin/bash

source .env-dev

# install depdencies
pip install git+https://github.com/Lotus-King-Research/Padma-Dictionary-Lookup
pip install tqdm

# build the dictionary sql files
python3 ../dictionaries-etl/dictionaries_to_sql.py

## Container Name as specified in docker-compose.yml
$DOCKER_CONTAINER_NAME="hasura/graphql-engine:v2.3.0"

## Start/Restart docker container
docker-compose rm -svf $DOCKER_CONTAINER_NAME;

# Removes db volume
sudo docker volume rm -f padma-dictionary-service_db_data;

docker-compose up -d $DOCKER_CONTAINER_NAME --force-recreate

## Wait for port 8080
sleep 10;

## Migrate remote server setup to local dev server
cd ../hasura-db-migrations;
hasura metadata apply --endpoint $REMOTE_HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura migrate apply --all-databases --endpoint $REMOTE_HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura metadata reload --endpoint $REMOTE_HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
cd -;

CONTAINER_ID=$(docker ps | grep postgres:12 | grep setup-dev_postgres_1 | cut -d ' ' -f1)

docker exec -i $CONTAINER_ID psql -h localhost -U postgres -d postgres < words.sql;
docker exec -i $CONTAINER_ID psql -h localhost -U postgres -d postgres < descriptions.sql;

rm words.sql
rm descriptions.sql