DROP FUNCTION public.fuzzy_search_words(search text);
CREATE OR REPLACE FUNCTION public.fuzzy_search_words(search text)
 RETURNS SETOF tibetan_words
 LANGUAGE sql
 STABLE
AS $function$
        SELECT id, word
        FROM public.tibetan_words
        WHERE search <% ( word ) OR word like CONCAT('%', SEARCH, '%')
        ORDER  BY Similarity(search , ( word )) DESC 
    $function$;
