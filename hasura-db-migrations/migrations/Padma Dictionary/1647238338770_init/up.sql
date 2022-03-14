SET check_function_bodies = false;
CREATE TABLE public.descriptions (
    word_id integer NOT NULL,
    description text NOT NULL,
    source text NOT NULL
);
COMMENT ON TABLE public.descriptions IS 'Descriptions for source Tibetan words from specific dictionary sources';
CREATE TABLE public.tibetan_words (
    id integer NOT NULL,
    word text NOT NULL
);
COMMENT ON TABLE public.tibetan_words IS 'Source Tibetan Words';
CREATE SEQUENCE public.tibetan_words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.tibetan_words_id_seq OWNED BY public.tibetan_words.id;
ALTER TABLE ONLY public.tibetan_words ALTER COLUMN id SET DEFAULT nextval('public.tibetan_words_id_seq'::regclass);
ALTER TABLE ONLY public.tibetan_words
    ADD CONSTRAINT tibetan_words_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tibetan_words
    ADD CONSTRAINT tibetan_words_word_key UNIQUE (word);
CREATE UNIQUE INDEX descriptions_word_id_md5_source_idx ON public.descriptions USING btree (word_id, md5(description), source);
ALTER TABLE ONLY public.descriptions
    ADD CONSTRAINT descriptions_word_id_fkey FOREIGN KEY (word_id) REFERENCES public.tibetan_words(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
