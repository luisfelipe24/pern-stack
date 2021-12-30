# pern-stack

--Primer paso: Crear base de datos


-- Database: libretadb

-- DROP DATABASE libretadb;

CREATE DATABASE libretadb
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Spanish_Colombia.1252'
       LC_CTYPE = 'Spanish_Colombia.1252'
       CONNECTION LIMIT = -1;

--Segundo paso: Crear tablas


-- Table: public.contactos

-- DROP TABLE public.contactos;

CREATE TABLE public.contactos
(
  id integer NOT NULL DEFAULT nextval('contactos_id_seq'::regclass),
  nombre character varying(255),
  numero character varying(255),
  CONSTRAINT contactos_pkey PRIMARY KEY (id),
  CONSTRAINT contactos_nombre_key UNIQUE (nombre)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.contactos
  OWNER TO postgres;


-- Table: public.libreta

-- DROP TABLE public.libreta;

CREATE TABLE public.libreta
(
  id integer NOT NULL DEFAULT nextval('libreta_id_seq'::regclass),
  title character varying(255),
  description character varying(255),
  CONSTRAINT libreta_pkey PRIMARY KEY (id),
  CONSTRAINT libreta_title_key UNIQUE (title)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.libreta
  OWNER TO postgres;


--Tercer paso: Descargar proyecto repositorio
https://github.com/luisfelipe24/pern-stack.git

--Cuarto paso: Descargar dependencias del administrador de paquetes de node
npm install

--Quinto paso: Iniciar el servicio
npm run dev