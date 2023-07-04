# API Documentation Setup
We use [Postman API Platform](https://www.postman.com/) for defining and documenting API for Padma Dictionary Service.

## Documentation
Documentation is hosted on the followng Team workspace link:
https://universal-water-877432.postman.co/workspace/9d59b87a-bee9-4a1e-8392-f2982f4175a6/overview

## Setup
 * ### Import Hasura Schema into Postman API Collection
  - Export GraphQL schema from Hasura using `graphqurl` tool following these [instructions](https://hasura.io/docs/latest/guides/export-graphql-schema/#using-graphqurl).
  - Import graphql schema into postman following these [instructions](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/). This will generate documentation for Hasura GraphQL API within Postman workspace.
 
## Documenting Custom APIs.
Custom GraphQL queries and mutations will be derived from the auto-generated Hasura API according to the need of Padma Dictionary Service specifications. They will generated wihin a separate folder called `Custom API` within the API definition created at the previous step.

## Links to Collections and Custom API: TBD






