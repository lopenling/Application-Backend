SET check_function_bodies = false;
CREATE SCHEMA data;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE FUNCTION data.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE data.access_mode (
    "Value" text NOT NULL,
    "Comment" text NOT NULL
);
COMMENT ON TABLE data.access_mode IS 'Access mode enum for dictionaries';
CREATE TABLE data.descriptions (
    word_id integer NOT NULL,
    id integer NOT NULL,
    description text NOT NULL,
    dictionary_id uuid NOT NULL,
    last_updated_by uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE data.descriptions IS 'A particular meaning of a word';
CREATE SEQUENCE data.descriptions_description_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE data.descriptions_description_id_seq OWNED BY data.descriptions.id;
CREATE TABLE data.dictionary (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    organization_id uuid NOT NULL,
    access_mode text NOT NULL
);
COMMENT ON TABLE data.dictionary IS 'Dictionary Metadata';
CREATE TABLE data.thesaurus (
    source_word_id integer NOT NULL,
    relationship text NOT NULL,
    target_word_id integer NOT NULL,
    id integer NOT NULL
);
COMMENT ON TABLE data.thesaurus IS 'Related words in terms of synonyms, abbreviations etc.';
CREATE SEQUENCE data.thesaurus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE data.thesaurus_id_seq OWNED BY data.thesaurus.id;
CREATE TABLE data.word_assoication_type (
    value text NOT NULL,
    comment text NOT NULL
);
COMMENT ON TABLE data.word_assoication_type IS 'Enumeration of word to word link types';
CREATE TABLE data.words (
    word text NOT NULL,
    id integer NOT NULL
);
COMMENT ON TABLE data.words IS 'Entries in a dictionary such as Word, Phrase etc.';
CREATE SEQUENCE data.words_word_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE data.words_word_id_seq OWNED BY data.words.id;
CREATE TABLE public.dictionary_permission (
    id uuid NOT NULL,
    team_id uuid NOT NULL,
    dictionary_id uuid NOT NULL
);
COMMENT ON TABLE public.dictionary_permission IS 'Permissions for a team to use a dictionary.';
CREATE TABLE public.organization (
    name text NOT NULL,
    logo text NOT NULL,
    same_as_team boolean DEFAULT false NOT NULL,
    admin_id uuid NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
COMMENT ON TABLE public.organization IS 'Organization managing traslator teams and dictionaries';
CREATE TABLE public.organization_member (
    user_id uuid NOT NULL,
    organization_id uuid NOT NULL
);
COMMENT ON TABLE public.organization_member IS 'Association between user and organization';
CREATE TABLE public.team (
    name text NOT NULL,
    logo text NOT NULL,
    admin_id uuid NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL
);
COMMENT ON TABLE public.team IS 'Team of translators';
CREATE TABLE public.team_member (
    user_id uuid NOT NULL,
    team_id uuid NOT NULL
);
COMMENT ON TABLE public.team_member IS 'User-Team association';
CREATE TABLE public."user" (
    name text NOT NULL,
    auth_id text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email text NOT NULL
);
COMMENT ON TABLE public."user" IS 'Common user data for all roles';
ALTER TABLE ONLY data.descriptions ALTER COLUMN id SET DEFAULT nextval('data.descriptions_description_id_seq'::regclass);
ALTER TABLE ONLY data.thesaurus ALTER COLUMN id SET DEFAULT nextval('data.thesaurus_id_seq'::regclass);
ALTER TABLE ONLY data.words ALTER COLUMN id SET DEFAULT nextval('data.words_word_id_seq'::regclass);
ALTER TABLE ONLY data.access_mode
    ADD CONSTRAINT access_mode_pkey PRIMARY KEY ("Value");
ALTER TABLE ONLY data.descriptions
    ADD CONSTRAINT descriptions_description_word_id_dictionary_id_key UNIQUE (description, word_id, dictionary_id);
ALTER TABLE ONLY data.descriptions
    ADD CONSTRAINT descriptions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY data.dictionary
    ADD CONSTRAINT dictionary_name_key UNIQUE (name);
ALTER TABLE ONLY data.dictionary
    ADD CONSTRAINT dictionary_pkey PRIMARY KEY (id);
ALTER TABLE ONLY data.thesaurus
    ADD CONSTRAINT thesaurus_pkey PRIMARY KEY (id);
ALTER TABLE ONLY data.thesaurus
    ADD CONSTRAINT thesaurus_source_word_id_target_word_id_relationship_key UNIQUE (source_word_id, target_word_id, relationship);
ALTER TABLE ONLY data.word_assoication_type
    ADD CONSTRAINT word_assoication_type_pkey PRIMARY KEY (value);
ALTER TABLE ONLY data.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);
ALTER TABLE ONLY data.words
    ADD CONSTRAINT words_word_key UNIQUE (word);
ALTER TABLE ONLY public.dictionary_permission
    ADD CONSTRAINT dictionary_permissions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.dictionary_permission
    ADD CONSTRAINT dictionary_permissions_team_id_dictionary_id_key UNIQUE (team_id, dictionary_id);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_admin_id_key UNIQUE (admin_id);
ALTER TABLE ONLY public.organization_member
    ADD CONSTRAINT organization_member_pkey PRIMARY KEY (user_id, organization_id);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_name_key UNIQUE (name);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_pkey PRIMARY KEY (user_id, team_id);
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_name_key UNIQUE (name);
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_auth_id_key UNIQUE (auth_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
CREATE TRIGGER set_data_descriptions_updated_at BEFORE UPDATE ON data.descriptions FOR EACH ROW EXECUTE FUNCTION data.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_data_descriptions_updated_at ON data.descriptions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY data.descriptions
    ADD CONSTRAINT descriptions_dictionary_id_fkey FOREIGN KEY (dictionary_id) REFERENCES data.dictionary(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY data.descriptions
    ADD CONSTRAINT descriptions_last_updated_by_fkey FOREIGN KEY (last_updated_by) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY data.descriptions
    ADD CONSTRAINT descriptions_word_id_fkey FOREIGN KEY (word_id) REFERENCES data.words(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY data.dictionary
    ADD CONSTRAINT dictionary_access_mode_fkey FOREIGN KEY (access_mode) REFERENCES data.access_mode("Value") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY data.dictionary
    ADD CONSTRAINT dictionary_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY data.thesaurus
    ADD CONSTRAINT thesaurus_relationship_fkey FOREIGN KEY (relationship) REFERENCES data.word_assoication_type(value) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY data.thesaurus
    ADD CONSTRAINT thesaurus_source_word_id_fkey FOREIGN KEY (source_word_id) REFERENCES data.words(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY data.thesaurus
    ADD CONSTRAINT thesaurus_target_word_id_fkey FOREIGN KEY (target_word_id) REFERENCES data.words(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.dictionary_permission
    ADD CONSTRAINT dictionary_permission_dictionary_id_fkey FOREIGN KEY (dictionary_id) REFERENCES data.dictionary(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.dictionary_permission
    ADD CONSTRAINT dictionary_permissions_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_admin_fkey FOREIGN KEY (admin_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.organization_member
    ADD CONSTRAINT organization_member_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.organization_member
    ADD CONSTRAINT organization_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_admin_fkey FOREIGN KEY (admin_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
