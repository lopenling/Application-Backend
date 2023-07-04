alter table "public"."team_member" drop constraint "team_member_team_id_fkey",
  add constraint "team_member_team_id_fkey"
  foreign key ("team_id")
  references "public"."team"
  ("id") on update restrict on delete restrict;
