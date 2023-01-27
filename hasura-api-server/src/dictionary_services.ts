import * as danfo from "danfojs-node"
import { hasuraDataFormat, dictionaryColFormat } from "./interface"
import { DataFrame } from "danfojs-node/dist/danfojs-base";

import  DictionaryLookup  from "./dictionary_lookup"

class ReadDictionary {

    constructor(
        public dictionary: hasuraDataFormat
    ) {}
    
    async getDictionaryList():Promise<any> {

        try {

            let repo_path = 'https://raw.githubusercontent.com/Lotus-King-Research/';
            let file_path = 'Padma-Dictionary-Data/main/data/dictionaries.csv';
            let dictionary_data;
            let selected_dictionaries: unknown[] = [];
            let dictionary_column: string[] = ["Name", "Title", "Label"]

            let available_dictionaries = await danfo.readCSV(`${repo_path}${file_path}`);

            //quering dictionary from available dictionaries
            let queried_dictionary = available_dictionaries.query(available_dictionaries["Title"].eq(this.dictionary.name)).values[0];
            //selecting dictionary from available dictionaries
            selected_dictionaries.push(queried_dictionary);

            // check if input dictionary is available in available_dictionaries
            if(queried_dictionary !== undefined) {
                
                // convert to Dataframe
                const df:DataFrame = new danfo.DataFrame(selected_dictionaries, {columns: dictionary_column })
                const dfToJson:object = { ...danfo.toJSON(df)}
                const dfJsonValue: dictionaryColFormat[] = Object.values(dfToJson)

                //reading dictionaries from dictionaryLookup
                const dictionaryLookup = new DictionaryLookup(dfJsonValue)
                dictionary_data = await dictionaryLookup.loadDictionary()
            } 
            return dictionary_data;
            

        } catch (err) {
            console.log("(Error) : ", err);
        } 

    }
}


export default ReadDictionary;