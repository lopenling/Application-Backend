alter table "data"."descriptions"
  add constraint "descriptions_language_fkey"
  foreign key ("language")
  references "data"."language"
  ("value") on update restrict on delete restrict;
