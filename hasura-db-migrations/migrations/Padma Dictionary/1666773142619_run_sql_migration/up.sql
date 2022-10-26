CREATE OR REPLACE FUNCTION public.full_search_words(search text)
 RETURNS SETOF tibetan_words
 LANGUAGE sql
 STABLE
AS $function$
        SELECT id, word
        FROM public.tibetan_words
        where to_tsvector(word) @@ to_tsquery(search)
    $function$;
