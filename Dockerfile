## this docker file is to setup and deploy hasura to "Render cloud server"

FROM hasura/graphql-engine:v2.0.2

CMD graphql-engine serve --jwt-secret $HASURA_GRAPHQL_JWT_SECRET --server-port $PORT