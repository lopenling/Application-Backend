alter table "data"."dictionary"
  add constraint "dictionary_source_fkey"
  foreign key ("source")
  references "data"."language"
  ("value") on update restrict on delete restrict;
