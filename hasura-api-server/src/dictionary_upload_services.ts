import { getDictionary, addDictionary, addWordDescriptions } from "./graphql_services";
import {  sessionVariableFormat, hasuraDataFormat, dictionaryContentFormat, wordDescriptionFormat  } from "./interface";
  
// checks if dictionary is already exist
  export async function dictionaryList(name: string, session: sessionVariableFormat) {
    const { data, error } = await getDictionary(name, session);
    //on success
    if(data) {
      // on dictionary available
      if(data.data.data_dictionary.length > 0) {
        return true;
      } else {
        return false;
      }
    } 
  }

  export async function createDictionary(dictionary_info:hasuraDataFormat, dictionary_data: dictionaryContentFormat[], session: sessionVariableFormat) {
    let dictionary_id:string | number = "";  
    //create dictionary 
      const { data, error } = await addDictionary(dictionary_info, session);
      dictionary_id = data.data.insert_data_dictionary.returning[0].id;
      
       //insert words and descriptions
      if(dictionary_id !== "") {

        dictionary_data.forEach( async(o:any) => {

          let words: wordDescriptionFormat = {
            word : o.Tibetan,
            word_language: dictionary_info.source,
            description: o.Description,
            dictionary_id: dictionary_id,
            last_updated_by: session['x-hasura-user-id'],
            des_language: dictionary_info.target
          };

          const { data, error } = await addWordDescriptions( words, session);
        });
      }
      console.log("Downloaded : " + dictionary_info.name)
      return dictionary_id;
  }