import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import ReadDictionary from "./dictionary_services";
import { 
  hasuraDataFormat, 
  dictionaryDataFormat, 
  sessionVariableFormat, 
  wordDescriptionFormat 
} from "./interface";

import { 
  addDictionary,
  addWordDescriptions
} from "./graphql_services";


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', async (req, res) => {
  res.send('Padma api server :-)');
});

app.post("/addDictionaryAPI", async (req, res) => {
    
  //input from hasura 
  const { dictionary } = req.body.input;
  const session: sessionVariableFormat  = req.body.session_variables;
  let hasura_input_data: hasuraDataFormat = dictionary;
  let dictionary_id:string | number = "";
  let last_updated_by = session['x-hasura-user-id'];

  try {

    const d = new ReadDictionary(hasura_input_data)
    let dictionary_data: dictionaryDataFormat = await d.getDictionaryList();

    if (dictionary_data !== undefined) {

      //create dictionary 
      const { data , error} = await addDictionary(hasura_input_data, session);
      dictionary_id = data.data.insert_data_dictionary.returning[0].id;

       //insert words and descriptions
      if(dictionary_id !== "") {
        dictionary_data[dictionary.name].forEach( async(o) => {

          let words: wordDescriptionFormat = {
            word : o.Tibetan,
            word_language: hasura_input_data.source,
            description: o.Description,
            dictionary_id: dictionary_id,
            last_updated_by: last_updated_by,
            des_language: hasura_input_data.target
          };

          const { data , error} = await addWordDescriptions( words, session);
        });
      }

      return res.json({
        dictionary_id
      })

    } else {
      return res.json({
        dictionary_id : ` Dictionary : "${hasura_input_data.name}" is not found`
      })
    }
    
  } catch (e: any) {
    return res.status(400).json({
      message: e.message
    })
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});