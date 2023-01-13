alter table "data"."dictionary"
  add constraint "dictionary_target_fkey"
  foreign key ("target")
  references "data"."language"
  ("value") on update restrict on delete restrict;
