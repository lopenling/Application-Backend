<h1 align="center">
  <br>
  <a href="https://github.com/lopenling"><img src="https://raw.githubusercontent.com/lopenling/Home/main/assets/Lopenling-Logo-Icon.png" alt="Lopen Ling" width="100"></a>
  <br>
</h1>

<h3 align="center">Backend</h3>

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

### Docs

To use __hasura-api-server's__ graphQL APIs following steps are needed to be followed: 

1- __Authentication__ : 

2- __CRUD operations on Oganization__:
  - __Create Oganization__:
    - *Why do we need this api*: 
      - This api creates a new organization. The creating user must be a registered user. User who creates the Organization becomes the admin member of this organization.
      - EVENT TRIGGER: On successful creation of Organization, database will trigger an event that adds the same user as member of this Organization (ie: add user to organzation_memeber table).
    - Permission: every user can create organization
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-dd32092e-a23a-4052-aff7-022fe1a352e5)
    - Response format: 
      ```
      {
        "data": {
          "insert_organization_one": {
            "id": "9016e816-c77d-4978-b0ec-2cbb767c3dbc",
            "name": "demo_org2",
            "logo": "organization_logo_url/logo.png",
            "same_as_team": true
          }
        }
      }
      ```
  - __Update Oganization__:
    - Permission: Organization can be updated only by organization's admin.
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-a0e1492f-94ce-4e46-bc64-9de7fec70041)
    - Response format: 
      ```
      {
        "data": {
          "update_organization": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Delete Oganization__:
    - Permission: Organization can be deleted only by organization's admin.
    - __NOTE__: Hasura graphql won't allow deletion of organization if there exist `organization member`, `team` and `team member` of this `organizaion`. Therefore delete all organization member, team and team member of this organizaion before deleting organization.
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-c34267f3-7d87-4068-8a4b-95cdb3b5939e)
    - Response format: 
      ```
      {
        "data": {
          "delete_organization_by_pk": {
            "id": "072650f9-fc2e-413e-8306-a152c664fb68",
            "name": "demo_org2"
          }
        }
      }
      ```
  - __Read Organization__:
    - Permission: `organizaion admin`, `organization members`, `Team members` of an organization have access to read.
    - Request format for user organizaion: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-b8e16803-7222-4da9-bd12-a002014018f8)
    - Request format for querying organizaion by its ID: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-2c7ca0cf-560c-4bfe-8390-da64bf2b121e)
    - Response format(same for above both APIs): 
      ```
      {
        "data": {
          "organization": [
            {
              "id": "6bf9122d-2aca-4af0-abcf-626fb14d4dd9",
              "logo": "organization_logo_url/logo.png",
              "name": "demo_org1",
              "same_as_team": false,
              "organization_members": [
                {
                  "user": {
                    "id": "d731b76b-4c1e-464d-97ee-30a0923c4bf9",
                    "name": "demo_user",
                    "email": "demo@gmail.com"
                  }
                },
                {
                  "user": {
                    "id": "9f0054b3-f1bc-4e00-8ff2-c9152cd02533",
                    "name": "user1",
                    "email": "user1@gmail.com"
                  }
                },
                {
                  "user": {
                    "id": "99414279-82a3-4b28-b73f-b251173a07b4",
                    "name": "user2",
                    "email": "user2@gmail.com"
                  }
                }
              ],
              "teams": [
                {
                  "id": "0083b956-c81f-40bd-a8a5-d07d2ef8ec9d",
                  "name": "org1 team1",
                  "logo": "team1logo",
                  "admin_id": "9f0054b3-f1bc-4e00-8ff2-c9152cd02533",
                  "team_members": [
                    {
                      "user": {
                        "id": "9f0054b3-f1bc-4e00-8ff2-c9152cd02533",
                        "name": "user1",
                        "email": "user1@gmail.com"
                      }
                    },
                    {
                      "user": {
                        "id": "99414279-82a3-4b28-b73f-b251173a07b4",
                        "name": "user2",
                        "email": "user2@gmail.com"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
      ```
3- __CRUD operations on organization_member__:
  - __Create organization_member__:
    - Permission: `organzation admin`.
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-24cd591a-40f6-4e62-9a36-f95b5a3ad772)
    - Response format: 
      ```
      {
        "data": {
          "insert_organization_member": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Delete organzation_member__: 
    - Permission: `organzation admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-8b661acc-516a-4e01-a530-18dec602bcf3)
    - Response format: 
      ```
      {
        "data": {
          "delete_organization_member": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Read organization_member__: 
    - Permission: `organization admin` and `organization members`
    - Request format for user organization_member: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-d5fb0091-3498-419b-b145-f3d35fc247f9)
    - Request format for querying organization_member by using organizaion ID: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-aabcf0b4-cf27-4a70-81e6-945a24792015)
    - Response format(same for above both APIs): 
      ```
      {
        "data": {
          "organization_member": [
            {
              "organization_id": "015dd64d-8df5-42f3-aac3-7e5b4ab288fc",
              "user": {
                "id": "0b1f9b01-92e6-445f-8561-80442f8642e1",
                "name": "user6",
                "email": "user6@gmail.com"
              }
            },
            {
              "organization_id": "015dd64d-8df5-42f3-aac3-7e5b4ab288fc",
              "user": {
                "id": "dbedb338-df43-4988-ae32-ee561c763ff4",
                "name": "user5",
                "email": "user5@gmail.com"
              }
            }
          ]
        }
      }
      ```
4- __CRUD operations on Team__: 
  - __Create Team__: 
    - Permission: `organization admin`
    - > Organization admin creates a team and assign a team_admin
    - >__Event trigger__: On successful creation of team , database trigger an event to add the same team admin to team_member table.


    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-a2ba8379-7740-4b9f-a173-f228c2b3fb60)
    - Response format: 
      ```
      {
        "data": {
          "insert_team_one": {
            "name": "team1 org2",
            "logo": "url of logo",
            "organization_id": "015dd64d-8df5-42f3-aac3-7e5b4ab288fc"
          }
        }
      }
      ```
  - __Update Team__: 
    - Permission: `organization admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-41e2ce47-2fe2-4a0d-aef5-f44a4b9dbc55)
    - Response format: 
      ```
      {
        "data": {
          "update_team": {
            "affected_rows": 1
          }
        }
      }
      ``` 
  - __Read Team__:
    - Permission: `organization admin` and `team members`,
    - Request format for user team: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-293e8672-02ad-4f57-9c22-2f2dbca1f9ce)
    - Request format for querying team by its ID: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-715cc588-61f7-4014-9d26-16f0a5c1d4c7)
    - Response format(same for both APIs): 
      ```
      {
        "data": {
          "team": [
            {
              "id": "0083b956-c81f-40bd-a8a5-d07d2ef8ec9d",
              "logo": "team1logo",
              "name": "org1 team1",
              "organization_id": "6bf9122d-2aca-4af0-abcf-626fb14d4dd9",
              "admin": {
                "id": "9f0054b3-f1bc-4e00-8ff2-c9152cd02533",
                "name": "user1",
                "email": "user1@gmail.com"
              },
              "dictionary_permission": [
                {
                  "dictionary_id": "5d60655d-fefb-4f84-b6ec-d3b84800b61f",
                  "team_id": "0083b956-c81f-40bd-a8a5-d07d2ef8ec9d"
                }
              ],
              "team_members": [
                {
                  "user": {
                    "id": "9f0054b3-f1bc-4e00-8ff2-c9152cd02533",
                    "name": "user1",
                    "email": "user1@gmail.com"
                  }
                },
                {
                  "user": {
                    "id": "99414279-82a3-4b28-b73f-b251173a07b4",
                    "name": "user2",
                    "email": "user2@gmail.com"
                  }
                }
              ]
            }
          ]
        }
      }
      ```
5- __CRUD operations on team_member__:
  - __Create team_members__:
    - Permission: `team admin` and `organization admin`.
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-24c7416a-9fab-47fc-b433-0f91b71373bb)
    - Response format:
      ```
      {
        "data": {
          "insert_team_member": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Delete team member__:
    - Permission: `team admin` and `organization admin`.
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-ac2d6057-7dac-43c4-853b-8f8fd042d1c4)
    - Response format: 
      ```
      {
        "data": {
          "delete_team_member_by_pk": {
            "team_id": "ec040aea-a70a-40bf-9ec5-5c226dd13f48",
            "user_id": "0b1f9b01-92e6-445f-8561-80442f8642e1"
          }
        }
      }
      ```
  - __Read team members__:
    - Permission: `organization admin` and `team members`
    - Request format for user's team: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-1fa5e66a-c572-4998-8375-293ca79b7afd)
    - Request format for querying team member by its ID: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-e41ade84-fd91-4f22-af70-46e38a1b7d75)
    - Response format :
      ```
      {
        "data": {
          "team_member": [
            {
              "team_id": "ec040aea-a70a-40bf-9ec5-5c226dd13f48",
              "user": {
                "id": "dbedb338-df43-4988-ae32-ee561c763ff4",
                "name": "user5",
                "email": "user5@gmail.com"
              }
            }
          ]
        }
      }
      ```
6- __CRUD operations on Dictionary__:
  - __Create Dictionary__:
    - Permission: `organization admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-4fe9a4d5-736f-45ba-974d-70cc035a50d3)
    - Response format: 
      ```
      {
        "data": {
          "insert_data_dictionary_one": {
            "id": "829c8351-a8f5-432b-abd6-4fdb30f80a36",
            "name": "test",
            "target": "Tibetan",
            "source": "Tibetan",
            "access_mode": "Custom"
          }
        }
      }
      ```
  - __Create Dictionary with Hasura Action via API__:
    - Why do we need this api: 
      - This api runs Backend Nodejs server, which helps us to read dictionary csv from API and add dictionary content to hasura using graphQL APIs.
    - Permission: `organization admin`
    - Endpoint: __POST__ /addDictionaryAPI
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Padma-Dictionary-Service%253A-Team-~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-5d9f44fe-82df-4263-8b23-c6af4621b860)
    - Response format:
      ```
      {
        "data": {
          "addDictionaryAPI": {
            "result": {
              "dictionary_id": "2681ec56-c3fc-42d7-99aa-bd859929a9d9"
            }
          }
        }
      }
      ```
    - Errors: 
      - This api return error when dictinary is already exist
      - Return error when input dictinary not found
      - Return error when Nodejs server not able to read CSV
    - *Know more about Hasura Action*: [click](https://hasura.io/docs/latest/actions/index/)

  - __Create Dictionary with Hasura Action using via file upload__:
    - Why do we need this api: 
      - This api runs Backend Nodejs server, which helps us to read dictionary file of format CSV from Frontend and add dictionary content to hasura using graphQL APIs.
    - Permission: `organization admin`
    - Endpoint: __POST__ /addDictionaryFile
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/documentation/23450657-a3c0bc96-95d9-4f08-84dc-da9d5b74c1b9?entity=request-3d3eb1ac-d08e-4565-b726-7250a59df9e5)
    - Response format: Same as above api.
    - Errors: Same as above api.

  - __Update Dictionary__:
    - Permission: `organization admin` and `team admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-1b77d39d-6828-494f-95db-17f7c2f399d4)
    - Response format: 
      ```
      {
        "data": {
          "update_data_dictionary_by_pk": {
            "id": "829c8351-a8f5-432b-abd6-4fdb30f80a36",
            "name": " new name",
            "organization_id": "015dd64d-8df5-42f3-aac3-7e5b4ab288fc"
          }
        }
      }
      ```
  - __Read Dictionary__: 
    - Permission: `organization admin` and `team members of a team which has the access permission to dictinary`
    - Request format for user's Dictionary: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-ce252368-bfe9-41e8-b1ba-e588d3ab5dd7)
    - Request format for querying Dictionary by ID: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-00777764-2fad-4909-bd6c-16e318b3dc15)
    - Response format: 
      ```
      {
        "data": {
          "data_dictionary": [
            {
              "id": "5d60655d-fefb-4f84-b6ec-d3b84800b61f",
              "name": "Sera",
              "access_mode": "Custom",
              "target": "Tibetan",
              "source": "Tibetan",
              "organization_id": "6bf9122d-2aca-4af0-abcf-626fb14d4dd9",
              "dictionary_permissions": [
                {
                  "id": "86b35911-2efc-4af1-b4d6-b14a0d9cdd37",
                  "team_id": "0083b956-c81f-40bd-a8a5-d07d2ef8ec9d"
                }
              ]
            }
          ]
        }
      }
      ```
7- __CRUD operations on dictionary_permission__: 
  - __Create dictionary_permission__: 
    - *This api is for giving access permission of a Dictionary to a team*
    - Permission: `organization admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-d1e9a39b-1591-4d64-bbeb-1d0b94696548)
    - Response format: 
      ```
      {
        "data": {
          "insert_dictionary_permission_one": {
            "team_id": "ec040aea-a70a-40bf-9ec5-5c226dd13f48",
            "dictionary_id": "829c8351-a8f5-432b-abd6-4fdb30f80a36"
          }
        }
      }
      ```
  - __Update dictionary_permission__:
    - Permission: `organization admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-1e7b515e-5890-4c56-aba9-1e96eac9f8d0)
    - Response format: 
      ```
      {
        "data": {
          "update_dictionary_permission_by_pk": {
            "team_id": "ec040aea-a70a-40bf-9ec5-5c226dd13f48",
            "dictionary_id": "829c8351-a8f5-432b-abd6-4fdb30f80a36"
          }
        }
      }
      ```
  - __Delete dictionary_permission__:
    - Permission: `organizatin admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-24bbae50-4be1-4f30-bab1-5da6b9742506)
    - Response format: 
      ```
      {
        "data": {
          "delete_dictionary_permission_by_pk": {
            "team_id": "ec040aea-a70a-40bf-9ec5-5c226dd13f48",
            "dictionary_id": "829c8351-a8f5-432b-abd6-4fdb30f80a36"
          }
        }
      }
      ```
8- __CRUD operations on words__:
  - __Create words__:
    - *This api adds word and its description*
    - Permission: `organization admin` and `members of a team which has access permission to a Dictionary`
    - Request format : [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-1db0719c-88b2-4449-a44e-64592bd79713)
    - Response format: 
      ```
      {
        "data": {
          "insert_data_words": {
            "affected_rows": 4
          }
        }
      }
      ```
  - __Update words by its ID__:
    - Permission: `organization admin` and `members of a team which has access permission to a Dictionary`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-68db6aa6-cdb0-4d27-9797-76746e0cdc49)
    - Response format: 
      ```
      {
        "data": {
          "update_data_words_by_pk": {
            "word": "ཀ་བ"
          }
        }
      }
      ```
  - __Delete words by its ID__:
    - Permission: `organization admin` and `team admin`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-bd9c0878-0735-4b06-bfa8-8cdda2a02e72)
    - Response format: 
      ```
      {
        "data": {
          "delete_data_words_by_pk": {
            "word": "ཀ་བ"
          }
        }
      }
      ```
  - __Partial search of a word__:
    - Permission: `Any user can search`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-3e42664c-6c37-4d0c-919b-c7a4d2ede594)
    - Response format: 
      ```
      {
        "data": {
          "data_words": [
            {
              "id": 180445,
              "word": "བྱས་པ་",
              "descriptions": [
                {
                  "description": "སྐྱེས་པ་ ",
                  "language": "Tibetan"
                }
              ]
            },
            {
              "id": 180076,
              "word": "སྒྲ་བྱས་པར་འཇལ་བའི་བྱས་པའི་རྟགས་ཀྱིས་སྒྲ་མི་རྟག་པར་སྒྲུབ་པའི་རྟག་འཛིན་སེམས་",
              "descriptions": [
                {
                  "description": "རང་ཉིད་སྒྲ་བྱས་པ་ལ་མི་སླུ་བ་ཡང་ཡིན།རང་གི་རྒྱུ་རྐྱེན་བྱས་པ་ལ་བརྟེན་ནས་བྱུང་བའི་བྱས་པའི་རྟགས་ཀྱིས་སྒྲ་མི་རྟགཔར་རྟོགས་པའི་རྗེས་དཔག་གི་རྒྱུ་ཡང་ཡིན་པའི་གཞི་མཐུན་པར་གྱུར་པའི་བྱས་པའི་རྟགས་ཀྱིས་སྒྲ་མི་རྟག་པར་སྒྲུབ་པའི་ཕྱི་རྒོལ་ཡང་དག་གི་རྒྱུད་ཀྱི་རིག་པ་ ",
                  "language": "Tibetan"
                }
              ]
            },
            {
              "id": 180115,
              "word": "མ་བྱས་པ་",
              "descriptions": [
                {
                  "description": "མ་སྐྱེས་པ་ ",
                  "language": "Tibetan"
                }
              ]
            }
          ]
        }
      }
      ```
  - __Exact Search a word__:
    - Permission: `Any user can search`
    - Request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-90cb36f1-ed11-4327-8160-ba7fa851120d)
    - Response format: 
      ```
      {
        "data": {
          "data_words": [
            {
              "id": 180445,
              "word": "བྱས་པ་",
              "descriptions": [
                {
                  "description": "སྐྱེས་པ་ ",
                  "language": "Tibetan"
                }
              ]
            }
          ]
        }
      }
      ```
9 - __CRUD operations on Description__:
  - __Update Description by word's ID__
    - Permission: `organization admin` and `members of a team which has access permission to dictionary`
    - request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-6f9c0600-f22a-41fa-9468-565df92cd122)
    - Response format: 
      ```
      {
        "data": {
          "update_data_descriptions": {
            "affected_rows": 1
          }
        }
      }
      ```
10 - __CRUD operations on Thesaurus__:
  - __Create Thesaurus__
    - Permission: `organization admin` and `members of a team which has access permission to dictionary`
    - request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-dbd78751-f19b-44f1-8e2d-54fee08ba2d9)
    - Response format: 
      ```
      {
        "data": {
          "insert_data_thesaurus": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Update Thesaurus by source's ID__
    - Permission: `organization admin` and `members of a team which has access permission to dictionary`
    - request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-d20c6bdf-6055-4593-9075-7247b08dc64c)
    - Response format: 
      ```
      {
        "data": {
          "update_data_thesaurus": {
            "affected_rows": 1
          }
        }
      }
      ```
  - __Delete Thesaurus by its ID__
    - Permission: `organization admin` and `admin of a team which has access permission to dictionary`
    - request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-6d0f3069-404e-430c-8628-e1837a25de5f)
    - Response format: 
      ```
      {
        "data": {
          "delete_data_thesaurus_by_pk": {
            "id": 30,
            "source_word_id": 179892
          }
        }
      }
      ```
  - __Delete Thesaurus by source_word ID__
    - Permission: `organization admin` and `admin of a team which has access permission to dictionary`
    - request format: [click](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/api/bd60a954-a8bb-443e-958e-01b5117842e1/request/23450657-de596e4b-ae62-4b31-87e8-ac50a98edbd2)
    - Response format: 
      ```
      {
        "data": {
          "delete_data_thesaurus": {
            "affected_rows": 1
          }
        }
      }
      ```



