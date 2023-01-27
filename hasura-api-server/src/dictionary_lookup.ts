import * as danfo from "danfojs-node";
import { DataFrame } from "danfojs-node/dist/danfojs-base";
import { dictionaryColFormat, dictionaryDataFormat, dictionaryContentFormat } from "./interface"


class DictionaryLookup {

    constructor(
        readonly selected_dictionary: dictionaryColFormat[],
    ) {}
    
    async loadDictionary():Promise<any> {
        try {
            const base_url = 'https://raw.githubusercontent.com/Lotus-King-Research/Padma-Dictionary-Data/main/data/'
            const options: object = {
                delimiter: '\t'
            }
            let dictionaries: dictionaryDataFormat = {};
            let df_to_json:object;
            let dfJson_value:dictionaryContentFormat[];

            for (let row of this.selected_dictionary) {
                // reading individual dictionary contents
                
                let df: DataFrame = await danfo.readCSV(`${base_url}${row['Name']}`, options)
                df_to_json = {...danfo.toJSON(df)}
                dfJson_value = Object.values(df_to_json)
                dictionaries[`${row.Title}`]= dfJson_value
                console.log(row['Title'], "downloaded")

            }
            return dictionaries;
        } catch (err) {
            console.log("error : ", err)
        }
        
    }

}

export default DictionaryLookup;