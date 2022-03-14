## Description
This describes how to use Hasura CLI tool to manage database and graphql metadata migrations. Migration setup and corresponding files in this folder refer to the current
installation of Hasura GraphQL engine on an AWS ec2 instance.

To learn about how to manage migration with Hasura CLI tool refer to [this documentation](https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup.html).

### Important things to remember
- Install [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli)  to work with the migration files stored in the current folder.
- Admin password required for accessing the database is intentionally not included in `config.yaml` for security purpose. Use an environment variable called `HASURA_GRAPHQL_ADMIN_SECRET` and set its value to admin password for hasura server.
- For making any database and graphql changes, one should always use `hasura console` from the current directory, so that changes will create/update the necessary migration and metadata (for graphql) files automatically. All new/updated migration files should be committed to git and pushed to origin.

### Steps for setting up local dev server.
- Copy `.env` to `.env.local` and define the environment variables for remote and local hasura server.
- Run `./dev-setup.sh` to set up a local hasura server and load the database tables.
