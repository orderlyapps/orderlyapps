create type "public"."event_type" as enum ('CO', 'CA', 'RC', 'ME', 'OT');

create table "public"."congregations" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "state" text not null,
    "country" text not null,
    "phone" text,
    "email" text
);


alter table "public"."congregations" enable row level security;

create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "start_date" date not null,
    "end_date" date,
    "start_time" time without time zone,
    "end_time" time without time zone,
    "congregation_id" uuid not null
);


alter table "public"."events" enable row level security;

create table "public"."events_schedule" (
    "event_id" uuid not null,
    "week" date not null,
    "congregation_id" uuid not null
);


alter table "public"."events_schedule" enable row level security;

create table "public"."privileges" (
    "publisher_id" uuid not null,
    "congregation_id" uuid not null,
    "admin" boolean,
    "weekend_meeting_editor" boolean
);


alter table "public"."privileges" enable row level security;

create table "public"."publishers" (
    "id" uuid not null default gen_random_uuid(),
    "first_name" text not null,
    "last_name" text not null,
    "middle_name" text,
    "display_name" text,
    "outlines" text[],
    "congregation_id" uuid not null
);


alter table "public"."publishers" enable row level security;

create table "public"."schedule" (
    "week" date not null,
    "congregation_id" uuid not null
);


alter table "public"."schedule" enable row level security;

create table "public"."test" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "test" boolean,
    "publisher_id" uuid default gen_random_uuid()
);


create table "public"."weekend_meetings" (
    "week" date not null,
    "congregation_id" uuid not null,
    "speaker" uuid,
    "outline" text,
    "chairman" uuid,
    "reader" uuid
);


alter table "public"."weekend_meetings" enable row level security;

CREATE UNIQUE INDEX congregations_pkey ON public.congregations USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX events_schedule_pkey ON public.events_schedule USING btree (event_id, week, congregation_id);

CREATE UNIQUE INDEX privileges_pkey ON public.privileges USING btree (publisher_id, congregation_id);

CREATE UNIQUE INDEX publishers_pkey ON public.publishers USING btree (id);

CREATE UNIQUE INDEX schedule_pkey ON public.schedule USING btree (week, congregation_id);

CREATE UNIQUE INDEX test_pkey ON public.test USING btree (id);

CREATE UNIQUE INDEX weekend_meetings_pkey ON public.weekend_meetings USING btree (week, congregation_id);

alter table "public"."congregations" add constraint "congregations_pkey" PRIMARY KEY using index "congregations_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."events_schedule" add constraint "events_schedule_pkey" PRIMARY KEY using index "events_schedule_pkey";

alter table "public"."privileges" add constraint "privileges_pkey" PRIMARY KEY using index "privileges_pkey";

alter table "public"."publishers" add constraint "publishers_pkey" PRIMARY KEY using index "publishers_pkey";

alter table "public"."schedule" add constraint "schedule_pkey" PRIMARY KEY using index "schedule_pkey";

alter table "public"."test" add constraint "test_pkey" PRIMARY KEY using index "test_pkey";

alter table "public"."weekend_meetings" add constraint "weekend_meetings_pkey" PRIMARY KEY using index "weekend_meetings_pkey";

alter table "public"."events" add constraint "public_events_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "public_events_congregation_id_fkey";

alter table "public"."events_schedule" add constraint "public_events_schedule_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."events_schedule" validate constraint "public_events_schedule_event_id_fkey";

alter table "public"."events_schedule" add constraint "public_events_schedule_week_congregation_id_fkey" FOREIGN KEY (week, congregation_id) REFERENCES schedule(week, congregation_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."events_schedule" validate constraint "public_events_schedule_week_congregation_id_fkey";

alter table "public"."privileges" add constraint "public_privileges_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."privileges" validate constraint "public_privileges_congregation_id_fkey";

alter table "public"."privileges" add constraint "public_privileges_publisher_id_fkey" FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."privileges" validate constraint "public_privileges_publisher_id_fkey";

alter table "public"."publishers" add constraint "public_publishers_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."publishers" validate constraint "public_publishers_congregation_id_fkey";

alter table "public"."schedule" add constraint "public_schedule_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."schedule" validate constraint "public_schedule_congregation_id_fkey";

alter table "public"."weekend_meetings" add constraint "public_weekend_meetings_chairman_fkey" FOREIGN KEY (chairman) REFERENCES publishers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."weekend_meetings" validate constraint "public_weekend_meetings_chairman_fkey";

alter table "public"."weekend_meetings" add constraint "public_weekend_meetings_congregation_id_fkey" FOREIGN KEY (congregation_id) REFERENCES congregations(id) not valid;

alter table "public"."weekend_meetings" validate constraint "public_weekend_meetings_congregation_id_fkey";

alter table "public"."weekend_meetings" add constraint "public_weekend_meetings_reader_fkey" FOREIGN KEY (reader) REFERENCES publishers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."weekend_meetings" validate constraint "public_weekend_meetings_reader_fkey";

alter table "public"."weekend_meetings" add constraint "public_weekend_meetings_speaker_fkey" FOREIGN KEY (speaker) REFERENCES publishers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."weekend_meetings" validate constraint "public_weekend_meetings_speaker_fkey";

set check_function_bodies = off;

create or replace view "public"."authorised_users" as  SELECT p.id,
    p.first_name,
    p.last_name,
    p.middle_name,
    p.display_name,
    p.congregation_id
   FROM (publishers p
     JOIN auth.users u ON ((p.id = u.id)));


CREATE OR REPLACE FUNCTION public.claim_congregation(congregation_id uuid)
 RETURNS TABLE(id uuid, name text, state text, country text, phone text, email text, admins jsonb, weekend_meeting_editors jsonb)
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO privileges AS p (congregation_id, pub_id, admin)
    VALUES (claim_congregation.congregation_id, auth.uid(), false)
    ON CONFLICT ON CONSTRAINT privileges_pkey DO UPDATE SET admin = true;

  RETURN QUERY
    SELECT * FROM congregations_data;

END;$function$
;

CREATE OR REPLACE FUNCTION public.congregation_has_admin(id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.privileges
        WHERE congregation_id = id
        AND admin = true
    );
END;
$function$
;

create or replace view "public"."public_speakers" as  SELECT publishers.id,
    publishers.first_name,
    publishers.last_name,
    publishers.middle_name,
    publishers.display_name,
    publishers.outlines,
    publishers.congregation_id
   FROM publishers
  WHERE (cardinality(publishers.outlines) > 0);


CREATE OR REPLACE FUNCTION public.publisher_is_admin(publisher_id uuid, congregation_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.privileges
        WHERE privileges.publisher_id = publisher_id
        AND privileges.congregation_id = congregation_id
        AND admin = true
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.publisher_is_editor(publisher_id uuid, congregation_id uuid, table_name text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$DECLARE
    result BOOLEAN;
BEGIN
EXECUTE 
    'SELECT EXISTS (
        SELECT 1 FROM public.privileges
        WHERE privileges.publisher_id = ' 
            || quote_ident(publisher_id) || '
        AND privileges.congregation_id = ' 
            || quote_ident(congregation_id) || '
        AND ' || quote_ident(table_name) || ' = true
    )' 
    INTO result;
    RETURN result;
END;$function$
;

create or replace view "public"."weekend_meeting_editors" as  SELECT pr.publisher_id,
    pr.congregation_id,
    pu.first_name,
    pu.last_name,
    pu.middle_name,
    pu.display_name,
    pu.congregation_id AS home_congregation_id
   FROM (privileges pr
     JOIN authorised_users pu ON ((pu.id = pr.publisher_id)))
  WHERE (pr.weekend_meeting_editor = true);


CREATE OR REPLACE FUNCTION public.yield_congregation(congregation_id uuid)
 RETURNS TABLE(id uuid, name text, state text, country text, phone text, email text, admins jsonb, weekend_meeting_editors jsonb)
 LANGUAGE plpgsql
AS $function$BEGIN
  -- INSERT INTO privileges AS p (congregation_id, pub_id, admin)
  --   VALUES (claim_congregation.congregation_id, auth.uid(), false)
  --   ON CONFLICT ON CONSTRAINT privileges_pkey DO UPDATE SET admin = false;

    UPDATE privileges
      SET admin = false
      WHERE privileges.publisher_id = auth.uid() 
        AND privileges.congregation_id = yield_congregation.congregation_id;

  RETURN QUERY
    SELECT * FROM congregations_data;

END;$function$
;

create or replace view "public"."admins" as  SELECT pr.publisher_id,
    pr.congregation_id,
    pu.first_name,
    pu.last_name,
    pu.middle_name,
    pu.display_name,
    pu.congregation_id AS home_congregation_id
   FROM (privileges pr
     JOIN authorised_users pu ON ((pu.id = pr.publisher_id)))
  WHERE (pr.admin = true);


create or replace view "public"."congregations_data" as  SELECT congregations.id,
    congregations.name,
    congregations.state,
    congregations.country,
    congregations.phone,
    congregations.email,
        CASE
            WHEN (count(admins.*) > 0) THEN jsonb_agg(admins.*)
            ELSE NULL::jsonb
        END AS admins,
        CASE
            WHEN (count(weekend_meeting_editors.*) > 0) THEN jsonb_agg(weekend_meeting_editors.*)
            ELSE NULL::jsonb
        END AS weekend_meeting_editors
   FROM ((congregations
     LEFT JOIN admins ON ((congregations.id = admins.congregation_id)))
     LEFT JOIN weekend_meeting_editors ON ((congregations.id = weekend_meeting_editors.congregation_id)))
  GROUP BY congregations.id;


grant delete on table "public"."congregations" to "anon";

grant insert on table "public"."congregations" to "anon";

grant references on table "public"."congregations" to "anon";

grant select on table "public"."congregations" to "anon";

grant trigger on table "public"."congregations" to "anon";

grant truncate on table "public"."congregations" to "anon";

grant update on table "public"."congregations" to "anon";

grant delete on table "public"."congregations" to "authenticated";

grant insert on table "public"."congregations" to "authenticated";

grant references on table "public"."congregations" to "authenticated";

grant select on table "public"."congregations" to "authenticated";

grant trigger on table "public"."congregations" to "authenticated";

grant truncate on table "public"."congregations" to "authenticated";

grant update on table "public"."congregations" to "authenticated";

grant delete on table "public"."congregations" to "service_role";

grant insert on table "public"."congregations" to "service_role";

grant references on table "public"."congregations" to "service_role";

grant select on table "public"."congregations" to "service_role";

grant trigger on table "public"."congregations" to "service_role";

grant truncate on table "public"."congregations" to "service_role";

grant update on table "public"."congregations" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."events_schedule" to "anon";

grant insert on table "public"."events_schedule" to "anon";

grant references on table "public"."events_schedule" to "anon";

grant select on table "public"."events_schedule" to "anon";

grant trigger on table "public"."events_schedule" to "anon";

grant truncate on table "public"."events_schedule" to "anon";

grant update on table "public"."events_schedule" to "anon";

grant delete on table "public"."events_schedule" to "authenticated";

grant insert on table "public"."events_schedule" to "authenticated";

grant references on table "public"."events_schedule" to "authenticated";

grant select on table "public"."events_schedule" to "authenticated";

grant trigger on table "public"."events_schedule" to "authenticated";

grant truncate on table "public"."events_schedule" to "authenticated";

grant update on table "public"."events_schedule" to "authenticated";

grant delete on table "public"."events_schedule" to "service_role";

grant insert on table "public"."events_schedule" to "service_role";

grant references on table "public"."events_schedule" to "service_role";

grant select on table "public"."events_schedule" to "service_role";

grant trigger on table "public"."events_schedule" to "service_role";

grant truncate on table "public"."events_schedule" to "service_role";

grant update on table "public"."events_schedule" to "service_role";

grant delete on table "public"."privileges" to "anon";

grant insert on table "public"."privileges" to "anon";

grant references on table "public"."privileges" to "anon";

grant select on table "public"."privileges" to "anon";

grant trigger on table "public"."privileges" to "anon";

grant truncate on table "public"."privileges" to "anon";

grant update on table "public"."privileges" to "anon";

grant delete on table "public"."privileges" to "authenticated";

grant insert on table "public"."privileges" to "authenticated";

grant references on table "public"."privileges" to "authenticated";

grant select on table "public"."privileges" to "authenticated";

grant trigger on table "public"."privileges" to "authenticated";

grant truncate on table "public"."privileges" to "authenticated";

grant update on table "public"."privileges" to "authenticated";

grant delete on table "public"."privileges" to "service_role";

grant insert on table "public"."privileges" to "service_role";

grant references on table "public"."privileges" to "service_role";

grant select on table "public"."privileges" to "service_role";

grant trigger on table "public"."privileges" to "service_role";

grant truncate on table "public"."privileges" to "service_role";

grant update on table "public"."privileges" to "service_role";

grant delete on table "public"."publishers" to "anon";

grant insert on table "public"."publishers" to "anon";

grant references on table "public"."publishers" to "anon";

grant select on table "public"."publishers" to "anon";

grant trigger on table "public"."publishers" to "anon";

grant truncate on table "public"."publishers" to "anon";

grant update on table "public"."publishers" to "anon";

grant delete on table "public"."publishers" to "authenticated";

grant insert on table "public"."publishers" to "authenticated";

grant references on table "public"."publishers" to "authenticated";

grant select on table "public"."publishers" to "authenticated";

grant trigger on table "public"."publishers" to "authenticated";

grant truncate on table "public"."publishers" to "authenticated";

grant update on table "public"."publishers" to "authenticated";

grant delete on table "public"."publishers" to "service_role";

grant insert on table "public"."publishers" to "service_role";

grant references on table "public"."publishers" to "service_role";

grant select on table "public"."publishers" to "service_role";

grant trigger on table "public"."publishers" to "service_role";

grant truncate on table "public"."publishers" to "service_role";

grant update on table "public"."publishers" to "service_role";

grant delete on table "public"."schedule" to "anon";

grant insert on table "public"."schedule" to "anon";

grant references on table "public"."schedule" to "anon";

grant select on table "public"."schedule" to "anon";

grant trigger on table "public"."schedule" to "anon";

grant truncate on table "public"."schedule" to "anon";

grant update on table "public"."schedule" to "anon";

grant delete on table "public"."schedule" to "authenticated";

grant insert on table "public"."schedule" to "authenticated";

grant references on table "public"."schedule" to "authenticated";

grant select on table "public"."schedule" to "authenticated";

grant trigger on table "public"."schedule" to "authenticated";

grant truncate on table "public"."schedule" to "authenticated";

grant update on table "public"."schedule" to "authenticated";

grant delete on table "public"."schedule" to "service_role";

grant insert on table "public"."schedule" to "service_role";

grant references on table "public"."schedule" to "service_role";

grant select on table "public"."schedule" to "service_role";

grant trigger on table "public"."schedule" to "service_role";

grant truncate on table "public"."schedule" to "service_role";

grant update on table "public"."schedule" to "service_role";

grant delete on table "public"."test" to "anon";

grant insert on table "public"."test" to "anon";

grant references on table "public"."test" to "anon";

grant select on table "public"."test" to "anon";

grant trigger on table "public"."test" to "anon";

grant truncate on table "public"."test" to "anon";

grant update on table "public"."test" to "anon";

grant delete on table "public"."test" to "authenticated";

grant insert on table "public"."test" to "authenticated";

grant references on table "public"."test" to "authenticated";

grant select on table "public"."test" to "authenticated";

grant trigger on table "public"."test" to "authenticated";

grant truncate on table "public"."test" to "authenticated";

grant update on table "public"."test" to "authenticated";

grant delete on table "public"."test" to "service_role";

grant insert on table "public"."test" to "service_role";

grant references on table "public"."test" to "service_role";

grant select on table "public"."test" to "service_role";

grant trigger on table "public"."test" to "service_role";

grant truncate on table "public"."test" to "service_role";

grant update on table "public"."test" to "service_role";

grant delete on table "public"."weekend_meetings" to "anon";

grant insert on table "public"."weekend_meetings" to "anon";

grant references on table "public"."weekend_meetings" to "anon";

grant select on table "public"."weekend_meetings" to "anon";

grant trigger on table "public"."weekend_meetings" to "anon";

grant truncate on table "public"."weekend_meetings" to "anon";

grant update on table "public"."weekend_meetings" to "anon";

grant delete on table "public"."weekend_meetings" to "authenticated";

grant insert on table "public"."weekend_meetings" to "authenticated";

grant references on table "public"."weekend_meetings" to "authenticated";

grant select on table "public"."weekend_meetings" to "authenticated";

grant trigger on table "public"."weekend_meetings" to "authenticated";

grant truncate on table "public"."weekend_meetings" to "authenticated";

grant update on table "public"."weekend_meetings" to "authenticated";

grant delete on table "public"."weekend_meetings" to "service_role";

grant insert on table "public"."weekend_meetings" to "service_role";

grant references on table "public"."weekend_meetings" to "service_role";

grant select on table "public"."weekend_meetings" to "service_role";

grant trigger on table "public"."weekend_meetings" to "service_role";

grant truncate on table "public"."weekend_meetings" to "service_role";

grant update on table "public"."weekend_meetings" to "service_role";

create policy "Allow INSERT congregation if user is authenticated"
on "public"."congregations"
as permissive
for insert
to authenticated
with check (true);


create policy "Allow SELECT congregations for all users"
on "public"."congregations"
as permissive
for select
to public
using (true);


create policy "Allow UPDATE if user is admin or no admin exists"
on "public"."congregations"
as permissive
for update
to authenticated
using ((publisher_is_admin(auth.uid(), id) OR (NOT congregation_has_admin(id))));


create policy "Allow ALL for events if user is admin"
on "public"."events"
as permissive
for all
to authenticated
using (publisher_is_admin(auth.uid(), congregation_id));


create policy "Allow SELECT events access for all users"
on "public"."events"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users to events-schedule"
on "public"."events_schedule"
as permissive
for select
to public
using (true);


create policy "Allow ALL if user is admin"
on "public"."privileges"
as permissive
for all
to authenticated
using (publisher_is_admin(auth.uid(), congregation_id));


create policy "Allow INSERT if congregation has no admin"
on "public"."privileges"
as permissive
for insert
to authenticated
with check ((NOT congregation_has_admin(congregation_id)));


create policy "Allow SELECT for authenticated users"
on "public"."privileges"
as permissive
for select
to authenticated
using (true);


create policy "Allow ALL for admins on non authed publishers"
on "public"."publishers"
as permissive
for all
to authenticated
using ((publisher_is_admin(auth.uid(), congregation_id) AND (NOT (EXISTS ( SELECT 1
   FROM authorised_users
  WHERE (authorised_users.id = publishers.id))))));


create policy "Allow ALL for user's own row"
on "public"."publishers"
as permissive
for all
to authenticated
using ((auth.uid() = id));


create policy "Allow SELECT for all users to publishers"
on "public"."publishers"
as permissive
for select
to public
using (true);


create policy "Allow SELECT for all users to schedule"
on "public"."schedule"
as permissive
for select
to public
using (true);


create policy "Allow ALL for admins and editors"
on "public"."weekend_meetings"
as permissive
for all
to authenticated
using ((publisher_is_admin(auth.uid(), congregation_id) OR publisher_is_editor(auth.uid(), congregation_id, 'weekend_meetings'::text)));


create policy "Enable read access for all users to weekend_meetings"
on "public"."weekend_meetings"
as permissive
for select
to public
using (true);


