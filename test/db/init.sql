-- -------------------------------------------------------------
-- TablePlus 6.2.1(578)
--
-- https://tableplus.com/
--
-- Database: sents
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar NOT NULL,
    PRIMARY KEY ("id")
);

-- Indices
CREATE UNIQUE INDEX "PK_a3ffb1c0c8416b9fc6f907b7433" ON public.users USING btree (id);
CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON public.users USING btree (username);



-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sentiments_id_seq;

-- Table Definition
CREATE TABLE "public"."sentiments" (
    "id" int4 NOT NULL DEFAULT nextval('sentiments_id_seq'::regclass),
    "text" varchar NOT NULL,
    "score" numeric NOT NULL,
    "magnitude" numeric NOT NULL,
    "userId" int4,
    CONSTRAINT "FK_3ec40e70be405182e30c0085d75" FOREIGN KEY ("userId") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

-- Indices
CREATE UNIQUE INDEX "PK_6ffbc1049b90eef0b86bb9b92b6" ON public.sentiments USING btree (id);


-- Seed data
INSERT INTO "public"."users" ("id", "username") VALUES (1, 'user-1');
-- INSERT INTO "public"."sentiments" ("id", "text", "score", "magnitude", "userId") VALUES
-- (1, 'I''m confused', -0.800000011920929, 0.800000011920929, 1),
-- (2, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1),
-- (3, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1),
-- (4, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1),
-- (5, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1),
-- (6, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1),
-- (7, 'I''m happy', 0.8999999761581421, 0.8999999761581421, 1);
