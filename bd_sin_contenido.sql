--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tablefunc_crosstab_2; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tablefunc_crosstab_2 AS (
	row_name text,
	category_1 text,
	category_2 text
);


ALTER TYPE public.tablefunc_crosstab_2 OWNER TO postgres;

--
-- Name: tablefunc_crosstab_3; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tablefunc_crosstab_3 AS (
	row_name text,
	category_1 text,
	category_2 text,
	category_3 text
);


ALTER TYPE public.tablefunc_crosstab_3 OWNER TO postgres;

--
-- Name: tablefunc_crosstab_4; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tablefunc_crosstab_4 AS (
	row_name text,
	category_1 text,
	category_2 text,
	category_3 text,
	category_4 text
);


ALTER TYPE public.tablefunc_crosstab_4 OWNER TO postgres;

--
-- Name: c001s_co_requerimiento; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.c001s_co_requerimiento
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.c001s_co_requerimiento OWNER TO postgres;

--
-- Name: i009s_co_subactividad; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i009s_co_subactividad
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i009s_co_subactividad OWNER TO postgres;

--
-- Name: i012s_co_aplicacion; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i012s_co_aplicacion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i012s_co_aplicacion OWNER TO postgres;

--
-- Name: i013s_co_estatus; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i013s_co_estatus
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i013s_co_estatus OWNER TO postgres;

--
-- Name: i014s_co_unidad_medida; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i014s_co_unidad_medida
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i014s_co_unidad_medida OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: c001t_requerimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.c001t_requerimiento (
    co_requerimiento numeric(9,0) DEFAULT nextval('public.c001s_co_requerimiento'::regclass) NOT NULL,
    co_usuario numeric(6,0) NOT NULL,
    co_proyecto numeric(4,0) NOT NULL,
    co_analista numeric(4,0) NOT NULL,
    co_subactividad numeric(4,0) DEFAULT nextval('public.i009s_co_subactividad'::regclass) NOT NULL,
    co_unidad_medida numeric(4,0) DEFAULT nextval('public.i014s_co_unidad_medida'::regclass) NOT NULL,
    co_aplicacion numeric(3,0) DEFAULT nextval('public.i012s_co_aplicacion'::regclass) NOT NULL,
    co_estatus numeric(2,0) DEFAULT nextval('public.i013s_co_estatus'::regclass) NOT NULL,
    nu_volumen numeric(6,0),
    fe_inicio_requerimiento timestamp without time zone NOT NULL,
    fe_fin_requerimiento timestamp without time zone,
    nu_tiempo_efectivo numeric(6,0),
    fe_ingreso_requerimiento timestamp without time zone NOT NULL,
    tx_obs_requerimiento character varying(1000),
    in_estado character varying(1) NOT NULL
);


ALTER TABLE public.c001t_requerimiento OWNER TO postgres;

--
-- Name: i001s_co_unidad_negocio; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i001s_co_unidad_negocio
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i001s_co_unidad_negocio OWNER TO postgres;

--
-- Name: i001t_unidad_negocio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i001t_unidad_negocio (
    co_unidad_negocio numeric(2,0) DEFAULT nextval('public.i001s_co_unidad_negocio'::regclass) NOT NULL,
    tx_nombre_unidad_negocio character varying(60) NOT NULL,
    tx_obs_unidad_negocio character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i001t_unidad_negocio OWNER TO postgres;

--
-- Name: i002s_co_gerencia; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i002s_co_gerencia
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i002s_co_gerencia OWNER TO postgres;

--
-- Name: i002t_gerencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i002t_gerencia (
    co_gerencia numeric(4,0) DEFAULT nextval('public.i002s_co_gerencia'::regclass) NOT NULL,
    co_unidad_negocio numeric(2,0) NOT NULL,
    tx_nombre_gerencia character varying(60) NOT NULL,
    tx_obs_gerencia character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i002t_gerencia OWNER TO postgres;

--
-- Name: i003s_co_proyecto; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i003s_co_proyecto
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i003s_co_proyecto OWNER TO postgres;

--
-- Name: i017s_co_division; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i017s_co_division
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i017s_co_division OWNER TO postgres;

--
-- Name: i022s_co_grupo_proyecto; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i022s_co_grupo_proyecto
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i022s_co_grupo_proyecto OWNER TO postgres;

--
-- Name: i003t_proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i003t_proyecto (
    co_proyecto numeric(4,0) DEFAULT nextval('public.i003s_co_proyecto'::regclass) NOT NULL,
    co_gerencia numeric(4,0) NOT NULL,
    co_tipo_proyecto numeric(2,0) NOT NULL,
    co_division numeric(2,0) DEFAULT nextval('public.i017s_co_division'::regclass),
    co_grupo_proyecto numeric(2,0) DEFAULT nextval('public.i022s_co_grupo_proyecto'::regclass),
    tx_nombre_proyecto character varying(100) NOT NULL,
    tx_alias_proyecto character varying(70) NOT NULL,
    fe_inicio_proyecto date NOT NULL,
    fe_fin_proyecto date NOT NULL,
    tx_obs_proyecto character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i003t_proyecto OWNER TO postgres;

--
-- Name: i004s_co_usuario; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i004s_co_usuario
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i004s_co_usuario OWNER TO postgres;

--
-- Name: i004t_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i004t_usuario (
    co_usuario numeric(6,0) DEFAULT nextval('public.i004s_co_usuario'::regclass) NOT NULL,
    co_gerencia numeric(4,0) NOT NULL,
    tx_indicador_usuario character varying(25) NOT NULL,
    tx_nombre_usuario character varying(30) NOT NULL,
    tx_apellido_usuario character varying(30) NOT NULL,
    tx_cargo_usuario character varying(50),
    tx_telefono_usuario character varying(13),
    tx_ubicacion_usuario character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i004t_usuario OWNER TO postgres;

--
-- Name: i005s_co_proceso; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i005s_co_proceso
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i005s_co_proceso OWNER TO postgres;

--
-- Name: i005t_proceso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i005t_proceso (
    co_proceso numeric(2,0) DEFAULT nextval('public.i005s_co_proceso'::regclass) NOT NULL,
    tx_nombre_proceso character varying(60) NOT NULL,
    tx_obs_proceso character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i005t_proceso OWNER TO postgres;

--
-- Name: i006s_co_subproceso; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i006s_co_subproceso
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i006s_co_subproceso OWNER TO postgres;

--
-- Name: i006t_subproceso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i006t_subproceso (
    co_subproceso numeric(2,0) DEFAULT nextval('public.i006s_co_subproceso'::regclass) NOT NULL,
    co_proceso numeric(2,0) NOT NULL,
    tx_nombre_subproceso character varying(60) NOT NULL,
    tx_obs_subproceso character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i006t_subproceso OWNER TO postgres;

--
-- Name: i007s_co_servicio; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i007s_co_servicio
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i007s_co_servicio OWNER TO postgres;

--
-- Name: i007t_servicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i007t_servicio (
    co_servicio numeric(2,0) DEFAULT nextval('public.i007s_co_servicio'::regclass) NOT NULL,
    tx_nombre_servicio character varying(150) NOT NULL,
    tx_obs_servicio character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i007t_servicio OWNER TO postgres;

--
-- Name: i008s_co_actividad; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i008s_co_actividad
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i008s_co_actividad OWNER TO postgres;

--
-- Name: i008t_actividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i008t_actividad (
    co_actividad numeric(4,0) DEFAULT nextval('public.i008s_co_actividad'::regclass) NOT NULL,
    co_servicio numeric(2,0) NOT NULL,
    tx_nombre_actividad character varying(150) NOT NULL,
    tx_obs_actividad character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i008t_actividad OWNER TO postgres;

--
-- Name: i016s_co_dato_matriz; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i016s_co_dato_matriz
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i016s_co_dato_matriz OWNER TO postgres;

--
-- Name: i009t_subactividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i009t_subactividad (
    co_subactividad numeric(4,0) DEFAULT nextval('public.i009s_co_subactividad'::regclass) NOT NULL,
    co_actividad numeric(4,0) NOT NULL,
    co_indicador_gestion numeric(2,0),
    co_dato_matriz numeric(2,0) DEFAULT nextval('public.i016s_co_dato_matriz'::regclass),
    tx_nombre_subactividad character varying(100) NOT NULL,
    tx_obs_subactividad character varying(200),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i009t_subactividad OWNER TO postgres;

--
-- Name: i010s_co_analista; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i010s_co_analista
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i010s_co_analista OWNER TO postgres;

--
-- Name: i010t_analista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i010t_analista (
    co_analista numeric(4,0) DEFAULT nextval('public.i010s_co_analista'::regclass) NOT NULL,
    co_perfil numeric(2,0) NOT NULL,
    co_supervisor numeric(4,0) DEFAULT nextval('public.i010s_co_analista'::regclass),
    co_subproceso numeric(2,0) DEFAULT nextval('public.i006s_co_subproceso'::regclass),
    tx_indicador_analista character varying(25) NOT NULL,
    tx_nombre_analista character varying(30) NOT NULL,
    tx_apellido_analista character varying(30) NOT NULL,
    tx_cedula_analista numeric(10,0),
    fe_nacimiento_analista timestamp without time zone,
    tx_extension_analista character varying(13) NOT NULL,
    tx_celular_analista character varying(13),
    tx_oficina_analista character varying(150),
    in_apoyo_subprocesos character varying(1) NOT NULL,
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i010t_analista OWNER TO postgres;

--
-- Name: i011s_co_proveedor; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i011s_co_proveedor
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i011s_co_proveedor OWNER TO postgres;

--
-- Name: i011t_proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i011t_proveedor (
    co_proveedor numeric(3,0) DEFAULT nextval('public.i011s_co_proveedor'::regclass) NOT NULL,
    tx_nombre_proveedor character varying(50) NOT NULL,
    tx_contacto_proveedor character varying(50),
    tx_telefono_proveedor character varying(13),
    tx_obs_proveedor character varying(100),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i011t_proveedor OWNER TO postgres;

--
-- Name: i012t_aplicacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i012t_aplicacion (
    co_aplicacion numeric(3,0) DEFAULT nextval('public.i012s_co_aplicacion'::regclass) NOT NULL,
    co_proveedor numeric(3,0) NOT NULL,
    tx_nombre_aplicacion character varying(50) NOT NULL,
    tx_obs_aplicacion character varying(100),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i012t_aplicacion OWNER TO postgres;

--
-- Name: i013t_estatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i013t_estatus (
    co_estatus numeric(2,0) DEFAULT nextval('public.i013s_co_estatus'::regclass) NOT NULL,
    tx_nombre_estatus character varying(20) NOT NULL,
    tx_obs_estatus character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i013t_estatus OWNER TO postgres;

--
-- Name: i014t_unidad_medida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i014t_unidad_medida (
    co_unidad_medida numeric(4,0) DEFAULT nextval('public.i014s_co_unidad_medida'::regclass) NOT NULL,
    tx_nombre_medida character varying(50) NOT NULL,
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i014t_unidad_medida OWNER TO postgres;

--
-- Name: i015s_co_indicador_gestion; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i015s_co_indicador_gestion
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i015s_co_indicador_gestion OWNER TO postgres;

--
-- Name: i026s_co_grupo_indicador; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i026s_co_grupo_indicador
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i026s_co_grupo_indicador OWNER TO postgres;

--
-- Name: i015t_indicador_gestion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i015t_indicador_gestion (
    co_indicador_gestion numeric(2,0) DEFAULT nextval('public.i015s_co_indicador_gestion'::regclass) NOT NULL,
    co_grupo_indicador numeric(2,0) DEFAULT nextval('public.i026s_co_grupo_indicador'::regclass),
    tx_nombre_indicador_gestion character varying(100) NOT NULL,
    tx_obs_indicador_gestion character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i015t_indicador_gestion OWNER TO postgres;

--
-- Name: i025s_co_grupo_matriz; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i025s_co_grupo_matriz
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i025s_co_grupo_matriz OWNER TO postgres;

--
-- Name: i016t_dato_matriz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i016t_dato_matriz (
    co_dato_matriz numeric(2,0) DEFAULT nextval('public.i016s_co_dato_matriz'::regclass) NOT NULL,
    co_grupo_matriz numeric(2,0) DEFAULT nextval('public.i025s_co_grupo_matriz'::regclass) NOT NULL,
    tx_nombre_dato_matriz character varying(60) NOT NULL,
    tx_obs_dato_matriz character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i016t_dato_matriz OWNER TO postgres;

--
-- Name: i017t_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i017t_division (
    co_division numeric(2,0) DEFAULT nextval('public.i017s_co_division'::regclass) NOT NULL,
    tx_nombre_division character varying(50) NOT NULL,
    tx_obs_division character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i017t_division OWNER TO postgres;

--
-- Name: i018s_co_perfil; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i018s_co_perfil
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i018s_co_perfil OWNER TO postgres;

--
-- Name: i018t_perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i018t_perfil (
    co_perfil numeric(2,0) DEFAULT nextval('public.i018s_co_perfil'::regclass) NOT NULL,
    tx_nombre_perfil character varying(50) NOT NULL,
    tx_obs_perfil character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i018t_perfil OWNER TO postgres;

--
-- Name: i019s_co_tipo_proyecto; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i019s_co_tipo_proyecto
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i019s_co_tipo_proyecto OWNER TO postgres;

--
-- Name: i019t_tipo_proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i019t_tipo_proyecto (
    co_tipo_proyecto numeric(2,0) DEFAULT nextval('public.i019s_co_tipo_proyecto'::regclass) NOT NULL,
    co_unidad_negocio numeric(2,0) NOT NULL,
    tx_nombre_tipo_proyecto character varying(60) NOT NULL,
    tx_alias_tipo_proyecto character varying(10) NOT NULL,
    tx_obs_tipo_proyecto character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i019t_tipo_proyecto OWNER TO postgres;

--
-- Name: i020s_co_proceso_servicio; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i020s_co_proceso_servicio
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i020s_co_proceso_servicio OWNER TO postgres;

--
-- Name: i020t_proceso_servicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i020t_proceso_servicio (
    co_proceso_servicio numeric(4,0) DEFAULT nextval('public.i020s_co_proceso_servicio'::regclass) NOT NULL,
    co_proceso numeric(2,0) NOT NULL,
    co_servicio numeric(2,0) NOT NULL,
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i020t_proceso_servicio OWNER TO postgres;

--
-- Name: i021s_co_medida_subactividad; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.i021s_co_medida_subactividad
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i021s_co_medida_subactividad OWNER TO postgres;

--
-- Name: i021t_medida_subactividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i021t_medida_subactividad (
    co_medida_subactividad numeric(4,0) DEFAULT nextval('public.i021s_co_medida_subactividad'::regclass) NOT NULL,
    co_unidad_medida numeric(4,0) DEFAULT nextval('public.i014s_co_unidad_medida'::regclass) NOT NULL,
    co_subactividad numeric(4,0) DEFAULT nextval('public.i009s_co_subactividad'::regclass) NOT NULL,
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i021t_medida_subactividad OWNER TO postgres;

--
-- Name: i022t_grupo_proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i022t_grupo_proyecto (
    co_grupo_proyecto numeric(2,0) DEFAULT nextval('public.i022s_co_grupo_proyecto'::regclass) NOT NULL,
    tx_nombre_grupo_proyecto character varying(50) NOT NULL,
    tx_obs_grupo_proyecto character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i022t_grupo_proyecto OWNER TO postgres;

--
-- Name: i025t_grupo_matriz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i025t_grupo_matriz (
    co_grupo_matriz numeric(2,0) DEFAULT nextval('public.i025s_co_grupo_matriz'::regclass) NOT NULL,
    tx_nombre_grupo_matriz character varying(100) NOT NULL,
    tx_obs_grupo_matriz character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i025t_grupo_matriz OWNER TO postgres;

--
-- Name: i026t_grupo_indicador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.i026t_grupo_indicador (
    co_grupo_indicador numeric(2,0) DEFAULT nextval('public.i026s_co_grupo_indicador'::regclass) NOT NULL,
    tx_nombre_grupo_indicador character varying(150) NOT NULL,
    tx_obs_grupo_indicador character varying(150),
    in_activo character varying(1) NOT NULL
);


ALTER TABLE public.i026t_grupo_indicador OWNER TO postgres;

--
-- Name: i013t_estatus ak_i013tuk_estatus_i013t_es; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i013t_estatus
    ADD CONSTRAINT ak_i013tuk_estatus_i013t_es UNIQUE (tx_nombre_estatus);


--
-- Name: c001t_requerimiento c001pk_requerimien; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001pk_requerimien PRIMARY KEY (co_requerimiento);


--
-- Name: i001t_unidad_negocio i001pk_unidad_negocio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i001t_unidad_negocio
    ADD CONSTRAINT i001pk_unidad_negocio PRIMARY KEY (co_unidad_negocio);


--
-- Name: i001t_unidad_negocio i001uk_unidad_negocio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i001t_unidad_negocio
    ADD CONSTRAINT i001uk_unidad_negocio UNIQUE (tx_nombre_unidad_negocio);


--
-- Name: i002t_gerencia i002pk_gerencia; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i002t_gerencia
    ADD CONSTRAINT i002pk_gerencia PRIMARY KEY (co_gerencia);


--
-- Name: i002t_gerencia i002uk_gerencia; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i002t_gerencia
    ADD CONSTRAINT i002uk_gerencia UNIQUE (tx_nombre_gerencia, co_unidad_negocio);


--
-- Name: i003t_proyecto i003pk_proyecto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003pk_proyecto PRIMARY KEY (co_proyecto);


--
-- Name: i004t_usuario i004pk_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i004t_usuario
    ADD CONSTRAINT i004pk_usuario PRIMARY KEY (co_usuario);


--
-- Name: i004t_usuario i004uk_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i004t_usuario
    ADD CONSTRAINT i004uk_usuario UNIQUE (tx_indicador_usuario);


--
-- Name: i005t_proceso i005pk_proceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i005t_proceso
    ADD CONSTRAINT i005pk_proceso PRIMARY KEY (co_proceso);


--
-- Name: i005t_proceso i005uk_proceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i005t_proceso
    ADD CONSTRAINT i005uk_proceso UNIQUE (tx_nombre_proceso);


--
-- Name: i006t_subproceso i006pk_subproceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i006t_subproceso
    ADD CONSTRAINT i006pk_subproceso PRIMARY KEY (co_subproceso);


--
-- Name: i006t_subproceso i006uk_subproceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i006t_subproceso
    ADD CONSTRAINT i006uk_subproceso UNIQUE (tx_nombre_subproceso);


--
-- Name: i007t_servicio i007pk_servicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i007t_servicio
    ADD CONSTRAINT i007pk_servicio PRIMARY KEY (co_servicio);


--
-- Name: i007t_servicio i007uk_servicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i007t_servicio
    ADD CONSTRAINT i007uk_servicio UNIQUE (tx_nombre_servicio);


--
-- Name: i008t_actividad i008pk_actividad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i008t_actividad
    ADD CONSTRAINT i008pk_actividad PRIMARY KEY (co_actividad);


--
-- Name: i008t_actividad i008uk_actividad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i008t_actividad
    ADD CONSTRAINT i008uk_actividad UNIQUE (tx_nombre_actividad, co_servicio);


--
-- Name: i009t_subactividad i009pk_subactividad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i009t_subactividad
    ADD CONSTRAINT i009pk_subactividad PRIMARY KEY (co_subactividad);


--
-- Name: i010t_analista i010pk_analista; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i010t_analista
    ADD CONSTRAINT i010pk_analista PRIMARY KEY (co_analista);


--
-- Name: i010t_analista i010uk_analista; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i010t_analista
    ADD CONSTRAINT i010uk_analista UNIQUE (tx_indicador_analista);


--
-- Name: i011t_proveedor i011pk_proveedor; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i011t_proveedor
    ADD CONSTRAINT i011pk_proveedor PRIMARY KEY (co_proveedor);


--
-- Name: i011t_proveedor i011uk_proveedor; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i011t_proveedor
    ADD CONSTRAINT i011uk_proveedor UNIQUE (tx_nombre_proveedor);


--
-- Name: i012t_aplicacion i012pk_aplicacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i012t_aplicacion
    ADD CONSTRAINT i012pk_aplicacion PRIMARY KEY (co_aplicacion);


--
-- Name: i012t_aplicacion i012uk_applicacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i012t_aplicacion
    ADD CONSTRAINT i012uk_applicacion UNIQUE (tx_nombre_aplicacion);


--
-- Name: i014t_unidad_medida i014pk_unidad_medida; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i014t_unidad_medida
    ADD CONSTRAINT i014pk_unidad_medida PRIMARY KEY (co_unidad_medida);


--
-- Name: i014t_unidad_medida i014uk_unidad_medida; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i014t_unidad_medida
    ADD CONSTRAINT i014uk_unidad_medida UNIQUE (tx_nombre_medida);


--
-- Name: i015t_indicador_gestion i015pk_indicador_gestion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i015t_indicador_gestion
    ADD CONSTRAINT i015pk_indicador_gestion PRIMARY KEY (co_indicador_gestion);


--
-- Name: i015t_indicador_gestion i015uk_indicador_gestion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i015t_indicador_gestion
    ADD CONSTRAINT i015uk_indicador_gestion UNIQUE (tx_nombre_indicador_gestion);


--
-- Name: i016t_dato_matriz i016pk_dato_matriz; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i016t_dato_matriz
    ADD CONSTRAINT i016pk_dato_matriz PRIMARY KEY (co_dato_matriz);


--
-- Name: i016t_dato_matriz i016uk_dato_matriz; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i016t_dato_matriz
    ADD CONSTRAINT i016uk_dato_matriz UNIQUE (tx_nombre_dato_matriz, co_grupo_matriz);


--
-- Name: i017t_division i017pk_division; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i017t_division
    ADD CONSTRAINT i017pk_division PRIMARY KEY (co_division);


--
-- Name: i017t_division i017uk_dision; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i017t_division
    ADD CONSTRAINT i017uk_dision UNIQUE (tx_nombre_division);


--
-- Name: i018t_perfil i018pk_perfil; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i018t_perfil
    ADD CONSTRAINT i018pk_perfil PRIMARY KEY (co_perfil);


--
-- Name: i018t_perfil i018uk_perfil; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i018t_perfil
    ADD CONSTRAINT i018uk_perfil UNIQUE (tx_nombre_perfil);


--
-- Name: i019t_tipo_proyecto i019pk_tipo_proyecto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i019t_tipo_proyecto
    ADD CONSTRAINT i019pk_tipo_proyecto PRIMARY KEY (co_tipo_proyecto);


--
-- Name: i019t_tipo_proyecto i019uk_tipo_proyecto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i019t_tipo_proyecto
    ADD CONSTRAINT i019uk_tipo_proyecto UNIQUE (tx_nombre_tipo_proyecto);


--
-- Name: i020t_proceso_servicio i020pk_proceso_servicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i020t_proceso_servicio
    ADD CONSTRAINT i020pk_proceso_servicio PRIMARY KEY (co_proceso_servicio);


--
-- Name: i020t_proceso_servicio i020uk_proceso_servicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i020t_proceso_servicio
    ADD CONSTRAINT i020uk_proceso_servicio UNIQUE (co_proceso, co_servicio);


--
-- Name: i021t_medida_subactividad i021pk_medida_subproceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i021t_medida_subactividad
    ADD CONSTRAINT i021pk_medida_subproceso PRIMARY KEY (co_medida_subactividad);


--
-- Name: i021t_medida_subactividad i021uk_medida_subproceso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i021t_medida_subactividad
    ADD CONSTRAINT i021uk_medida_subproceso UNIQUE (co_unidad_medida, co_subactividad);


--
-- Name: i022t_grupo_proyecto i022pk_grupo_proyecto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i022t_grupo_proyecto
    ADD CONSTRAINT i022pk_grupo_proyecto PRIMARY KEY (co_grupo_proyecto);


--
-- Name: i022t_grupo_proyecto i022uk_grupo_proyecto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i022t_grupo_proyecto
    ADD CONSTRAINT i022uk_grupo_proyecto UNIQUE (tx_nombre_grupo_proyecto);


--
-- Name: i025t_grupo_matriz i025pk_grupo_matriz; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i025t_grupo_matriz
    ADD CONSTRAINT i025pk_grupo_matriz PRIMARY KEY (co_grupo_matriz);


--
-- Name: i025t_grupo_matriz i025uk_grupo_matriz; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i025t_grupo_matriz
    ADD CONSTRAINT i025uk_grupo_matriz UNIQUE (tx_nombre_grupo_matriz);


--
-- Name: i026t_grupo_indicador i026pk_grupo_indicador; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i026t_grupo_indicador
    ADD CONSTRAINT i026pk_grupo_indicador PRIMARY KEY (co_grupo_indicador);


--
-- Name: i026t_grupo_indicador i026uk_grupoindicador; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i026t_grupo_indicador
    ADD CONSTRAINT i026uk_grupoindicador UNIQUE (tx_nombre_grupo_indicador);


--
-- Name: i013t_estatus pk_i013t_estatus; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i013t_estatus
    ADD CONSTRAINT pk_i013t_estatus PRIMARY KEY (co_estatus);


--
-- Name: c001t_requerimiento c001fk_i003t_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i003t_proyecto FOREIGN KEY (co_proyecto) REFERENCES public.i003t_proyecto(co_proyecto) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i004t_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i004t_usuario FOREIGN KEY (co_usuario) REFERENCES public.i004t_usuario(co_usuario) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i009t_subactividad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i009t_subactividad FOREIGN KEY (co_subactividad) REFERENCES public.i009t_subactividad(co_subactividad) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i010t_analista; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i010t_analista FOREIGN KEY (co_analista) REFERENCES public.i010t_analista(co_analista) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i013t_estatus; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i013t_estatus FOREIGN KEY (co_estatus) REFERENCES public.i013t_estatus(co_estatus) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i014t_medida_actividad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i014t_medida_actividad FOREIGN KEY (co_unidad_medida) REFERENCES public.i014t_unidad_medida(co_unidad_medida) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: c001t_requerimiento c001fk_i021t_aplicacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.c001t_requerimiento
    ADD CONSTRAINT c001fk_i021t_aplicacion FOREIGN KEY (co_aplicacion) REFERENCES public.i012t_aplicacion(co_aplicacion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i002t_gerencia i002fk_i001t_unidad_negocio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i002t_gerencia
    ADD CONSTRAINT i002fk_i001t_unidad_negocio FOREIGN KEY (co_unidad_negocio) REFERENCES public.i001t_unidad_negocio(co_unidad_negocio) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i003t_proyecto i003fk_i002t_gerencia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003fk_i002t_gerencia FOREIGN KEY (co_gerencia) REFERENCES public.i002t_gerencia(co_gerencia) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i003t_proyecto i003fk_i017t_division; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003fk_i017t_division FOREIGN KEY (co_division) REFERENCES public.i017t_division(co_division) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i003t_proyecto i003fk_i019t_tipo_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003fk_i019t_tipo_proyecto FOREIGN KEY (co_tipo_proyecto) REFERENCES public.i019t_tipo_proyecto(co_tipo_proyecto) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i003t_proyecto i003fk_i022t_grupo_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003fk_i022t_grupo_proyecto FOREIGN KEY (co_grupo_proyecto) REFERENCES public.i022t_grupo_proyecto(co_grupo_proyecto) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i004t_usuario i004fk_i002t_gerencia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i004t_usuario
    ADD CONSTRAINT i004fk_i002t_gerencia FOREIGN KEY (co_gerencia) REFERENCES public.i002t_gerencia(co_gerencia) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i006t_subproceso i006fk_i005t_proceso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i006t_subproceso
    ADD CONSTRAINT i006fk_i005t_proceso FOREIGN KEY (co_proceso) REFERENCES public.i005t_proceso(co_proceso) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i008t_actividad i008fk_i007t_servicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i008t_actividad
    ADD CONSTRAINT i008fk_i007t_servicio FOREIGN KEY (co_servicio) REFERENCES public.i007t_servicio(co_servicio) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i009t_subactividad i009fk_i008t_actividad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i009t_subactividad
    ADD CONSTRAINT i009fk_i008t_actividad FOREIGN KEY (co_actividad) REFERENCES public.i008t_actividad(co_actividad) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i009t_subactividad i009fk_i015t_indicador_gestion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i009t_subactividad
    ADD CONSTRAINT i009fk_i015t_indicador_gestion FOREIGN KEY (co_indicador_gestion) REFERENCES public.i015t_indicador_gestion(co_indicador_gestion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i009t_subactividad i009fk_i016t_dato_matriz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i009t_subactividad
    ADD CONSTRAINT i009fk_i016t_dato_matriz FOREIGN KEY (co_dato_matriz) REFERENCES public.i016t_dato_matriz(co_dato_matriz) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i010t_analista i010fk_i006t_subproceso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i010t_analista
    ADD CONSTRAINT i010fk_i006t_subproceso FOREIGN KEY (co_subproceso) REFERENCES public.i006t_subproceso(co_subproceso) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i010t_analista i010fk_i010t_analista; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i010t_analista
    ADD CONSTRAINT i010fk_i010t_analista FOREIGN KEY (co_supervisor) REFERENCES public.i010t_analista(co_analista) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i010t_analista i010fk_i018t_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i010t_analista
    ADD CONSTRAINT i010fk_i018t_perfil FOREIGN KEY (co_perfil) REFERENCES public.i018t_perfil(co_perfil) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i012t_aplicacion i012fk_i011t_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i012t_aplicacion
    ADD CONSTRAINT i012fk_i011t_proveedor FOREIGN KEY (co_proveedor) REFERENCES public.i011t_proveedor(co_proveedor) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i015t_indicador_gestion i015fk_i026t_grupo_indicador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i015t_indicador_gestion
    ADD CONSTRAINT i015fk_i026t_grupo_indicador FOREIGN KEY (co_grupo_indicador) REFERENCES public.i026t_grupo_indicador(co_grupo_indicador) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i016t_dato_matriz i016fk_i025t_grupo_matriz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i016t_dato_matriz
    ADD CONSTRAINT i016fk_i025t_grupo_matriz FOREIGN KEY (co_grupo_matriz) REFERENCES public.i025t_grupo_matriz(co_grupo_matriz) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i019t_tipo_proyecto i019fk_i001t_unidad_negocio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i019t_tipo_proyecto
    ADD CONSTRAINT i019fk_i001t_unidad_negocio FOREIGN KEY (co_unidad_negocio) REFERENCES public.i001t_unidad_negocio(co_unidad_negocio) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i020t_proceso_servicio i020fk_i005t_proceso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i020t_proceso_servicio
    ADD CONSTRAINT i020fk_i005t_proceso FOREIGN KEY (co_proceso) REFERENCES public.i005t_proceso(co_proceso) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i020t_proceso_servicio i020fk_i007t_servicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i020t_proceso_servicio
    ADD CONSTRAINT i020fk_i007t_servicio FOREIGN KEY (co_servicio) REFERENCES public.i007t_servicio(co_servicio) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i021t_medida_subactividad i021fk_i008t_actividad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i021t_medida_subactividad
    ADD CONSTRAINT i021fk_i008t_actividad FOREIGN KEY (co_subactividad) REFERENCES public.i009t_subactividad(co_subactividad) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: i021t_medida_subactividad i021fk_i014t_unidad_medida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i021t_medida_subactividad
    ADD CONSTRAINT i021fk_i014t_unidad_medida FOREIGN KEY (co_unidad_medida) REFERENCES public.i014t_unidad_medida(co_unidad_medida) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

