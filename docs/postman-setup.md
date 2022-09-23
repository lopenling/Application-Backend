* ## [postman team profile](https://www.postman.com/universal-water-877432)
* ## [postman team workspace](https://universal-water-877432.postman.co/workspace/Team-Workspace~9d59b87a-bee9-4a1e-8392-f2982f4175a6/overview)
## fundamental elements of Postman: [more details](https://learning.postman.com/docs/getting-started/navigating-postman/)

### `1 : COLLECTIONS` : ( Postman Collections are a group of saved requests ).
* [creating collection](https://learning.postman.com/docs/getting-started/creating-the-first-collection/)
*   **document our own custom GraphQL queries and keep it separate from the GraphQL API**
    * > we have already created collection called `padma custom api documentation` . under this collection we will create our own custom api.
    * > The graphQL api requests will be of two type `queries` and `mutations`, query apis will be resided inside `queries` folder and mutation APIs will be inside `mutations` folder. 
    * > To document each custom api , click particular graphQL api request in collection `padma custom api documentation` and click three dots from right side of request > click `view documentation` to view and update documentation.

### `2 : APIS` : 
* [creating APIs](https://learning.postman.com/docs/designing-and-developing-your-api/creating-an-api/)
* **generate the schema from graphQL and upload them on postman**
    * > We are using tool called `graphqurl` for exporting schema . You can run `"npm install -g graphqurl"` command to install `graphqurl`.
    * > Run this command to export `"gq http://localhost:8080/v1/graphql -H "X-Hasura-Admin-Secret: adminsecretkey" --introspect > mySchema.graphql"` 
    *what this command do* : this command export schema from hasura and save exported schema to file "mySchema.graphql"
    * > **To upload schema in postman** : Go to `team workspace` > click APIs tab from sidebar and click `create an api` , this opens modal where we mention api name, version and *most important*  select `schema type` as "GraphQL" and `schema format` as GraphQL SDL.
    * > After creating :  Under `padma APIs` > `varsion`, click `defination` tab . there you can paste the schema contents of `mySchema.graphql` file
