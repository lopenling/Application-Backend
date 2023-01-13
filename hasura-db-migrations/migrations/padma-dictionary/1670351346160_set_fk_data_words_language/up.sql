alter table "data"."words"
  add constraint "words_language_fkey"
  foreign key ("language")
  references "data"."language"
  ("value") on update restrict on delete restrict;
