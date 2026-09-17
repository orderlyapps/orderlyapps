-- regular_pioneer records month-granular periods during which a publisher
-- served as a regular pioneer. end_month IS NULL means still serving.
-- Only the current month or earlier may be recorded, so publisher.type
-- (kept in sync by trigger) is always correct at write time.

CREATE TABLE IF NOT EXISTS "public"."regular_pioneer" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "publisher_id" "uuid" NOT NULL,
    "congregation_id" "uuid" NOT NULL,
    "start_month" "date" NOT NULL,
    "end_month" "date",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."regular_pioneer" OWNER TO "postgres";

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "public"."publisher"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_congregation_id_fkey" FOREIGN KEY ("congregation_id") REFERENCES "public"."congregation"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_start_first_of_month" CHECK (("start_month" = ("date_trunc"('month'::"text", ("start_month")::timestamp without time zone))::"date"));

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_end_first_of_month" CHECK ((("end_month" IS NULL) OR ("end_month" = ("date_trunc"('month'::"text", ("end_month")::timestamp without time zone))::"date")));

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_end_on_or_after_start" CHECK ((("end_month" IS NULL) OR ("end_month" >= "start_month")));

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_no_future_start" CHECK (("start_month" <= ("date_trunc"('month'::"text", "now"()))::"date"));

ALTER TABLE ONLY "public"."regular_pioneer"
    ADD CONSTRAINT "regular_pioneer_no_future_end" CHECK ((("end_month" IS NULL) OR ("end_month" <= ("date_trunc"('month'::"text", "now"()))::"date")));

CREATE INDEX "regular_pioneer_publisher_id_idx" ON "public"."regular_pioneer" USING "btree" ("publisher_id");

CREATE INDEX "regular_pioneer_congregation_id_idx" ON "public"."regular_pioneer" USING "btree" ("congregation_id");

-- Fill congregation_id from the publisher so the denormalized column can
-- never diverge from the publisher's actual congregation.
CREATE OR REPLACE FUNCTION "public"."regular_pioneer_set_congregation"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_congregation_id uuid;
BEGIN
    SELECT congregation_id INTO v_congregation_id
    FROM public.publisher
    WHERE id = NEW.publisher_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Publisher not found';
    END IF;

    NEW.congregation_id := v_congregation_id;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."regular_pioneer_set_congregation"() OWNER TO "postgres";

-- Reject periods that overlap an existing period for the same publisher.
-- Months are inclusive at both ends, so Sep 2024 - Aug 2025 followed by
-- Sep 2025 is allowed, but overlapping August is not.
CREATE OR REPLACE FUNCTION "public"."regular_pioneer_check_overlap"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM public.regular_pioneer rp
        WHERE rp.publisher_id = NEW.publisher_id
          AND rp.id IS DISTINCT FROM NEW.id
          AND rp.start_month <= COALESCE(NEW.end_month, 'infinity'::date)
          AND COALESCE(rp.end_month, 'infinity'::date) >= NEW.start_month
    ) THEN
        RAISE EXCEPTION 'Overlapping regular pioneer period';
    END IF;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."regular_pioneer_check_overlap"() OWNER TO "postgres";

-- Keeps publisher.type in sync with whether a period covers the current
-- month. Upgrades only 'publisher'/'continuous_auxiliary' so types like
-- 'special_pioneer' or 'inactive' are never clobbered; downgrades only a
-- type of 'regular_pioneer'.
CREATE OR REPLACE FUNCTION "public"."sync_publisher_regular_pioneer_type"("p_publisher_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
    v_first_of_month date := date_trunc('month', now())::date;
    v_is_active boolean;
    v_current_type text;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM public.regular_pioneer
        WHERE publisher_id = p_publisher_id
          AND start_month <= v_first_of_month
          AND (end_month IS NULL OR end_month >= v_first_of_month)
    ) INTO v_is_active;

    SELECT type INTO v_current_type
    FROM public.publisher
    WHERE id = p_publisher_id;

    IF v_is_active AND v_current_type IN ('publisher', 'continuous_auxiliary') THEN
        UPDATE public.publisher SET type = 'regular_pioneer' WHERE id = p_publisher_id;
    ELSIF NOT v_is_active AND v_current_type = 'regular_pioneer' THEN
        UPDATE public.publisher SET type = 'publisher' WHERE id = p_publisher_id;
    END IF;
END;
$$;

ALTER FUNCTION "public"."sync_publisher_regular_pioneer_type"("p_publisher_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."regular_pioneer_sync_type"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM public.sync_publisher_regular_pioneer_type(OLD.publisher_id);
        RETURN OLD;
    END IF;

    PERFORM public.sync_publisher_regular_pioneer_type(NEW.publisher_id);

    IF TG_OP = 'UPDATE' AND NEW.publisher_id IS DISTINCT FROM OLD.publisher_id THEN
        PERFORM public.sync_publisher_regular_pioneer_type(OLD.publisher_id);
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."regular_pioneer_sync_type"() OWNER TO "postgres";

CREATE OR REPLACE TRIGGER "regular_pioneer_set_congregation" BEFORE INSERT OR UPDATE ON "public"."regular_pioneer" FOR EACH ROW EXECUTE FUNCTION "public"."regular_pioneer_set_congregation"();

CREATE OR REPLACE TRIGGER "regular_pioneer_check_overlap" BEFORE INSERT OR UPDATE ON "public"."regular_pioneer" FOR EACH ROW EXECUTE FUNCTION "public"."regular_pioneer_check_overlap"();

CREATE OR REPLACE TRIGGER "regular_pioneer_updated_at" BEFORE UPDATE ON "public"."regular_pioneer" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();

CREATE OR REPLACE TRIGGER "regular_pioneer_sync_type" AFTER INSERT OR UPDATE OR DELETE ON "public"."regular_pioneer" FOR EACH ROW EXECUTE FUNCTION "public"."regular_pioneer_sync_type"();

ALTER TABLE "public"."regular_pioneer" ENABLE ROW LEVEL SECURITY;

-- Any publisher in the congregation can read pioneer periods, plus admins.
CREATE POLICY "regular_pioneer_select" ON "public"."regular_pioneer" FOR SELECT USING (("public"."is_super_admin"("auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."congregation_admin" "ca"
  WHERE (("ca"."auth_user_id" = "auth"."uid"()) AND ("ca"."congregation_id" = "regular_pioneer"."congregation_id")))) OR (EXISTS ( SELECT 1
   FROM "public"."publisher" "p"
  WHERE (("p"."auth_id" = "auth"."uid"()) AND ("p"."congregation_id" = "regular_pioneer"."congregation_id"))))));

-- Only the secretary (or admins) may write.
CREATE POLICY "regular_pioneer_insert" ON "public"."regular_pioneer" FOR INSERT WITH CHECK (("public"."is_super_admin"("auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."congregation_admin" "ca"
  WHERE (("ca"."auth_user_id" = "auth"."uid"()) AND ("ca"."congregation_id" = "regular_pioneer"."congregation_id")))) OR (EXISTS ( SELECT 1
   FROM "public"."secretary_permission" "sp"
  WHERE (("sp"."auth_user_id" = "auth"."uid"()) AND ("sp"."congregation_id" = "regular_pioneer"."congregation_id") AND ("sp"."can_edit" = true))))));

CREATE POLICY "regular_pioneer_update" ON "public"."regular_pioneer" FOR UPDATE USING (("public"."is_super_admin"("auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."congregation_admin" "ca"
  WHERE (("ca"."auth_user_id" = "auth"."uid"()) AND ("ca"."congregation_id" = "regular_pioneer"."congregation_id")))) OR (EXISTS ( SELECT 1
   FROM "public"."secretary_permission" "sp"
  WHERE (("sp"."auth_user_id" = "auth"."uid"()) AND ("sp"."congregation_id" = "regular_pioneer"."congregation_id") AND ("sp"."can_edit" = true)))))) WITH CHECK (("public"."is_super_admin"("auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."congregation_admin" "ca"
  WHERE (("ca"."auth_user_id" = "auth"."uid"()) AND ("ca"."congregation_id" = "regular_pioneer"."congregation_id")))) OR (EXISTS ( SELECT 1
   FROM "public"."secretary_permission" "sp"
  WHERE (("sp"."auth_user_id" = "auth"."uid"()) AND ("sp"."congregation_id" = "regular_pioneer"."congregation_id") AND ("sp"."can_edit" = true))))));

CREATE POLICY "regular_pioneer_delete" ON "public"."regular_pioneer" FOR DELETE USING (("public"."is_super_admin"("auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."congregation_admin" "ca"
  WHERE (("ca"."auth_user_id" = "auth"."uid"()) AND ("ca"."congregation_id" = "regular_pioneer"."congregation_id")))) OR (EXISTS ( SELECT 1
   FROM "public"."secretary_permission" "sp"
  WHERE (("sp"."auth_user_id" = "auth"."uid"()) AND ("sp"."congregation_id" = "regular_pioneer"."congregation_id") AND ("sp"."can_edit" = true))))));

GRANT ALL ON FUNCTION "public"."regular_pioneer_set_congregation"() TO "anon";
GRANT ALL ON FUNCTION "public"."regular_pioneer_set_congregation"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."regular_pioneer_set_congregation"() TO "service_role";

GRANT ALL ON FUNCTION "public"."regular_pioneer_check_overlap"() TO "anon";
GRANT ALL ON FUNCTION "public"."regular_pioneer_check_overlap"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."regular_pioneer_check_overlap"() TO "service_role";

GRANT ALL ON FUNCTION "public"."sync_publisher_regular_pioneer_type"("p_publisher_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."sync_publisher_regular_pioneer_type"("p_publisher_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sync_publisher_regular_pioneer_type"("p_publisher_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."regular_pioneer_sync_type"() TO "anon";
GRANT ALL ON FUNCTION "public"."regular_pioneer_sync_type"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."regular_pioneer_sync_type"() TO "service_role";

GRANT ALL ON TABLE "public"."regular_pioneer" TO "anon";
GRANT ALL ON TABLE "public"."regular_pioneer" TO "authenticated";
GRANT ALL ON TABLE "public"."regular_pioneer" TO "service_role";
