## Installing Hasura with Docker
Follw [Quickstart With Docker](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple.html) to install Hasura Graphql Engine along with a Postgres database. Once installed, open hasura console and connect to the postgres database. For our current server we used this [docker-compose](https://github.com/hasura/graphql-engine/blob/stable/install-manifests/docker-compose/docker-compose.yaml) installation manifest.

## Apply migrations
Versioned migration files are stored [here](hasura-db-migrations/). Follow instructions [here](https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup.html#step-7-apply-the-migrations-and-metadata-on-another-instance-of-the-graphql-engine) to apply the migration to this new instance of Hasura. It will be helpful if you go once through the migration [doc](hasura-db-migrations/hasura-migrations.md) and the links mentioned there pointing to official Hasura documentations.

## Load dictionary data
Compressed SQL data is stored at `db-seed-data/db-data.sql.gz`. Follow the [doc](db-seed-data/db-seed-data.md) in `db-seed-data` folder to learn how to SQL data into the new Hasura instance.

