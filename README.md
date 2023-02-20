<h1 align="center">
  <br>
  <a href="http://eka.to"><img src="https://raw.githubusercontent.com/Lotus-King-Research/Home/main/Assets/Images/Lotus-King-Research-Logo-Transparent.png" alt="Lotus King Research" width="200"></a>
  <br>
</h1>

<h3 align="center">Lotus King Research</h3>

<p align="center">
  
  <a href="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png">
    <img width=150px src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cc-by-nc-sa_icon.svg/1280px-Cc-by-nc-sa_icon.svg.png" alt="License">
  </a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#owner">Owner</a> •
  <a href="#integrations">Integrations</a> •
  <a href="#docs">Docs</a> •
  <a href="#hasura">Hasura Nodejs server </a>
</p>
<hr>

## Description

Repository for Padma's dictionary service with PSQL database and GRAPHQL API.

## Owner

- [@pdey](https://github.com/pdey)

## Integrations

- Downstream from [Padma-Dictionary-Data](https://github.com/Lotus-King-Research/Padma-Dictionary-Data)
- Upstream from [Padma-Backend](https://github.com/Lotus-King-Research/Padma-Backend)


## Docs

[Docs](https://github.com/Lotus-King-Research/Padma-Frontend/tree/master/docs)


<hr>

## Hasura-Nodejs server

__Note__ - the instructions below use yarn but work just as well with npm
### Project setup 
From __*hasura-api-server*__ folder : Do the following
```yarn install``` or ```npm install```
### Env Variables
```PORT=3000```
```WEBADMIN_GRAPHQL_ENDPOINT=```
```WEBADMIN_GRAPHQL_ADMIN_SECRET=```


### Hasura GraphQL APIs
GraphQL Queries and Mutations along with their Documentations:
- [Postman Collection:  Hasura GraphQL API](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/collection/23450657-a3c0bc96-95d9-4f08-84dc-da9d5b74c1b9?ctx=documentation)

  - [Dictionary-Service-API](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/folder/23450657-52e22cfd-068f-4818-8f79-2bb380202e95?ctx=documentation)
    - GraphQL [Queries](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/folder/23450657-ee1b9905-e287-4cc0-8cf4-e2e975ecd56a?ctx=documentation)
      - Queries [Documentation](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/documentation/23450657-a3c0bc96-95d9-4f08-84dc-da9d5b74c1b9?entity=folder-ee1b9905-e287-4cc0-8cf4-e2e975ecd56a)
    - GraphQL [Mutations](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/folder/23450657-f0c65587-ee95-4a66-96ff-2c315e23f517?ctx=documentation)
        - Mutations [Documentation](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/documentation/23450657-a3c0bc96-95d9-4f08-84dc-da9d5b74c1b9?entity=folder-f0c65587-ee95-4a66-96ff-2c315e23f517)