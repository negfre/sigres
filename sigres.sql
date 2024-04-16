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
-- Data for Name: c001t_requerimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.c001t_requerimiento (co_requerimiento, co_usuario, co_proyecto, co_analista, co_subactividad, co_unidad_medida, co_aplicacion, co_estatus, nu_volumen, fe_inicio_requerimiento, fe_fin_requerimiento, nu_tiempo_efectivo, fe_ingreso_requerimiento, tx_obs_requerimiento, in_estado) FROM stdin;
23840	1249	453	33	756	2	72	2	10	2023-12-13 00:00:00	2023-12-13 00:00:00	20	2023-12-13 00:00:00	Observacion	1
\.


--
-- Data for Name: i001t_unidad_negocio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i001t_unidad_negocio (co_unidad_negocio, tx_nombre_unidad_negocio, tx_obs_unidad_negocio, in_activo) FROM stdin;
2	PRODUCCIÓN	PRODUCCIÓN	1
5	EMPRESAS MIXTAS	EXPRESAS MIXTAS	1
7	INTEVEP	INTEVEP	1
8	MENPET	MENPET	1
9	AUSENCIAS		2
6	PDVSA SERVICIOS	PDVSA SERVICIOS	2
3	GAS	GAS	2
12	ESTUDIOS INTEGRADOS DE YACIMIENTO	EEII	1
14	NO APLICA	NO APLICA	2
4	CVP	CVP	1
15	PEQUIVEN	PEQUIVEN	1
16	MPPP	MPPP 2023	1
13	24 BANCO SOBERANO DEL DATO	BND	1
1	BARIPETROL, S. A.	BARIPETROL, S. A. 2024	1
17	BOQUERON, S.A.	BOQUERON, S.A. 2024	1
18	CHEVRON-TEXACO	CHEVRON-TEXACO 2024	1
19	LAGOPETROL, S. A.	LAGOPETROL, S. A. 2024	1
20	PDV FEDERACION, S.A	PDV FEDERACION, S.A 2024	1
21	PDVSA	PDVSA 2024	1
22	PETROBOSCAN, S. A.	PETROBOSCAN, S. A. 2024	1
23	PETROCABIMAS, S. A.	PETROCABIMAS, S. A. 2024	1
24	PETROCARABOBO, S.A.	PETROCARABOBO, S.A. 2024	1
25	PETROCEDEÑO, S.A.	PETROCEDEÑO, S.A. 2024	1
26	PETROCUMAREBO, S. A.	PETROCUMAREBO, S. A. 2024	1
27	PETROCURAGUA, S.A.	PETROCURAGUA, S.A. 2024	1
28	PETRODELTA, S.A.	PETRODELTA, S.A. 2024	1
29	PETROGUARICO, S.A.	PETROGUARICO, S.A. 2024	1
30	PETROINDEPENDENCIA, S.A.	PETROINDEPENDENCIA, S.A. 2024	1
31	PETROINDEPENDIENTE, S. A.	PETROINDEPENDIENTE, S. A. 2024	1
33	PETROJUNIN, S.A.	PETROJUNIN, S.A. 2024	1
35	PETROLERA BIELOVENEZOLANA, S.A.	PETROLERA BIELOVENEZOLANA, S.A.	1
36	PETROLERA GUIRIA, S.A.	PETROLERA GUIRIA, S.A. 2024	1
37	PETROLERA INDOVENEZOLANA, S.A.	PETROLERA INDOVENEZOLANA, S.A. 2024	1
38	PETROLERA KAKI, S.A.	PETROLERA KAKI, S.A. 2024	1
39	PETROLERA SINO-VENEZOLANA S.A.	PETROLERA SINO-VENEZOLANA S.A. 2024	1
40	PETROLERA SINOVENSA, S.A	PETROLERA SINOVENSA, S.A	1
42	PETROMIRANDA, S.A.	PETROMIRANDA, S.A. 2024	1
34	PETROKARIÑA, S.A.	PETROKARIÑA, S.A. 2024	1
41	PETROMACAREO, S.A.	PETROMACAREO, S.A. 2024	1
43	PETROMONAGAS, S.A.	PETROMONAGAS, S.A. 2024	1
44	PETRONADO, S.A.	PETRONADO, S.A. 2024	1
45	PETROPARIA, S.A.	PETROPARIA, S.A. 2024	1
46	PETROPERIJA, S. A.	PETROPERIJA, S. A. 2024	1
47	PETROPIAR, S.A.	PETROPIAR, S.A. 2024	1
48	PETROQUIRIQUIRE, S.A.	PETROQUIRIQUIRE, S.A. 2024	1
49	PETROREGIONAL DEL LAGO, S. A.	PETROREGIONAL DEL LAGO, S. A. 2024	1
50	PETRORITUPANO, S.A.	PETRORITUPANO, S.A. 2024	1
51	PETROSANFELIX, S.A	PETROSANFELIX, S.A 2024	1
52	PETROSUCRE, S.A.	PETROSUCRE, S.A. 2024	1
53	PETROURDANETA, S.A.	PETROURDANETA, S.A. 2024	1
54	PETROURICA, S.A.	PETROURICA, S.A. 2024	1
55	PETROVENBRAS, S.A.	PETROVENBRAS, S.A. 2024	1
56	PETROVICTORIA, S.A.	PETROVICTORIA, S.A. 2024	1
57	PETROWARAO, S.A.	PETROWARAO, S.A. 2024	1
58	PETROWAYU, S. A.	PETROWAYU, S. A. 2024	1
59	PETROZAMORA, S.A.	PETROZAMORA, S.A.2024	1
60	PETROZUMANO, S.A.	PETROZUMANO, S.A. 2024	1
61	PLUSPETROL	PLUSPETROL 2024	1
62	REPSOLYPF	REPSOLYPF 2024	1
63	ROSNEFT, C.A	ROSNEFT, C.A 2024	1
64	STATOIL VENEZUELA	STATOIL VENEZUELA 2024	1
65	TEIKOKU	TEIKOKU 2024	1
66	VENANGOCUPET, S.A.	VENANGOCUPET, S.A. 2024	1
67	VENCUPET, S.A.	VENCUPET, S.A. 2024	1
68	YPERGAS	YPERGAS 2024	1
69	DEXEIY	DEXEIY 2024	1
70	BANCO SOBERANO DEL DATO (BSD)	BANCO SOBERANO DEL DATO (BSD) 2024	1
71	MINISTERIO DEL PODER POPULAR DE PETROLEO	MINISTERIO DEL PODER POPULAR DE PETROLEO 2024	1
\.


--
-- Data for Name: i002t_gerencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i002t_gerencia (co_gerencia, co_unidad_negocio, tx_nombre_gerencia, tx_obs_gerencia, in_activo) FROM stdin;
27	9	GODD		2
23	3	GAS (RESERVAS)	OBS	2
22	3	PROCESAMIENTO DE GAS	GAS	2
20	1	GERENTES O ASESOR DE EXPLORACION	GERENTE O ASESOR	2
21	2	GERENTES O ASESOR DE PRODUCCIÓN	GERENTE O ASESOR	2
9	2	PRODUCCIÓN (EEII ORIENTE)	PRODUCCIÓN	2
10	2	PRODUCCIÓN (EEII FAJA)	PRODUCCIÓN	2
11	2	COSTA AFUERA PRODUCCIÓN	PRODUCCIÓN	2
12	2	RECUPERACION MEJORADA DE HIDROCARBURO (RMH)	PRODUCCIÓN	2
13	3	GAS (EE II ANACO)	GAS	2
14	3	GAS (EE II SAN TOME)	GAS	2
120	69	OPERACIONES DE DATOS	OPERACIONES DE DATOS - DEXEIY	1
17	8	MINISTERIO DE ENERGÍA, PETRÓLEO Y MINERÍA	MINISTERIO	2
18	5	EMPRESAS MXTAS	EMPRESAS MIXTAS	2
19	6	PDVSA SERVICIOS	PDVSA SERVICIOS	2
6	1	BASE DE RECURSOS EXPLORACIÓN	EXPLORACIÓN	2
122	70	NO APLICA 		1
1	1	PROYECTOS EXPLORATORIOS Y DE DELINEACIÓN	EXP2017	2
2	1	GEOFÍSICA Y GEODESIA	EXP2017	2
3	1	OPERACIONES EXPLORATORIAS ORIENTE	EXP2017	2
4	1	LABORATORIOS Y NUCLEOTECAS	EXP2017	2
5	1	PROYECTOS EXPLORATORIOS INTERNACIONALES	EXP2017	2
7	1	PROYECTOS EXPLORATORIOS COSTA AFUERA	EXP2017	2
8	1	OPERACIONES DE DATOS DE EXPLORACIÓN ORIENTE	EXP2017	2
15	4	GERENCIA TÉCNICA	CVP	2
16	7	NO APLICA	ITV	2
24	1	OPERACIONES DE DATOS DE EXPLORACIÓN OCCIDENTE	EXP2017	2
25	1	OPERACIONES DE DATOS DE EXPLORACIÓN BOYACÁ	EXP2017	2
26	1	CONOCIMIENTO ESTRATÉGICO, INTELIGENCIA E INTEGRACION EXPLORA	EXP2017	2
29	12	EEIIYY COSTA AFUERA	EIY2017	2
30	12	OPERACIONES DE DATOS EEIIYY ORIENTE	EIY2017	2
31	1	ADMINISTRACIÓN DE PERSONAL Y LOGÍSTICA	EXP2017	2
32	1	OPERACIONES EXPLORATORIAS BOYACÁ	EXP2017	2
33	12	OPERACIONES DE DATOS EEIIYY OCCIDENTE	EIY2017	2
36	1	OPERACIONES EXPLORATORIAS COSTA AFUERA	EXP2017	2
37	1	OPERACIONES EXPLORATORIAS OCCIDENTE	EXP2017	2
39	1	PRESUPUESTO, PLANIFICACIÓN Y GESTIÓN	EXP2017	2
42	1	RECURSOS HUMANOS	EXP2017	2
43	1	EVALUACIÓN DE SISTEMA PETROLÍFERO	EXP2017	2
44	1	PROYECTO DE GENERACIÓN DE OPORTUNIDADES	EXP2017	2
45	1	PROYECTO DE GENERACIÓN DE PROSPECTOS	EXP2017	2
46	1	PROYECTO DE EVALUACIÓN DE PROSPECTOS Y DE DELINEACIÓN	EXP2017	2
47	1	PROYECTO DE REEXPLORACIÓN	EXP2017	2
50	12	EEIIYY FPO DIVISIÓN AYACUCHO	EIY2017	2
51	12	EEIIYY FPO DIVISIÓN BOYACÁ	EIY2017	2
52	12	EEIIYY FPO DIVISIÓN CARABOBO	EIY2017	2
53	12	EEIIYY FPO DIVISIÓN JUNIN	EIY2017	2
54	12	EEIIYY GAS	EIY2017	2
55	12	EEIIYY INTEVEP	EIY2017	2
56	12	EEIIYY ORIENTE	EIY2017	2
57	12	EEIIYY PUNTA DE MATA	EIY2017	2
58	12	OPERACIONES DE DATOS EEIIYY FAJA DIVISIÓN AYACUCHO	EIY2017	2
61	12	OPERACIONES DE DATOS EEIIYY FAJA DIVISIÓN BOYACÁ	EIY2017	2
62	12	OPERACIONES DE DATOS EEIIYY FAJA DIVISIÓN CARABOBO	EIY2017	2
63	12	OPERACIONES DE DATOS EEIIYY FAJA DIVISIÓN JUNIN	EIY2017	2
64	5	BARIPETROL	EMM2017	2
65	5	BOQUERÓN	EMM2017	2
66	5	LAGOPETROL	EMM2017	2
67	5	PETROBOSCÁN	EMM2017	2
68	5	PETROCABIMAS	EMM2017	2
69	5	PETROCARABOBO	EMM2017	2
70	5	PETROCEDEÑO	EMM2017	2
71	5	PETROCUMAREBO	EMM2017	2
72	5	PETROCURAGUA	EMM2017	2
73	5	PETRODELTA	EMM2017	2
74	5	PETROGUÁRICO	EMM2017	2
75	5	PETROINDEPENDENCIA	EMM2017	2
76	5	PETROJUNIN	EMM2017	2
77	5	PETROKARIÑA	EMM2017	2
78	5	PETROLERA BIELOVENEZOLANA	EMM2017	2
79	5	PETROLERA GÜIRIA	EMM2017	2
80	5	PETROLERA INDOVENEZOLANA	EMM2017	2
81	5	PETROLERA KAKI	EMM2017	2
82	5	PETROLERA MATA	EMM2017	2
83	5	PETROLERA SINO-VENEZOLANA	EMM2017	2
84	5	PETROLERA SINOVENSA	EMM2017	2
85	5	PETROLERA VENANGOLCUPET	EMM2017	2
86	5	PETROLERA VENCUPET	EMM2017	2
87	5	PETROMACAREO	EMM2017	2
88	5	PETROMIRANDA	EMM2017	2
89	5	PETROMONAGAS	EMM2017	2
90	5	PETRONADO	EMM2017	2
91	5	PETROPARIA	EMM2017	2
92	5	PETROPERIJÁ	EMM2017	2
93	5	PETROPIAR	EMM2017	2
94	5	PETROQUIRIQUIRE	EMM2017	2
95	5	PETROREGIONAL DEL LAGO	EMM2017	2
96	5	PETRORITUPANO	EMM2017	2
97	5	PETROSUCRE	EMM2017	2
99	5	PETROURICA	EMM2017	2
100	5	PETROVEN-BRAS	EMM2017	2
98	5	PETROURDANETA	EMM2017	2
101	5	PETROVICTORIA	EMM2017	2
102	5	PETROWARAO	EMM2017	2
103	5	PETROWAYU	EMM2017	2
104	5	PETROZAMORA	EMM2017	2
105	5	PETROZUATA	EMM2017	2
106	2	NO APLICA	PROD2017	2
108	8	NO APLICA	MEP2017	2
109	1	GERENCIA DE CAPACITACIÓN Y FORMACIÓN DEXEIY	new	2
110	15	GERENCIA DE MATERIA PRIMA	GERENCIA DE MATERIA PRIMA	2
111	7	 GERENCIA GENERAL DE EXPL Y ESTUDIOS DE YAC		2
112	1	PROYECTOS ESPECIALES	PROYECTOS ESPECIALES	2
113	1	DEXEIY	DIRECCION EJECUTIVA DE EXPLORACION Y ESTUDIOS INTEGRADO DE YACIMIENTO 	2
114	12	EE II YY CABRUTICA	JUNIO 2022	2
115	12	EE II YY MORICHAL	junio 2022	2
116	12	GERENCIA ESTUDIOS INTEGRADOS FAJA		2
117	12	EE II YY NORTE MONAGAS 		2
118	5	PETROBICENTENARIO	PETROBICENTENARIO	2
119	16	NO APLICA	MPPP	2
121	69	LABORATORIO		1
123	71	NO APLICA		1
28	13	BANCO soberano DEL DATO	BND2022	1
\.


--
-- Data for Name: i003t_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i003t_proyecto (co_proyecto, co_gerencia, co_tipo_proyecto, co_division, co_grupo_proyecto, tx_nombre_proyecto, tx_alias_proyecto, fe_inicio_proyecto, fe_fin_proyecto, tx_obs_proyecto, in_activo) FROM stdin;
453	120	34	21	1	SIGRES	SIGRES	2023-12-13	2026-12-21	SIGRES	1
454	28	28	21	1	o10001	Alias del Proyecto...	2023-12-01	2023-12-29		1
\.


--
-- Data for Name: i004t_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i004t_usuario (co_usuario, co_gerencia, tx_indicador_usuario, tx_nombre_usuario, tx_apellido_usuario, tx_cargo_usuario, tx_telefono_usuario, tx_ubicacion_usuario, in_activo) FROM stdin;
1249	121	USUARIO_TEST	TEST	TEST	ANALISTA	0414111111	OFICINA 32 EDIF SEDE PDVSA	1
\.


--
-- Data for Name: i005t_proceso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i005t_proceso (co_proceso, tx_nombre_proceso, tx_obs_proceso, in_activo) FROM stdin;
4	PLANIFICACIÓN CONTROL Y GESTIÓN	PLANIFICACIÓN CONTROL Y GESTIÓN	1
1	MANEJO Y ADMINISTRACIÓN DE DAT	2024 - MANEJO Y ADMINISTRACION DE DATOS	1
3	SOPORTE A FLUJOS DE TRABAJO	2024 - SOPORTE A FLUJOS DE TRABAJO	1
2	MEMORIA CORPORATIVA	2024 - MEMORIA CORPORATIVA	1
5	GERENTE GODD COSTA ORIENTAL	2024 - GERENCIA OPERACIONES DE DATOS COSTA ORIENTAL DEL LAGO	1
6	GGODD DEXEIY	2024 - GERENCIA GENERAL DE OPERACIONES DE DATOS DEXEIY	1
8	GERENTE GODD COSTA OCCIDENTAL	2024 - GERENCIA OPERACIONES DE DATOS COSTA OCCIDENTAL DEL LAGO	1
\.


--
-- Data for Name: i006t_subproceso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i006t_subproceso (co_subproceso, co_proceso, tx_nombre_subproceso, tx_obs_subproceso, in_activo) FROM stdin;
5	2	ACCESO A LA INFORMACIÓN CINTOTECA	ACCESO A LA INFORMACIÓN CINTOTECA	1
7	2	ACCESO A LA INFORMACIÓN CITEP	ACCESO A LA INFORMACIÓN CITEP	1
1	1	ASEGURAMIENTO DE LA CALIDAD DEL DATO	2024 - ASEGURAMIENTO DE LA CALIDAD DEL DATO	1
2	1	INTEGRIDAD DEL DATO	2024 - INTEGRIDAD DEL DATO	1
3	1	PROCESOS Y NORMATIVAS	2024 - PROCESOS Y NORMATIVAS	1
4	3	SOPORTE A PROYECTOS Y ESTUDIOS	2024 - SOPORTE A PROYECTOS Y ESTUDIOS 	1
10	3	CAPACITACIÓN AL USUARIO	2024 - CAPACITACIÓN DEL USUARIO	1
8	3	USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	2024 - USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	1
6	2	MANEJO Y PRESERVACIÓN DE LA INFORMACIÓN	2024 - MANEJO Y PRESERVACIÓN DE LA INFORMACIÓN	1
9	2	ACCESO A LA INFORMACIÓN	2024 - ACCESO A LA INFORMACIÓN	1
22	1	MANEJO DE DATOS	2024 - MANEJO Y ADMINISTRACIÓN DE DATOS	1
23	3	SOPORTE A FLUJOS DE TRABAJO	2024 - SOPORTE A FLUJOS DE TRABAJO	1
24	2	MEMORIA CORPORATIVA	2024 - MEMORIA CORPORATIVA	1
13	1	LIDER MANEJO Y ADMINISTRACIÓN DE DATOS	2024 - LIDER MANEJO Y ADMINISTRACIÓN DE DATOS	1
14	2	LIDER MEMORIA CORPORATIVA	2024 - LIDER MEMORIA CORPORATIVA	1
15	3	LIDER SOPORTE AL FLUJO DE TRABAJO	2024 - LIDER SOPORTE AL FLUJO DE TRABAJO	1
16	4	LIDER PLANIFICACIÓN CONTROL Y GESTIÓN	2024 - LIDER PLANIFICACIÓN CONTROL Y GESTIÓN	1
12	5	GERENTE GODD COSTA ORIENTAL	2024 - GERENCIA OPERACIONES DE DATOS COSTA ORIENTAL DEL LAGO	1
18	6	GERENTE GGODD DEXEIY	2024 - GERENTE GGODD DEXEIY	1
11	4	PLANIFICACIÓN	2024 - PLANIFICACIÓN	1
17	8	GERENTE GODD COSTA OCCIDENTAL	GERENTE GERENCIA OPERACIONES DE DATOS COSTA OCCIDENTAL DEL LAGO	1
\.


--
-- Data for Name: i007t_servicio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i007t_servicio (co_servicio, tx_nombre_servicio, tx_obs_servicio, in_activo) FROM stdin;
9	SOPORTE EN USO DE LA APLICACIÓN	OBSERVACIÓN	2
10	ASESORÍA Y/O ADIESTRAMIENTO TÉCNICO DE DATOS GEOFÍSICOS, GEOLÓGICOS Y DE YACIMIENTOS	OBSERVACIÓN	2
11	SOPORTE A PROYECTOS Y ESTUDIOS	OBSERVACIÓN	2
1	ACCESO Y DISPONIBILIDAD DE LA INFORMACIÓN TÉCNICA, DIGITAL, FÍSICA, BIBLIOGRAFICA Y DATOS SÍSMICOS DE LA CORPORACIÓN	OBSERVACIÓN	2
3	ADMINISTRACIÓN DE  PLATAFORMAS ESPECIALIZADAS	OBSERVACIÓN	2
5	CARGA, ACTUALIZACIÓN, VALIDACIÓN Y EXPORTACIÓN DE DATOS GEOLOGICOS DE POZO EN BASE DE DATOS CORPORATIVA Y APLICACIONES ESPECIALIZADAS	OBSERVACIÓN	2
4	INTEGRIDAD DEL DATO DE E&P	OBSERVACIÓN	2
6	ADMINISTRACIÓN DE LA BASE DE DATOS CORPORATIVA DE PERFILES ORIGINALES - ORIENTE	OBSERVACIÓN	2
7	ASEGURAMIENTO DE LA CALIDAD DEL DATO GEOFÍSICO	OBSERVACIÓN	2
8	CARGA, ACTUALIZACIÓN Y VALIDACIÓN DE DATOS GEOFÍSICOS EN BASES DE DATOS CORPORATIVAS	OBSERVACIÓN	2
13	CAPACITACIÓN AL USUARIO	SERVICIO SFT 2017	2
2	MANEJO Y PRESERVACIÓN DE LA INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y DATOS SÍSMICOS DE LA CORPORACIÓN	OBSERVACIÓN	2
14	USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	SERVICIO SFT 2017	2
15	SOPORTES A PROYECTOS Y ESTUDIOS	SERVICIO SFT 2017	2
17	SEGUIMIENTO DE LA CALIDAD DE LOS DATOS DE PERFORACIÓN Y PRODUCCIÓN	SEGUIMIENTO DE LA CALIDAD DE LOS DATOS DE PERFORACIÓN Y PRODUCCIÓN\n\nsolicitado por Rafael Castillo fecha de la solicitud 09/29/21	2
16	CARGA, ACTUALIZACIÓN, VALIDACIÓN Y EXPORTACIÓN DE DATOS DE PRODUCCIÓN EN BASE DE DATOS CORPORATIVA Y APLICACIONES ESPECIALIZADAS	CARGA, ACTUALIZACIÓN, VALIDACIÓN Y EXPORTACIÓN DE DATOS DE PRODUCCIÓN EN BASE DE DATOS CORPORATIVA Y APLICACIONES ESPECIALIZADAS	2
47	SOPORTE A FLUJOS DE TRABAJO		2
48	MEMORIA CORPORATIVA		2
49	MANEJO Y ADMINISTRACION DE DATOS		2
50	NO APLICA	NO APLICA BORRAR	1
29	2022_AUDITORÍA DE DATOS CARGADOS EN BASES DE DATOS OPERACIONALES Y DE PROYECTOS	AUDITORÍA DE DATOS CARGADOS EN BASES DE DATOS OPERACIONALES Y DE PROYECTOS	2
32	2022_CARGA O ACTUALIZACIÓN DE DATOS	CARGA O ACTUALIZACIÓN DE DATOS	2
33	2022_CIERRE DE PROYECTOS	CIERRE DE PROYECTOS	2
40	2022_CONTROL Y SEGUIMIENTO DE LA OPERATIVIDAD DE LAS APLICACIONES DEL AMBIENTE ESPECIALIZADOS	CONTROL Y SEGUIMIENTO DE LA OPERATIVIDAD DE LAS APLICACIONES DEL AMBIENTE ESPECIALIZADOS	2
44	2022_CREACIÓN DE NUEVOS EXPEDIENTES DE POZOS EN FÍSICO Y DIGITAL	CREACIÓN DE NUEVOS EXPEDIENTES DE POZOS EN FÍSICO Y DIGITAL	2
35	2022_CREACIÓN DE PROCEDIMIENTOS E INSTRUCTIVOS DE TRABAJO SGC	2022_CREACIÓN DE PROCEDIMIENTOS E INSTRUCTIVOS DE TRABAJO SGC	2
36	2022_CREACIÓN Y ACTUALIZACIÓN DE NORMAS Y ESTÁNDARES EN GESTIÓN DE DATOS	CREACIÓN Y ACTUALIZACIÓN DE NORMAS Y ESTÁNDARES EN GESTIÓN DE DATOS	2
37	2022_DIVULGACIÓN DE EVENTOS(TALLERES) TÉCNICOS EN APLICACIONES ESPECIALIZADAS	DIVULGACIÓN DE EVENTOS(TALLERES) TÉCNICOS EN APLICACIONES ESPECIALIZADAS. 	2
31	2022_GENERACIÓN Y SUMINISTRO DE DATOS DEL NEGOCIO DE EXPLORACION Y PRODUCCION	GENERACIÓN Y SUMINISTRO DE DATOS DEL NEGOCIO DE EXPLORACION Y PRODUCCION	2
30	2022_GENERACIÓN Y SUMINISTRO DE INVENTARIO DE DATOS	GENERACIÓN Y SUMINISTRO DE INVENTARIO DE DATOS	2
38	2022_GESTIÓN ADMINISTRATIVA REQUERIDAS PARA LAS CAPACITACIONES Y CONSULTORÍAS CON ESFUERZO PROPIO Y TERCEROS	GESTIÓN ADMINISTRATIVA REQUERIDAS PARA LAS CAPACITACIONES Y CONSULTORÍAS CON ESFUERZO PROPIO Y TERCEROS	2
34	2022_GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES	GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES	2
20	2022_GESTIÓN DE REQUERIMIENTOS EN PLATAFORMA DE APLICACIONES ESPECIALIZADAS	GESTIÓN DE REQUERIMIENTOS EN PLATAFORMA DE APLICACIONES ESPECIALIZADAS	2
54	2024 CIERRE DE PROYECTOS	CAT-MAD-04 - 2024 - CIERRE DE PROYECTOS	1
52	2024 GENERACIÓN Y SUMINISTRO DE DATOS	CAT-MAD-02 - 2024 - GENERACIÓN Y SUMINISTRO DE DATOS	1
28	2024 ASEGURAMIENTO DE LA CALIDAD DEL DATO	CAT-MAD-01 - 2024 - ASEGURAMIENTO DE LA CALIDAD DEL DATO	1
56	2024 GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES	CAT-MAD-06 - 2024 - GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES	1
57	2024 ELABORACIÓN Y/O ACTUALIZACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	CAT-MAD-07 - 2024 - ELABORACIÓN Y/O ACTUALIZACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	1
18	2024 GESTIÓN EN EL AMBIENTE ESPECIALIZADO	CAT-SFT-01 - 2024 - GESTIÓN EN EL AMBIENTE ESPECIALIZADO	1
59	2024 GESTIÓN DE ADMINISTRACIÓN DE LOS PROYECTOS DEL AMBIENTE ESPECIALIZADO	CAT-SFT-02 - 2024 - GESTIÓN DE ADMINISTRACIÓN DE LOS PROYECTOS DEL AMBIENTE ESPECIALIZADO	1
21	2024 SOPORTE FUNCIONAL EN EL USO DE LAS APLICACIONES ESPECIALIZADAS	CAT-SFT-03 - 2024 - SOPORTE FUNCIONAL EN EL USO DE LAS APLICACIONES ESPECIALIZADAS	1
41	2024 DOCUMENTACIÓN DE MEJORES PRÁCTICAS EN APLICACIONES ESPECIALIZADAS	CAT-SFT-04 - 2024 - DOCUMENTACIÓN DE MEJORES PRÁCTICAS EN APLICACIONES ESPECIALIZADAS	1
19	2024 GESTIÓN DE CAPACITACIÓN EN EL USO DE APLICACIONES ESPECIALIZADAS	CAT-SFT-05 - 2024 - GESTIÓN DE CAPACITACIÓN EN EL USO DE APLICACIONES ESPECIALIZADAS	1
25	2024 BÚSQUEDA ESPECIALIZADA	CAT-MC-01 - 2024 - BÚSQUEDA ESPECIALIZADA	1
27	2024 INDUCCIÓN Y ASESORÍA DE PRODUCTOS Y SERVICIOS DE LOS CITEP´S	CAT-MC-02 - 2024 - INDUCCIÓN Y ASESORÍA DE PRODUCTOS Y SERVICIOS DE LOS CITEP´S	1
23	2024 DIGITALIZACIÓN Y SUMINISTRO DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	CAT-MC-04 - 2024 - DIGITALIZACIÓN Y SUMINISTRO DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	1
22	2024 PRÉSTAMO Y DEVOLUCIÓN DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	CAT-MC-03 - 2024 - PRÉSTAMO Y DEVOLUCIÓN DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	1
24	2024 RECEPCIÓN, RESGUARDO Y PUBLICACIÓN DE DOCUMENTACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	CAT-MC-05 - 2024 - RECEPCIÓN, RESGUARDO Y PUBLICACIÓN DE DOCUMENTACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	1
26	2024 SUMINISTRO DE INVENTARIOS DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	CAT-MC-06 - 2024 - SUMINISTRO DE INVENTARIOS DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	1
46	2024 TRANSFERENCIA DE ACTIVOS DE INFORMACIÓN	CAT-MC-07 - 2024 - TRANSFERENCIA DE ACTIVOS DE INFORMACIÓN	1
39	2022_GESTIÓN PARA EL CONTROL Y SEGUIMIENTO DE LICENCIAMIENTO Y EQUIPAMIENTO	GESTIÓN PARA EL CONTROL Y SEGUIMIENTO DE LICENCIAMIENTO Y EQUIPAMIENTO	2
42	2022_JORNADAS DE DIVULGACIÓN DEL SERVICIO	JORNADAS DE DIVULGACIÓN DEL SERVICIO	2
45	2022_JORNADAS DE LIMPIEZA, ORGANIZACIÓN, DESINCORPORACIÓN Y/O INVENTARIO DE ACTIVOS DE INFORMACIÓN	JORNADAS DE LIMPIEZA, ORGANIZACIÓN, DESINCORPORACIÓN Y/O INVENTARIO DE ACTIVOS DE INFORMACIÓN	2
43	2022_RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN PRESCRITO	RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN PRESCRITO	2
53	2024 CARGA O ACTUALIZACIÓN DE DATOS	CAT-MAD-03 - 2024 - CARGA O ACTUALIZACIÓN DE DATOS	1
55	2024 AUDITORÍA DE DATOS CARGADOS EN BASES DE DATOS OPERACIONALES Y DE PROYECTOS	CAT-MAD-05 - 2024 - AUDITORÍA DE DATOS CARGADOS EN BASES DE DATOS OPERACIONALES Y DE PROYECTOS	1
\.


--
-- Data for Name: i008t_actividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i008t_actividad (co_actividad, co_servicio, tx_nombre_actividad, tx_obs_actividad, in_activo) FROM stdin;
75	27	INDUCCIÓN Y ASESORÍA DE PRODUCTOS Y SERVICIOS DE LOS CITEP´S	CAT-MC- IAP-01 - 2024 - INDUCCIÓN Y ASESORÍA DE PRODUCTOS Y SERVICIOS DE LOS CITEP´S	1
58	59	INVENTARIO DE PROYECTOS DE INTERPRETACIÓN	CAT-SFT-GAP-02 - 2024 - INVENTARIO DE PROYECTOS DE INTERPRETACIÓN	1
128	22	JORNADAS DE RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN GENERADOS Y NO ENTREGADOS	CAT-MC-PDI-04 - 2024 - JORNADAS DE RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN GENERADOS Y NO ENTREGADOS	1
8	19	PLAN DE CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	CAT-SFT-GCU-01 - 2024 - PLAN DE CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	1
124	57	PROVEER ACCIONES DE FORMACIÓN EN MANEJO Y ADMINISTRACIÓN DE DATOS	CAT-MAD-EPN-03 - 2024 - PROVEER ACCIONES DE FORMACIÓN EN MANEJO Y ADMINISTRACIÓN DE DATOS	1
60	59	RESPALDO DE PROYECTOS DE INTERPRETACIÓN	CAT-SFT-GAP-04 - 2024 - RESPALDO DE PROYECTOS DE INTERPRETACIÓN	1
11	53	CARGA Y ACTUALIZACIÓN DE DATOS	CAT-MAD-CAD-01 - 2024 - CARGA Y ACTUALIZACIÓN DE DATOS	1
23	19	APLICACIÓN Y EVALUACIÓN DE ENCUESTAS DE LAS ACCIONES DE FORMACIÓN	CAT-SFT-GCU-06 - 2024 - APLICACIÓN Y EVALUACIÓN DE ENCUESTAS DE LAS ACCIONES DE FORMACIÓN	1
50	21	ASESORÍA EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	CAT-SFT-SFA-01 - 2024 - ASESORÍA EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	1
57	59	CREACIÓN DE PROYECTOS DE INTERPRETACIÓN	CAT-SFT-GAP-01 - 2024 - CREACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
62	59	DESINCORPORACIÓN DE PROYECTOS DE INTERPRETACIÓN	CAT-SFT-GAP-06 - 2024 - DESINCORPORACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
112	19	GESTIÓN ADMINISTRATIVA PARA LA EJECUCIÓN DE ACCIONES DE FORMACIÓN CON ESFUERZO PROPIO	CAT-SFT-GCU-02 - 2024 - GESTIÓN ADMINISTRATIVA PARA LA EJECUCIÓN DE ACCIONES DE FORMACIÓN CON ESFUERZO PROPIO	1
111	19	GESTIÓN ADMINISTRATIVA PARA LA EJECUCIÓN LAS ACCIONES DE FORMACIÓN CON SERVICIOS CONTRATADOS	CAT-SFT-GCU-03 - 2024 - GESTIÓN ADMINISTRATIVA PARA LA EJECUCIÓN LAS ACCIONES DE FORMACIÓN CON SERVICIOS CONTRATADOS	1
120	56	GESTIÓN DE ACCESO A USUARIOS A LA BASE DE DATOS OPERACIONAL DE PERFORACIÓN	CAT-MAD-GAU-03 - 2024 - GESTIÓN DE ACCESO A USUARIOS A LA BASE DE DATOS OPERACIONAL DE PERFORACIÓN	1
119	56	GESTIÓN DE ACCESO A USUARIOS A LA BASE DE DATOS OPERACIONAL DE PRODUCCIÓN	CAT-MAD-GAU-02 - 2024 - GESTIÓN DE ACCESO A USUARIOS A LA BASE DE DATOS OPERACIONAL DE PRODUCCIÓN	1
99	56	GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES DE POZOS Y PERFILES DE POZOS	CAT-MAD-GAU-01 - 2024 - GESTIÓN DE ACCESO A USUARIOS A LAS BASES DE DATOS OPERACIONALES DE POZOS Y PERFILES DE POZOS	1
107	18	GESTIÓN DE INCIDENTES EN EL AMBIENTE ESPECIALIZADO	CAT-SFT-GAE-01 - 2024 - GESTIÓN DE INCIDENTES EN EL AMBIENTE ESPECIALIZADO	1
126	27	JORNADAS DE DIVULGACIÓN DE LOS SERVICIOS DE MEMORIA CORPORATIVA	CAT-MC-IAP-02 - 2024 - JORNADAS DE DIVULGACIÓN DE LOS SERVICIOS DE MEMORIA CORPORATIVA	1
108	18	MONITOREO DE FUNCIONAMIENTO DE LAS APLICACIONES ESPECIALIZADAS	CAT-SFT-GAE-02 - 2024 - MONITOREO DE FUNCIONAMIENTO DE LAS APLICACIONES ESPECIALIZADAS	1
72	22	PRÉSTAMO DE DOCUMENTOS TÉCNICOS Y BIBLIOGRÁFICOS	CAT-MC-PDI-01 - 2024 - PRÉSTAMO DE DOCUMENTOS TÉCNICOS Y BIBLIOGRÁFICOS	1
114	19	PROMOVER Y/O COORDINAR EVENTOS TÉCNICOS DE APLICACIONES ESPECIALIZADAS	CAT-SFT-GCU-05 - 2024 - PROMOVER Y/O COORDINAR EVENTOS TÉCNICOS DE APLICACIONES ESPECIALIZADAS	1
73	22	RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN PRESCRITOS	CAT-MC-PDI-02 - 2024 - RECUPERACIÓN DE ACTIVOS DE INFORMACIÓN PRESCRITOS	1
97	55	AUDITORÍA EN LAS BASES DE DATOS OPERACIONALES DE POZOS Y PERFILES DE POZOS	CAT-MAD-ADC-01 - 2024 - AUDITORÍA EN LAS BASES DE DATOS OPERACIONALES DE POZOS Y PERFILES DE POZOS	1
117	53	GESTIÓN DE CÓDIGO EN LA BASE DE DATOS OPERACIONAL DE POZOS	CAT-MAD-CAD-02 - 2024 - GESTIÓN DE CÓDIGO EN LA BASE DE DATOS OPERACIONAL DE POZOS	1
94	28	GESTIÓN DE CERTIFICACIÓN DE DATOS	CAT-MAD-ACD-06 - 2024 - GESTIÓN DE CERTIFICACIÓN DE DATOS	1
118	53	ACTUALIZACIÓN Y PUBLICACIÓN DE DATOS DE PRODUCCIÓN EN PROYECTOS DE MONITOREO DE POZOS	CAT-MAD-CAD-03 - 2024 - ACTUALIZACIÓN Y PUBLICACIÓN DE DATOS DE PRODUCCIÓN EN PROYECTOS DE MONITOREO DE POZOS	1
66	52	EXPORTACIÓN DE DATOS	CAT-MAD-GSD-02 - 2024 - EXPORTACIÓN DE DATOS	1
95	52	GENERACIÓN DE PAQUETES DE DATOS	CAT-MAD-GSD-03 - 2024 - GENERACIÓN DE PAQUETES DE DATOS	1
115	28	SEGUIMIENTO A LA CALIDAD DE DATOS DURANTE LA PERFORACIÓN DE POZOS EXPLORATORIOS Y PRODUCTORES	CAT-MAD-ACD-02 - 2024 - SEGUIMIENTO A LA CALIDAD DE DATOS DURANTE LA PERFORACIÓN DE POZOS EXPLORATORIOS Y PRODUCTORES	1
91	28	SEGUIMIENTO A LA CALIDAD DE LOS DATOS SÍSMICOS	CAT-MAD-ACD-01 - 2024 - SEGUIMIENTO A LA CALIDAD DE LOS DATOS SÍSMICOS\n	1
98	54	CIERRE DE PROYECTOS	CAT-MAD-CP-01 - 2024 - CIERRE DE PROYECTOS	1
86	59	ACCESO A PROYECTO DE INTERPRETACIÓN EN APLICACIONES ESPECIALIZADAS	CAT-SFT-GAP-03 - 2024 - ACCESO A PROYECTO DE INTERPRETACIÓN EN APLICACIONES ESPECIALIZADAS	1
103	24	RESGUARDO DE INFORMACIÓN SÍSMICA	CAT-MC-RRP-04 - 2024 - RESGUARDO DE INFORMACIÓN SÍSMICA	1
61	59	RESTAURACIÓN DE PROYECTOS DE INTERPRETACIÓN	CAT-SFT-GAP-05 - 2024 - RESTAURACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
127	22	ATENCIÓN DE REQUERIMIENTOS DE INFORMACIÓN SÍSMICA	CAT-MC-PDI-03 - 2024 ATENCIÓN DE REQUERIMIENTOS DE INFORMACIÓN SÍSMICA	1
83	41	ACTUALIZACIÓN Y/O GENERACIÓN DE NUEVOS FLUJO DE TRABAJO	CAT-SFT-DMP-02 - 2024 - ACTUALIZACIÓN Y/O GENERACIÓN DE NUEVOS FLUJO DE TRABAJO	1
125	25	BÚSQUEDA ESPECIALIZADA	CAT-MC-BE-01 - 2024 - BÚSQUEDA ESPECIALIZADA	1
121	56	DEPURACIÓN DE CUENTAS EN LA BASE DE DATOS OPERACIONAL DE POZOS	CAT-MAD-GAU-04 - 2024 - DEPURACIÓN DE CUENTAS EN LA BASE DE DATOS OPERACIONAL DE POZOS	1
122	57	ELABORACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	CAT-MAD-EPN-01 - 2024ELABORACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	1
87	41	ELABORACIÓN DE MANUALES, GUÍAS PARA EL MANEJO DE LAS APLICACIONES ESPECIALIZADAS	CAT-SFT-DMP-01 - 2024 - ELABORACIÓN DE MANUALES, GUÍAS PARA EL MANEJO DE LAS APLICACIONES ESPECIALIZADAS	1
134	24	JORNADAS DE LIMPIEZA, ORGANIZACIÓN, DESINCORPORACIÓN	CAT-MC-RRP-06 - 2024 - JORNADAS DE LIMPIEZA, ORGANIZACIÓN, DESINCORPORACIÓN	1
133	24	MANTENIMIENTO DE MEDIOS MAGNÉTICOS CON INFORMACIÓN SÍSMICA	CAT-MC-RRP-05 - 2024 - MANTENIMIENTO DE MEDIOS MAGNÉTICOS CON INFORMACIÓN SÍSMICA	1
52	59	MIGRACIÓN DE PROYECTOS DE UNA APLICACIÓN ESPECIALIZADA A OTRA APLICACIÓN ESPECIALIZADA	CAT-SFT-GAP-07 - 2024 - MIGRACIÓN DE PROYECTOS DE UNA APLICACIÓN ESPECIALIZADA A OTRA APLICACIÓN ESPECIALIZADA	1
141	21	PROVEER ACCIONES DE FORMACIÓN EN APLICACIONES ESPECIALIZADAS	CAT-SFT-SFA-02 - 2024 - PROVEER ACCIONES DE FORMACIÓN EN APLICACIONES ESPECIALIZADAS	1
130	24	RESGUARDO DE DOCUMENTOS TÉCNICOS Y BIBLIOGRÁFICOS	CAT-MC-RRP-01 - 2024 - RESGUARDO DE DOCUMENTOS TÉCNICOS Y BIBLIOGRÁFICOS	1
137	46	SELECCIÓN, ORGANIZACIÓN Y TRASLADO DE ACTIVOS DE INFORMACIÓN	CAT-MC-TAI-01 - 2024 - SELECCIÓN, ORGANIZACIÓN Y TRASLADO DE ACTIVOS DE INFORMACIÓN	1
136	26	SUMINISTRO DE INVENTARIOS DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	CAT-MC-SII-01 - 2024 - SUMINISTRO DE INVENTARIOS DE INFORMACIÓN TÉCNICA, BIBLIOGRÁFICA Y SÍSMICA	1
131	24	CREACIÓN Y RESGUARDO DE HISTORIAS DE POZOS	CAT-MC-RRP-02 - 2024 - CREACIÓN Y RESGUARDO DE HISTORIAS DE POZOS	1
116	28	ASEGURAMIENTO DE LA CALIDAD DE LOS DATOS DURANTE EL CIERRE CONTABLE EN LA BASE DE DATOS OPERACIONAL DE PRODUCCIÓN	CAT-MAD-ACD-05 - 2024 - ASEGURAMIENTO DE LA CALIDAD DE LOS DATOS DURANTE EL CIERRE CONTABLE EN LA BASE DE DATOS OPERACIONAL DE PRODUCCIÓN	1
13	52	BÚSQUEDA Y/O INVENTARIO DE DATOS	CAT-MAD-GSD-01 - 2024 - BÚSQUEDA Y/O INVENTARIO DE DATOS	1
92	28	SEGUIMIENTO A LA CALIDAD DE LOS DATOS DE PRODUCCIÓN APLICAR NORMAS Y PROCEDIMIENTOS DE CALIDAD A LOS DATOS DE PRODUCCIÓN DE POZOS	CAT-MAD-ACD-03 - 2024 - SEGUIMIENTO A LA CALIDAD DE LOS DATOS DE PRODUCCIÓN. APLICAR NORMAS Y PROCEDIMIENTOS DE CALIDAD A LOS DATOS DE PRODUCCIÓN DE POZOS 	1
144	28	SEGUIMIENTO A LA CALIDAD DE LOS DATOS EN BASE DE DATOS DE PROYECTOS	CAT-MAD-ACD-04 - 2024 - SEGUIMIENTO A LA CALIDAD DE LOS DATOS EN BASE DE DATOS DE PROYECTOS	1
147	19	ACCIONES DE FORMACIÓN EJECUTADAS EN APLICACIONES ESPECIALIZADAS	CAT-SFT-GCU-04 - 2024 - ACCIONES DE FORMACIÓN EJECUTADAS EN APLICACIONES ESPECIALIZADAS	1
123	57	ACTUALIZACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	CAT-MAD-EPN-02 - 2024 - ACTUALIZACIÓN DE DOCUMENTOS DE PROCESOS Y NORMATIVAS PARA LA GESTIÓN DE DATOS	1
132	24	ACTUALIZACIÓN DE HISTORIAS DE POZOS	CAT-MC-RRP-03 - 2024 - ACTUALIZACIÓN DE HISTORIAS DE POZOS	1
135	24	AUDITORIA Y CONTROL DE CALIDAD DE LAS BASES DE DATOS DOCUMENTALES	CAT-MC-RRP-07 - 2024 - AUDITORIA Y CONTROL DE CALIDAD DE LAS BASES DE DATOS DOCUMENTALES	1
138	23	DIGITALIZACIÓN Y SUMINISTRO DE DOCUMENTACIÓN	CAT-MC-DSI-01 - 2024 - DIGITALIZACIÓN Y SUMINISTRO DE DOCUMENTACIÓN	1
140	23	DIGITALIZACIÓN Y VECTORIZACIÓN DE LÍNEAS SÍSMICAS	CAT-MC-DSI-03 - 2024 - DIGITALIZACIÓN Y VECTORIZACIÓN DE LÍNEAS SÍSMICAS	1
139	23	DIGITALIZACIÓN Y VECTORIZACIÓN DE PERFILES DE POZOS	CAT-MC-DSI-02 - 2024 - DIGITALIZACIÓN Y VECTORIZACIÓN DE PERFILES DE POZOS	1
110	41	ELABORACIÓN DE PROCEDIMIENTOS DE SOPORTE A FLUJOS DE TRABAJOS EN MARCADO EN EL SGC	CAT-SFT-DMP-03 - 2024 - ELABORACIÓN DE PROCEDIMIENTOS DE SOPORTE A FLUJOS DE TRABAJOS EN MARCADO EN EL SGC	1
129	22	EVALUACIÓN DE RESULTADOS DE ENCUESTA DE SATISFACCIÓN AL USUARIO POR ACCESO A LA INFORMACIÓN	CAT-MC-PDI-05 - 2024 - EVALUACIÓN DE RESULTADOS DE ENCUESTA DE SATISFACCIÓN AL USUARIO POR ACCESO A LA INFORMACIÓN	1
54	21	EVALUACIÓN INTEGRAL DE NUEVAS APLICACIONES ESPECIALIZADAS Y/O VERSIONES	CAT-SFT-SFA-03 - 2024 - EVALUACIÓN INTEGRAL DE NUEVAS APLICACIONES ESPECIALIZADAS Y/O VERSIONES	1
\.


--
-- Data for Name: i009t_subactividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i009t_subactividad (co_subactividad, co_actividad, co_indicador_gestion, co_dato_matriz, tx_nombre_subactividad, tx_obs_subactividad, in_activo) FROM stdin;
730	116	1	1	NO APLICA	NO APLICA	1
731	94	1	1	NO APLICA	NO APLICA	1
732	115	1	1	NO APLICA	NO APLICA	1
733	92	1	1	NO APLICA	NO APLICA	1
734	144	1	1	NO APLICA	NO APLICA	1
735	91	1	1	NO APLICA	NO APLICA	1
736	97	1	1	NO APLICA	NO APLICA	1
737	125	1	1	NO APLICA	NO APLICA	1
738	118	1	1	NO APLICA	NO APLICA	1
739	11	1	1	NO APLICA	NO APLICA	1
740	117	1	1	NO APLICA	NO APLICA	1
741	98	1	1	NO APLICA	NO APLICA	1
742	138	1	1	NO APLICA	NO APLICA	1
743	140	1	1	NO APLICA	NO APLICA	1
744	139	1	1	NO APLICA	NO APLICA	1
745	83	1	1	NO APLICA	NO APLICA	1
746	87	1	1	NO APLICA	NO APLICA	1
747	110	1	1	NO APLICA	NO APLICA	1
748	123	1	1	NO APLICA	NO APLICA	1
749	122	1	1	NO APLICA	NO APLICA	1
750	124	1	1	NO APLICA	NO APLICA	1
751	13	1	1	NO APLICA	NO APLICA	1
752	66	1	1	NO APLICA	NO APLICA	1
753	95	1	1	NO APLICA	NO APLICA	1
754	121	1	1	NO APLICA	NO APLICA	1
756	120	1	1	NO APLICA	NO APLICA	1
755	119	1	1	NO APLICA	NO APLICA	1
757	99	1	1	NO APLICA	NO APLICA	1
758	86	1	1	NO APLICA	NO APLICA	1
759	57	1	1	NO APLICA	NO APLICA	1
\.


--
-- Data for Name: i010t_analista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i010t_analista (co_analista, co_perfil, co_supervisor, co_subproceso, tx_indicador_analista, tx_nombre_analista, tx_apellido_analista, tx_cedula_analista, fe_nacimiento_analista, tx_extension_analista, tx_celular_analista, tx_oficina_analista, in_apoyo_subprocesos, in_activo) FROM stdin;
2	5	41	22	GARCIAJBT	JANSEN	GARCIA	12621009	1976-12-25 00:00:00	91-52275	0412-3343397	2024 LAGUNILLAS	0	1
67	1	63	8	TINEOMJ	MARIO	TINEO	15976418	2023-11-28 00:00:00	73834	0412-9173425	ADMINISTRACION APP	1	1
12	5	46	13	CHIRINOSGI	GREIS	CHIRINOS	10208505	1970-02-18 00:00:00	91-36119	0416-2638302	2024 CABIMAS	0	1
9	2	21	15	SANTAMARIAFS	FABIOLA	SANTAMARIA	13164696	2023-11-28 00:00:00	73230	0416-8823389	LIDER	1	1
65	2	63	15	VASQUEZJRH	JOSE	VASQUEZ	10613116	1970-01-19 00:00:00	95-76561	0412-8371154	LIDER	0	1
13	5	25	23	ORTEGAEH	ENDER	ORTEGA	11068375	1976-01-05 00:00:00	91-37764	0416-5672009	2024 CABIMAS	0	1
14	5	46	15	MORLESAJ	ANTONIO	MORLES	10476103	1971-03-19 00:00:00	91-37841	0416-8650677	2024 CABIMAS	0	1
33	1	9	8	FREITESRS	RUBEN	FREITES	14410423	2023-11-28 00:00:00	74113	0412-9487305	ADMINISTRACION APP	1	1
16	5	35	24	AVILAAN	ALEXANDER J	AVILA	13023164	1977-11-02 00:00:00	00000	0416-7652131	2024 CABIMAS	0	1
20	5	25	23	CHIRINOSMG	MORELBA	CHIRINOS	15004867	1982-03-20 00:00:00	91-37748	0426-5645954	2024 CABIMAS	0	1
21	5	52	17	MORGADOL	LEONARDO	MORGADO	12625405	2023-11-28 00:00:00	73554	0412-7315752	LIDER	1	1
24	5	41	22	ROCHEK	KATHIUSKA	ROCHE	23031036	1991-11-07 00:00:00	91-37748	0414-6836080	2024 CABIMAS	0	1
25	5	14	23	DIAZEAV	ELIAN	DIAZ	11457655	1970-11-27 00:00:00	91-37749	0416-6671165	2024 CABIMAS	0	1
27	5	35	24	LOPEZEDM	ENEIBELYN	LOPEZ	20569569	1988-10-26 00:00:00	91-37156	0414-6435991	2024 CABIMAS	0	1
28	5	25	23	NAVARRODY	DANI	NAVARRO	18063537	1985-06-08 00:00:00	91-37841	0426-8000813	2024 CABIMAS	0	1
30	5	46	11	FRANCOMT	MARIA	FRANCO	7856007	1964-06-30 00:00:00	91-68868	0000-0000000	2024 LAGUNILLAS	0	1
31	5	41	22	GODOYLN	LESVI	GODOY	11453377	1971-11-14 00:00:00	91-57708	0416-6611504	2024 CABIMAS	0	1
1	5	25	23	CHIRINOSYS	YRIS	CHIRINOS	11456751	1971-11-07 00:00:00	91-36049	0412-4287127	2024 CABIMAS	0	1
35	5	48	23	SANCHEZDAQ	DAVID	SANCHEZ	17668869	1986-06-14 00:00:00	91-67131	0414-6865473	2024 MARACAIBO	0	1
36	5	41	22	BALLESTEROJ	JHONNY A	BALLESTERO	11946118	1972-08-25 00:00:00	00000	0426-6648582	2024 TAMARE	0	1
39	5	35	24	CASTELLANOJB	JOSE	CASTELLANOS	16848170	1984-11-12 00:00:00	91-37156	0412-6531605	2024 CABIMAS	0	1
41	5	12	23	HURTADODS	DEYLI	HURTADO	15553778	1983-03-03 00:00:00	91-38715	0412-1637422	2024 CABIMAS	0	1
42	5	36	2	MOLINASY	SANDRO	MOLINA	1122334455	2014-03-27 00:00:00	77777			0	2
45	5	64	17	COLINAAK	ANA	COLINA	9738865	1968-06-13 00:00:00	72275	04148165364	2024 MARACAIBO	0	1
46	5	45	12	OTEROY	YSABEL	OTERO	10208445	1971-07-17 00:00:00	91-37874	0426-8654021	2024 CABIMAS	0	1
48	5	46	14	MEDINAYJ	YOLLY	MEDINA	10602068	1970-06-09 00:00:00	91-37781	0414-6567435	2024 CABIMAS	0	1
50	5	25	23	FIGUERARZ	ROSANA ALEJANDRA	FIGUERA	15443416	1980-09-22 00:00:00	91-57229	0412-1637877	2024 TIA JUANA	0	1
52	5	21	18	TERANCR	CANDICE	TERAN	11714069	2023-11-29 00:00:00	72800	0000000000	LIDER	0	1
63	5	21	15	MORALESDS	DARWIN	MORALES	11635319	1974-03-16 00:00:00	95-76372	0412-6064429	LIDER	0	1
64	5	64	18	HENRIQUEZB	BLANCA	HENRIQUEZ	10424123	1972-12-06 00:00:00	91-68706	0414-1666996	2024 MARACAIBO	0	1
\.


--
-- Data for Name: i011t_proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i011t_proveedor (co_proveedor, tx_nombre_proveedor, tx_contacto_proveedor, tx_telefono_proveedor, tx_obs_proveedor, in_activo) FROM stdin;
1	NO APLICA	N/A	N/A	N/A	1
2	ADOBE	AIT	105		1
3	AUTODESK	AIT	105		1
4	BEICIP FRANLAB				1
5	BENTLEY				1
6	ENDEAVOR INFORMATION SYSTEMS				1
7	EXGEO				1
8	HUMMINGBIRD CONNECTIVITY				1
9	IBM				1
10	LANDMARK				1
11	MICROSOFT				1
12	NEURALOG				1
13	OPEN SOURCE COMMUNITY				1
14	ORACLE				1
15	PARADIGM				1
16	PDVSA	AIT/GODD	105/72800		1
17	PETROLEUM EXPERT				1
18	SCHLUMBERGER				1
19	GVSIG.ORG			OBSERVACIÓN	1
20	ADVANCED LOGIC TECHNOLOGY	AIT			1
21	IES				1
22	ESRI	AIT	105	ait	1
\.


--
-- Data for Name: i012t_aplicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i012t_aplicacion (co_aplicacion, co_proveedor, tx_nombre_aplicacion, tx_obs_aplicacion, in_activo) FROM stdin;
1	1	NO APLICA	N/A	1
2	2	ACROBAT READER 7.0	OBS	1
3	3	AUTOCAD 2007	OBS	1
4	3	MAP SERVER 2007	OBS	1
5	3	RASTER DESIGN 2007	OBS	1
6	4	OPENFLOW 2010	OBS	1
7	5	BENTLY VIEW	OBS	1
8	6	VOYAGER	OBS	1
9	7	HAMPSON & RUSSELL 	OBS	1
10	8	FTP	OBS	1
11	9	LOTUS NOTE	OBS	1
12	10	SGDS 1.0	OBS	1
13	10	DIMS ADVANCED PACKAGE 2003	OBS	1
14	10	DISCOVERY GEOGRAPHIX 2007	OBS	1
15	10	GDS 1.0	OBS	1
16	10	OPENVISION 2003	OBS	1
17	10	OPENWORKS 2003	OBS	1
18	10	PETROWORKS 2003	OBS	1
19	10	POSTSTACK 2003	OBS	1
20	10	SEISWORKS 2003	OBS	1
21	10	STRATWORKS 2003	OBS	1
22	10	ZMAPPLUS 2003	OBS	1
23	11	MS WINDOWS XP	OBS	1
24	12	NEURADB 2009	OBS	1
25	12	NEURALOG 2009	OBS	1
26	13	LINUX 2.6	OBS	1
27	14	SOLARIS 9	OBS	1
28	14	SQLPLUS	OBS	1
29	15	FOCUS 5.4	OBS	1
30	15	GEOLOG	OBS	1
31	15	GOCAD 2.5.2	OBS	1
32	15	STRATIMAGIC 3,2	OBS	1
33	15	VOXELGEO 3.0.5	OBS	1
34	16	SARAG 1.0	OBS	1
35	16	SICA 1.0	OBS	1
36	16	SICESMA 1.0	OBS	1
37	16	SICOR 1.0	OBS	1
38	16	SIGEMAP 1.0	OBS	1
39	16	SIMDE 1.0	OBS	1
40	16	SIVAPS 1.0	OBS	1
41	17	MBAL 5	OBS	1
42	11	MS EXCEL 97	OBS	1
43	11	MS POWERPOINT 97	OBS	1
44	11	MS WORD 97	OBS	1
45	18	FINDER 8.5	OBS	1
46	18	FINDER 9	OBS	1
47	18	GEOFRAME 4.2	OBS	1
48	18	GEOFRAME 4.3	OBS	1
49	18	LOGDB 2.0	OBS	1
50	18	OFM 2005	OBS	1
51	18	PETREL 2007	OBS	1
53	19	GV-SIG	OBSERVACIÓN	1
54	16	VIMAP	OBSERVACIONES	1
52	5	MICROSTATION	MANEJO DE MAPAS	1
55	16	SHELL SCRIPT (LINUX/UNIX)	OBS	1
56	18	PROSOURCE BASE	OBS	1
57	18	PROSOURCE SEISMIC	OBS	1
58	15	EPOS 3	OBS	1
59	16	RIPPET	OBS	1
60	16	SDEP	OBS	1
61	20	WELLCAD/CORECAD	OBS	1
62	4	Eztrace		1
63	4	interwell		1
64	21	PETROMOD	OBS	1
65	18	INTERACTIVE PETROPHYSICS		1
66	18	TECHLOG		1
67	22	ARCGIS 		1
68	1	SIG-CGR		1
69	10	OPENWORKS R5000	OPERNWOKS R5K PARA DCG VERSIO 10.6.1	1
70	16	CENTINELA		1
71	16	CENTINELA POZO		1
72	1	BIOMICRO	BIOCRONOLOGIA DE MICROFOSILES	1
73	12	NEURA SCANNER	SOLICITADO POR LUIS PEREZ 161023	1
\.


--
-- Data for Name: i013t_estatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i013t_estatus (co_estatus, tx_nombre_estatus, tx_obs_estatus, in_activo) FROM stdin;
1	PENDIENTE	REQUERIMIENTO PENDIENTE	1
2	CERRADO	REQUERIMIENTO CERRADO	1
\.


--
-- Data for Name: i014t_unidad_medida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i014t_unidad_medida (co_unidad_medida, tx_nombre_medida, in_activo) FROM stdin;
1	APLICACIÓN(ES)	1
2	ARCHIVO(S)	1
3	ARCHIVO(S) DOC	1
4	ARCHIVO(S) PDF	1
5	ARCHIVO(S) PLANO(S)	1
6	ARCHIVO(S) XLS	1
7	ASESORÍA	1
8	BACKUP(S)	1
9	BASE DE DATOS	1
10	CAMPO(S)	1
11	CARPETA(S)	1
12	CARPETAS DE POZOS	1
13	CARTUCHO(S) 3590	1
14	CD(S)	1
15	CHECK SHOT	1
16	CINTA(S)	1
17	COLUMNA ESTATIGRAFICA	1
18	CONTORNO(S)	1
19	CROSSECCION	1
20	CUBO(S) 3D	1
21	CUENTA(S)	1
22	CURVA(S)	1
23	DATOS BÁSICOS	1
24	DATOS GEOQUÍMICOS	1
25	DATOS PETROFISICOS	1
26	DATS	1
27	DEVIACIÓN(ES)	1
28	DIRECTORIO(S)	1
29	DISCO DURO	1
30	DLT	1
31	DOCUMENTO(S)	1
32	DVD(S)	1
33	EMAIL(S)	1
34	ESTACIÓN(ES)	1
35	EXABYTE(S) 8mm	1
36	FALLAS	1
37	FILESYSTEM(S)	1
38	FORMATO(S)	1
39	FULL BACKUP	1
40	HORIZONTE(S)	1
41	IMAGEN(ES)	1
42	INFORME TECNICO CD	1
43	INFORME(S)	1
44	INTERVALO(S) CAÑONEADO(S)	1
45	LEVANTAMIENTO(S) 2D	1
46	LEVANTAMIENTO(S) 3D	1
47	LIBRO(S)	1
48	LICENCIA(S)	1
49	LINEA (S)	1
50	LINEA(S) 2D	1
51	LÍNEA(S) SÍSMICA(S)	1
52	LITOLOGIA	1
53	LTO3	1
54	MAPA(S)	1
55	MARCADOR (ES)	1
56	MONITOR(ES)	1
57	NO APLICA	1
58	NÚCLEO(S)	1
59	PC(S)	1
60	PERFIL(ES)	1
62	POZO(S)	1
63	PRESENTACIÓN(ES)	1
64	PROYECTO(S)	1
65	PROYECTO(S) 2D	1
66	PROYECTO(S) 3D	1
67	PROYECTOR(ES)	1
68	PRUEBA(S)	1
69	REGISTRO(S)	1
70	RESPALDO(S)	1
71	REUNIÓN(ES)	1
72	REVISTA(S)	1
73	SECCION(ES) ESTRATIGRAFICA(S)	1
74	SÍSMICA(S) 2D	1
76	SUMARIO PETROFISICO	1
77	SURVEY 3D	1
78	TABLA(S)	1
80	TESIS	1
81	TESIS (CD)	1
82	TZ	1
83	USUARIO AVANZADO	1
84	USUARIO BÁSICO	1
85	YACIMIENTO(S)	1
86	HOJAS CARTOGRAFICAS	1
87	TALLER(ES)	1
88	TOPE(S)	1
79	TEMPLATE(S)	1
89	ARCHIVO(S) SEG-Y	1
90	ARCHIVO(S) SEG-D	1
91	ARCHIVO(S) ASCII	1
92	SOPORTE(S)	1
93	MESA(S) DE TRABAJO	1
94	ARCHIVO(S) SHF	1
95	EQUIPO(S)	1
96	USUARIO(S)	1
97	SERVIDOR(ES)	1
98	VSP	1
61	POLIGONO(S)	1
75	SÍSMICA(S) 3D	1
\.


--
-- Data for Name: i015t_indicador_gestion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i015t_indicador_gestion (co_indicador_gestion, co_grupo_indicador, tx_nombre_indicador_gestion, tx_obs_indicador_gestion, in_activo) FROM stdin;
1	1	NO APLICA	LA SUBACTIVIDAD NO AFECTA A LOS INDICADORES	1
2	2	B.D. INICIALIZADA Y/O ACTUALIZADA	INICIALIZACIÓN Y/O ACTUALIZACIÓN DE BD DE PROYECTOS	1
3	3	DATOS VERIFICADOS	VALIDACIÓN DE DATOS, ATRIBUTOS DE CALIDAD DEL MODELO DE DATOS	1
4	3	DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS	CARGA, ACTUALIZACIÓN Y/O REINGRESO DE DATOS	1
5	3	DATOS CERTIFICADOS	DATOS QUE PASARON POR EL PROCESO DE VALIDACIÓN Y VERIFICACIÓN Y DEBEN SER CERTIFICADOS	1
6	4	REQUERIMIENTOS SOLICITADOS	SUBACTIVIDADES EJECUTADAS PARA EL PROYECTO	1
8	6	DOCUMENTOS INGRESADOS	DOCUMENTOS DE INGRESO: ALMACENAMIENTO FÍSICO, PUBLICACIÓN DE DOCUMENTOS	1
23	12	MANEJO Y ADMINISTRACIÓN DE BASE DE DATOS (N° DE SERVICIOS)	NUEVO 2014	1
24	13	PRESTAMOS DE DOCUMENTOS EN FÍSICO (N° SERVICIOS)	NUEVO 2014	1
25	14	RECEPCIÓN Y RESGUARDO DE DOCUMENTACIÓN (N° DOCUMENTOS)	NUEVO 2014	1
26	15	SUMINISTRO DE INFORMACIÓN DIGITAL (N° SERVICIOS)	NUEVO 2014	1
7	5	ATENCIÓN AL USUARIO	INFORMACIÓN TÉCNICA Y COLECCIÓN GENERAL: PRESTAMOS, DEVOLUCIONES, ETC	2
9	7	SERVICIOS CONTRATADOS - CONSULTORÍA	CONSULTORÍA ESPECIALIZADA CON PERSONAL CONTRATADO	2
10	7	SERVICIOS CONTRATADOS - ADIESTRAMIENTO	CURSO ESPECIALIZADO CON PERSONAL CONTRATADO	2
11	8	ADIESTRAMIENTO ESFUERZO PROPIO	ADIESTRAMIENTO CON PERSONAL PROPIO	2
12	4	SOPORTE DE APLICACIONES	SOPORTES PRESTADOS EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	2
14	9	ADIESTRAMIENTO CONTRATADO (N° ADIESTRAMIENTOS)	NUEVO 2014	2
15	10	ADIESTRAMIENTO ESFUERZO PROPIO (N° ADIESTRAMIENTOS)	NUEVO 2014	2
16	11	APLICACIONES ESPECIALIZADAS (N° SOPORTES)	NUEVO 2014	2
27	16	ELABORACIÓN DEL PLAN DE CAPACITACIÓN	ELABORACIÓN DEL PLAN DE CAPACITACIÓN	1
28	16	GESTIÓN PARA LA EJECUCIÓN DE LA CAPACITACIÓN POR ESFUERZO PROPIO	GESTIÓN PARA LA EJECUCIÓN DE LA CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES EN EL AMBIENTE ESPECIALIZADO POR ESFUERZO PROPIO	1
29	16	GESTIÓN PARA LA EJECUCIÓN DE LA CAPACITACIÓN POR SERVICIOS CONTRATADOS	GESTIÓN PARA LA EJECUCIÓN DE LA CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES EN EL AMBIENTE ESPECIALIZADO POR SERVICIOS CONTRATADOS	1
31	16	ELABORACIÓN DE ODS	ELABORACIÓN DE ODS PARA LA CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES EN EL AMBIENTE ESPECIALIZADO A TRAVÉS DE SERVICIOS CONTRATADOS	1
30	16	EVALUACIÓN DE RESULTADOS DE ENCUESTAS - CU	EVALUACIÓN DE RESULTADOS DE ENCUESTAS DE SATISFACCIÓN AL USUARIO POR CAPACITACIÓN	1
32	16	PROMOVER Y/O COORDINAR EVENTOSDE DIVULGACIÓN DEL AE	PROMOVER Y/O COORDINAR EVENTOS TÉCNICOS DE DIVULGACIÓN DE LOS FLUJOS DE TRABAJOS DE APLICACIONES EN EL AMBIENTE ESPECIALIZADO	1
34	16	ASESORÍA EN EL USO Y MANEJO DE AE	ASESORÍA EN EL USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	1
33	16	CONTROL Y SEGUIMIENTO DE ODS	CONTROL Y SEGUIMIENTO DE ODS PARA LA CAPACITACIÓN EN EL USO Y MANEJO DE APLICACIONES EN EL AMBIENTE ESPECIALIZADO A TRAVÉS DE SERVICIOS CONTRATADOS	1
35	16	ACTUALIZACIÓN DE PROYECTOS A NUEVA VERSIÓN DE AE	ACTUALIZACIÓN DE PROYECTOS A NUEVA VERSIÓN DE APLICACIÓN ESPECIALIZADA	1
37	16	DOCUMENTACIÓN DE FLUJOS DE TRABAJOS	DOCUMENTACIÓN DE FLUJOS DE TRABAJOS EN APLICACIONES ESPECIALIZADAS	1
36	16	MIGRACIÓN DE PROYECTOS DE UNA AE A OTRA AE	MIGRACIÓN DE PROYECTOS DE UNA APLICACIÓN ESPECIALIZADA A OTRA APLICACIÓN ESPECIALIZADA	1
39	16	GENERACIÓN DEL NUEVO FLUJO DE TRABAJO EN AE CON ESFUERZO PROPIO	GENERACIÓN DEL NUEVO FLUJO DE TRABAJO EN APLICACIONES ESPECIALIZADAS CON ESFUERZO PROPIO	1
38	16	EVALUACIÓN DE RESULTADOS DE ENCUESTAS - UMAE	EVALUACIÓN DE RESULTADOS DE ENCUESTAS DE SATISFACCIÓN DEL USUARIO POR USO Y MANEJO DE APLICACIONES ESPECIALIZADAS	1
40	16	GENERACIÓN DEL NUEVO FLUJO DE TRABAJO EN AE CON ESFUERZO CONTRATADO	GENERACIÓN DEL NUEVO FLUJO DE TRABAJO EN APLICACIONES ESPECIALIZADAS CON ESFUERZO CONTRATADO	1
44	16	RESPALDO DE PROYECTOS DE INTERPRETACIÓN	RESPALDO DE PROYECTOS DE INTERPRETACIÓN	1
41	16	CREACIÓN DE PROYECTOS DE INTERPRETACIÓN	CREACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
43	16	AMBIENTE DE CUENTA Y ACCESO A PROYECTOS DE INTERPRETACIÓN	AMBIENTE DE CUENTA Y ACCESO A PROYECTOS DE INTERPRETACIÓN	1
42	16	INVENTARIO DE PROYECTOS DE INTERPRETACIÓN	INVENTARIO DE PROYECTOS DE INTERPRETACIÓN	1
45	16	RESTAURACIÓN DE PROYECTOS DE INTERPRETACIÓN	RESTAURACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
47	16	EVALUACIÓN DE FLUJOS DE TRABAJO Y NUEVAS FUNCIONALIDADES EN AE	EVALUACIÓN DE FLUJOS DE TRABAJO Y NUEVAS FUNCIONALIDADES EN APLICACIONES ESPECIALIZADAS	1
46	16	DESINCORPORACIÓN DE PROYECTOS DE INTERPRETACIÓN	DESINCORPORACIÓN DE PROYECTOS DE INTERPRETACIÓN	1
48	16	EVALUACIÓN DE RESULTADOS DE ENCUESTAS - SPE	EVALUACIÓN DE RESULTADOS DE ENCUESTAS DE SATISFACCIÓN DEL USUARIO POR SOPORTE A PROYECTO Y ESTUDIO	1
49	6	RESGUARDO EN BD DOCUMENTAL (SIGEIN-SIMDE-VISDOC INVENTORY)	RESGUARDO EN BD DOCUMENTAL (SIGEIN-SIMDE-VISDOC INVENTORY)	1
50	6	manejo y administracion de datos 	manejo y administracion de datos \nactualizacion ABRIL 2022	1
51	17	MEMORIA CORPORATIVA	MEMORIA CORPORATIVA\nactualizacion ABRIL 2022	1
52	16	GENERACION DE REPORTES DE INCIDENTES	ABRIL 2022	1
53	16	GENERACION DE DOCUMENTO	ABRIL 2022	1
\.


--
-- Data for Name: i016t_dato_matriz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i016t_dato_matriz (co_dato_matriz, co_grupo_matriz, tx_nombre_dato_matriz, tx_obs_dato_matriz, in_activo) FROM stdin;
1	1	NO APLICA	LA SUBACTIVIDAD NO AFECTA A LA MATRIZ DE DATOS	1
2	2	CARPETA DE POZOS	OBSERVACION	1
3	2	REGISTRO DE POZOS	OBSERVACION	1
4	2	COLECCIÓN GENERAL	OBSERVACION	1
5	2	DATOS SÍSMICOS 2D Y 3D	OBSERVACION	2
6	3	RASTERIZACIÓN	OBSERVACION	1
7	3	CAMBIO DE FORMATO	OBSERVACION	1
8	3	DOCUMENTOS INGRESADOS	OBSERVACION	1
9	3	RECEPCIÓN SÍSMICA 2D Y 3D	OBSERVACION	2
10	4	POZOS CARGADOS	OBSERVACION	1
11	4	DATOS GENERADOS	OBSERVACION	1
12	4	DESVIACIONES	OBSERVACION	1
13	4	PERFILES EDITADOS	OBSERVACION	1
14	4	INTERVALOS CAÑONEADOS	OBSERVACION	1
15	4	INTERVALOS EVALUADOS	OBSERVACION	1
16	4	ESTATIGRAFÍA	OBSERVACION	1
17	4	PRUEBAS DE PRESIÓN	OBSERVACION	1
18	5	PERFILES ORIGINALES	OBSERVACION	1
19	6	POZOS PERFORADOS	OBSERVACION	1
20	7	DATOS DE PRODUCCIÓN	OBSERVACION	1
21	8	DATOS GEOQUÍMICOS	OBSERVACION	2
22	9	POZOS	OBSERVACION	1
23	9	PERFILES	OBSERVACION	1
24	9	ESTATIGRAFÍA	OBSERVACION	1
25	9	DESVIACIONES	OBSERVACION	1
26	9	NÚCLEO	OBSERVACION	1
27	9	REGISTRO SÍSMICO DE POZO	OBSERVACION	1
28	10	SISMICA 2D (Km)	OBSERVACION	1
29	10	SÍSMICA 3D (Km2)	OBSERVACION	1
30	10	HORIZONTE	OBSERVACION	1
31	10	FALLA	OBSERVACION	1
32	11	SOPORTE AL FLUJO DE TRABAJO	MATRIZ SFT 2017	1
33	3	MANEJO Y ADMINISTRACION DE DATOS	MANEJO Y ADMINISTRACION DE DATOS	1
34	12	MEMORIA CORPORATIVA		1
\.


--
-- Data for Name: i017t_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i017t_division (co_division, tx_nombre_division, tx_obs_division, in_activo) FROM stdin;
9	AYACUCHO	AYACUCHO	1
10	BOYACA	BOYACA	1
11	CARABOBO	CARABOBO	1
12	COSTA AFUERA	COSTA AFUERA	1
13	COSTA OCCIDENTAL DEL LAGO	COSTA OCCIDENTAL DEL LAGO	1
14	COSTA ORIENTAL DEL LAGO	COSTA ORIENTAL DEL LAGO	1
15	FURRIAL	FURRIAL	1
16	GAS ORIENTE	GAS ORIENTE	1
17	JUNIN	JUNIN	1
18	LAGO	LAGO	1
19	PUNTA DE MATA	PUNTA DE MATA	1
20	SUR DEL LAGO-TRUJILLO	SUR DEL LAGO-TRUJILLO	1
21	NO APLICA	NO APLUCA	1
\.


--
-- Data for Name: i018t_perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i018t_perfil (co_perfil, tx_nombre_perfil, tx_obs_perfil, in_activo) FROM stdin;
1	ADMINISTRACIÓN	ADMINISTRA EL SISTEMA. TIENE ACCESO A TODAS LAS FUNCIONALIDADES.	1
3	LIDER	ACCESO A TODOS LOS REPORTE Y A LA GESTION DE LOS INDICADORES. Y TIENE ACCESO AL CONTROL DE USUARIOS	1
2	ADMIN_LOCAL	LIDER Y PPyG	1
4	PPyG	PPyG	1
5	ANALISTA	CARGA DE REQUERIMIENTOS Y USUARIOS DE LAS UNIDADES DE NEGOCIO.	1
\.


--
-- Data for Name: i019t_tipo_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i019t_tipo_proyecto (co_tipo_proyecto, co_unidad_negocio, tx_nombre_tipo_proyecto, tx_alias_tipo_proyecto, tx_obs_tipo_proyecto, in_activo) FROM stdin;
1	1	ADQUISICIÓN SÍSMICA	ADQ	ADQUISICIÓN SÍSMICA	2
2	1	PROCESAMIENTO SÍSMICO	PROC	PROCESAMIENTO SÍSMICO	2
3	1	REPROCESAMIENTO SÍSMICO	REPROC	REPROCESAMIENTO SÍSMICO	2
4	1	EVALUACIÓN DE SISTEMAS PETROLÍFEROS	ESP	EVALUACIÓN DE SISTEMAS PETROLÍFEROS	2
5	1	PROYECTO DE GENERACIÓN DE OPORTUNIDADES	PGO	PROYECTO DE GENERACIÓN DE OPORTUNIDADES	2
6	1	PROYECTO DE GENERACIÓN DE PROSPECTOS	PGP	PROYECTO DE GENERACIÓN DE PROSPECTOS	2
7	1	PROYECTO DE EXPLORATORIO PERFORACIÓN / DE DELINIEACIÓN	PEP/PDD	PROYECTO DE EXPLORATORIO PERFORACIÓN / DE DELINIEACIÓN	2
8	1	PROYECTO DE REXPLORACIÓN	REEXP	PROYECTO DE REXPLORACIÓN	2
9	1	PROYECTO EXPLORATORIO INTERNACIONAL	PEINTER	PROYECTO EXPLORATORIO INTERNACIONAL	2
10	1	POZO EXPLORATORIO	PEXP	POZO EXPLORATORIO	2
11	1	PROYECTO LABORATORIOS Y NUCLEOTECAS	PLN	PROYECTO LABORATORIOS Y NUCLEOTECAS	2
12	1	CONOCIMIENTO EXPLORATORIO	CEXP	CONOCIMIENTO EXPLORATORIO	2
13	1	BASE DE RECURSOS	BR	BASE DE RECURSOS	2
15	3	PROYECTO GAS	PGAS	GAS	2
19	1	PROYECTO GODD	PGODD	PROYECTO PROPIO GODD	2
22	1	CARTOGRAFÍA Y SIG	CARTSIG	CARTOGRAFÍA Y SIG	2
23	1	DATOS GEOESPACIALES	DATGEO	DATOS GEOESPACIALES	2
24	1	SENSORES REMOTOS	SENSREMOT	SENSORES REMOTOS	2
25	6	PROYECTO PDVSA SERVICIOS	PPS	OBS	2
26	9	AUSENCIAS	AUSENCIAS		2
27	1	PROYECTO ESPECIAL	PROYESP	PROYECTO ESPECIAL	2
28	13	BND	BND	BND 2017	1
29	12	EEIIYY	EEIIYY	EEIIYY 2017	1
17	5	EMPRESAS MIXTAS	EEMM 	EEMM 2017	1
14	2	PRODUCCIÓN	PPROD	PRD 2017	1
20	7	INTEVEP	ITV	INTEVEP 2017	1
30	1	EXPLORACIÓN	EXP	EXP 2017	1
18	8	MENPET	MENPET	MENPET 2017	1
16	4	CVP	PCVP	CVP	1
31	15	DATAPACK	DATAPACK		1
32	7	PROCESADOS 	PROCESADOS		1
33	16	MPPP	MPPP	MPPP 2023	1
34	69	NO APLICA	NO APLICA		1
\.


--
-- Data for Name: i020t_proceso_servicio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i020t_proceso_servicio (co_proceso_servicio, co_proceso, co_servicio, in_activo) FROM stdin;
13	4	10	1
21	1	28	1
1	2	1	0
11	2	10	0
2	2	2	0
18	2	25	1
32	2	44	1
33	2	23	1
20	2	27	1
34	2	42	1
35	2	45	1
36	2	22	1
37	2	24	1
19	2	26	1
38	2	38	1
12	3	10	0
9	3	9	0
14	3	11	0
15	3	13	0
17	3	15	0
16	3	14	0
27	3	19	1
26	3	18	1
28	3	20	1
29	3	21	1
39	3	37	1
40	3	38	1
41	3	40	1
42	3	41	1
30	1	53	1
43	1	52	1
44	1	54	1
45	1	55	1
46	1	56	1
47	1	57	1
48	3	59	1
49	2	46	1
\.


--
-- Data for Name: i021t_medida_subactividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i021t_medida_subactividad (co_medida_subactividad, co_unidad_medida, co_subactividad, in_activo) FROM stdin;
\.


--
-- Data for Name: i022t_grupo_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i022t_grupo_proyecto (co_grupo_proyecto, tx_nombre_grupo_proyecto, tx_obs_grupo_proyecto, in_activo) FROM stdin;
2	EXPLORATORIOS Y DE DELINEACIÓN	OBSERVACIÓN	2
3	GEOFÍSICA Y GEODESIA	OBSERVACIÓN	2
4	OPERACIONES EXPLORATORIAS DE ORIENTE	OBSERVACIÓN	2
5	LABORATORIOS Y NUCLEOTECAS	OBSERVACIÓN	2
6	PRODUCCIÓN (EE II ORIENTE)	OBSERVACIÓN	2
7	PRODUCCIÓN (EE II FAJA)	OBSERVACIÓN	2
8	GAS (EE II ANACO)	OBSERVACIÓN	2
9	GAS (EE II SAN TOME)	OBSERVACIÓN	2
10	COSTA AFUERA EXPLORACIÓN	OBSERVACIÓN	2
11	COSTA AFUERA PRODUCCIÓN	OBSERVACIÓN	2
12	CVP	OBSERVACIÓN	2
13	CONOCIMIENTOS EXPLORATORIOS INTERNACIONALES	OBSERVACIÓN	2
14	PDVSA SERVICIOS	OBSERVACIÓN	2
15	BASE DE RECURSO	OBSERVACIÓN	2
17	GODD EXPLORACIÓN ORIENTE	OBSERVACIÓN	2
18	GODD EXPLORACIÓN CENTRO SUR	O	2
19	GODD EXPLORACIÓN OCCIDENTE	O	2
20	GODD PRODUCCIÓN CENTRO SUR	O	2
21	GODD PRODUCCIÓN OCCIDENTE	O	2
22	GODD PRODUCCIÓN ORIENTE	O	2
23	GAS (RESERVAS)	OBS	2
27	OTRAS ORGANIZACIONES	NUEVO 2014	2
28	PROYECTOS DE EXPLORACIÓN NACIONAL	NUEVO 2014	2
29	PROYECTOS EXPLORACIÓN INTERNACIONAL	NUEVO 2014	2
24	MENPET	MENPET 2017	1
25	INTEVEP	INTEVEP 2017	1
16	EMPRESAS MIXTAS	EEMM 2017	1
30	BND	BND 2017	1
31	PRODUCCIÓN	PRD 2017	1
32	EXPLORACIÓN	EXP 2017	1
26	EEIIYY	EEIIYY 2017	1
1	NO APLICA	OBSERVACIÓN	1
\.


--
-- Data for Name: i025t_grupo_matriz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i025t_grupo_matriz (co_grupo_matriz, tx_nombre_grupo_matriz, tx_obs_grupo_matriz, in_activo) FROM stdin;
1	NO APLICA	OBSERVACION	1
2	BD OPERACIONALES - ACCESO A LA INFORMACIÓN (PRESTAMOS Y/O DEVOLUCIÓN)	OBSERVACION	1
3	BD OPERACIONALES - MANEJO Y PRESERVACIÓN DE LA INFORMACIÓN	OBSERVACION	1
4	BD OPERACIONALES - DATOS GENERALES DE POZOS	OBSERVACION	1
5	BD OPERACIONALES - PERFILES ORIGINALES	OBSERVACION	1
6	BD OPERACIONALES - POZOS PERFORADOS	OBSERVACION	1
7	BD OPERACIONALES - DATOS DE PRODUCCIÓN	OBSERVACION	1
8	BD OPERACIONALES - DATOS GEOQUÍMICOS	OBSERVACION	2
9	BD PROYECTOS - DATOS DE POZOS	OBSERVACION	1
10	BD PROYECTOS - SÍSMICA	OBSERVACION	1
11	SOPORTE AL FLUJO DE TRABAJO	GRUPO SPF 2017	1
12	MEMORIA CORPORATIVA	ABRIL 2022	1
\.


--
-- Data for Name: i026t_grupo_indicador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.i026t_grupo_indicador (co_grupo_indicador, tx_nombre_grupo_indicador, tx_obs_grupo_indicador, in_activo) FROM stdin;
1	NO APLICA	OBSERVACION	1
2	BASE DE DATOS DE PROYECTOS	OBSERVACION	1
3	DATOS CARGADOS, ACTUALIZADOS, VERIFICADOS, REINGRESADOS Y/O CERTIFICADOS	OBSERVACION	1
4	ATENCIÓN DE REQUERIMIENTOS	OBSERVACION	1
5	ACCESO A LA INFORMACIÓN	OBSERVACION	1
6	MANEJO Y PRESERVACIÓN DE LA INFORMACIÓN	OBSERVACION	1
11	APLICACIONES ESPECIALIZADAS (N° DE SOPORTES)	NUEVO 2014	2
9	ADIESTRAMIENTO CONTRATADO (N° ADIESTRAMIENTOS)	NUEVO 2014	2
12	MANEJO Y ADMINISTRACIÓN DE BASE DE DATOS (N° DE SERVICIOS)	NUEVO 2014	1
13	PRESTAMOS DE DOCUMENTOS EN FÍSICO (N° SERVICIOS)	NUEVO 2014	1
14	RECEPCIÓN Y RESGUARDO DE DOCUMENTACIÓN (N° DOCUMENTOS)	NUEVO 2014	1
15	SUMINISTRO DE INFORMACIÓN DIGITAL (N° SERVICIOS)	NUEVO 2014	1
10	ADIESTRAMIENTO ESFUERZO PROPIO (N° ADIESTRAMIENTOS)	NUEVO 2014	2
7	CAPACITACIÓN CONTRATADA	OBSERVACION	2
8	ADIESTRAMIENTO ESFUERZO PROPIO	OBSERVACION	2
16	SOPORTE AL FLUJO DE TRABAJO	GRUPO SFT 2017	1
17	MEMORIA CORPORATIVA	MEMORIA CORPORATIVA\nACTUALIZACION 2022	1
\.


--
-- Name: c001s_co_requerimiento; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.c001s_co_requerimiento', 23840, true);


--
-- Name: i001s_co_unidad_negocio; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i001s_co_unidad_negocio', 71, true);


--
-- Name: i002s_co_gerencia; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i002s_co_gerencia', 123, true);


--
-- Name: i003s_co_proyecto; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i003s_co_proyecto', 454, true);


--
-- Name: i004s_co_usuario; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i004s_co_usuario', 1249, true);


--
-- Name: i005s_co_proceso; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i005s_co_proceso', 8, true);


--
-- Name: i006s_co_subproceso; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i006s_co_subproceso', 24, true);


--
-- Name: i007s_co_servicio; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i007s_co_servicio', 59, true);


--
-- Name: i008s_co_actividad; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i008s_co_actividad', 147, true);


--
-- Name: i009s_co_subactividad; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i009s_co_subactividad', 759, true);


--
-- Name: i010s_co_analista; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i010s_co_analista', 67, true);


--
-- Name: i011s_co_proveedor; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i011s_co_proveedor', 22, true);


--
-- Name: i012s_co_aplicacion; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i012s_co_aplicacion', 73, true);


--
-- Name: i013s_co_estatus; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i013s_co_estatus', 2, true);


--
-- Name: i014s_co_unidad_medida; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i014s_co_unidad_medida', 98, true);


--
-- Name: i015s_co_indicador_gestion; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i015s_co_indicador_gestion', 53, true);


--
-- Name: i016s_co_dato_matriz; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i016s_co_dato_matriz', 34, true);


--
-- Name: i017s_co_division; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i017s_co_division', 20, true);


--
-- Name: i018s_co_perfil; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i018s_co_perfil', 3, true);


--
-- Name: i019s_co_tipo_proyecto; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i019s_co_tipo_proyecto', 34, true);


--
-- Name: i020s_co_proceso_servicio; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i020s_co_proceso_servicio', 49, true);


--
-- Name: i021s_co_medida_subactividad; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i021s_co_medida_subactividad', 594, true);


--
-- Name: i022s_co_grupo_proyecto; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i022s_co_grupo_proyecto', 36, true);


--
-- Name: i025s_co_grupo_matriz; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i025s_co_grupo_matriz', 12, true);


--
-- Name: i026s_co_grupo_indicador; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.i026s_co_grupo_indicador', 17, true);


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
-- Name: i003t_proyecto i003t_proyecto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i003t_proyecto
    ADD CONSTRAINT i003t_proyecto_pkey PRIMARY KEY (co_proyecto);


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

