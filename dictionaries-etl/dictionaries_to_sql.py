def dictionaries_to_sql(debug=False):

    '''Takes dictionaries from dictionary_lookup and converts them
    into SQL files.'''

    import dictionary_lookup
    import pandas as pd
    import tqdm

    # get the names of available dictionaries
    repo_path = 'https://raw.githubusercontent.com/Lotus-King-Research/'
    file_path = 'Padma-Dictionary-Data/main/data/dictionaries.csv'
    df = pd.read_csv(repo_path + file_path)
    dictionary_names = df['Label'].tolist()

    if debug:
        dictionaries = dictionary_lookup.DictionaryLookup(['verb_lexicon', 'lotus_king_trust'])
    else:
        # initialize dictionary lookup
        dictionaries = dictionary_lookup.DictionaryLookup(dictionary_names)

    # flatten into a dataframe
    df = pd.DataFrame()

    for source in dictionaries.dictionaries.keys():
        
        single_dictionary = dictionaries.dictionaries[source]
        single_dictionary['Source'] = source
        df = df.append(single_dictionary)
        
    df.reset_index(inplace=True)

    # create main table
    main_table = pd.DataFrame()
    main_table['key'] = df.Tibetan.unique().tolist()
    main_table = clean_up_word_ending(main_table, 'key')
    main_table['key'] = main_table['key'].drop_duplicates().dropna()

    # create description table
    description_table = df.drop('index', 1)
    description_table = clean_up_word_ending(description_table, 'Tibetan')

    # save main_table as sql
    f = open('words.sql', 'w')

    for key in main_table['key'].unique():
        try:
            f.write("insert into public.tibetan_words (word) values ('" + key + "');\n")
        except:
            print(key)

    f.close()

    # save description_table as sql
    f = open('descriptions.sql', 'w')

    for i in tqdm.tqdm(description_table.index):
        
        row = description_table.loc[i]

        base_query = "INSERT INTO descriptions (word_id, description, source) values ((select id from tibetan_words where word ="
        
        key = row['Tibetan']
        description = row['Description']
        description = description.replace("'", "''")
        source = row['Source']

        f.write("%s '%s'), '%s', '%s');\n" % (base_query, key, description, source))
                                            
    f.close()


def clean_up_word_ending(df, col):

    df[col] = df[col].str.replace('ཿ', '་')
    df[col] = df[col].str.replace('༔', '་')
    df[col] = df[col].str.replace('།', '་')
    df[col] = df[col].str.replace('༽', '་')
    df[col] += '་'
    df[col] = df[col].str.replace('་་', '་')
    df[col] = df[col].str.replace(' ', '')
    df[col] = df[col].str.replace('  ', '')
    df[col] = df[col].str.replace('  ', '')
    df[col] = df[col].str.replace('\t', '')
    df[col] = df[col].str.replace('\r\n', '')
    df[col] = df[col].str.replace('\n', '')
    df[col] = df[col].str.replace('་་', '་')
    
    return df

dictionaries_to_sql(True)
