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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: i002t_gerencia i002fk_i001t_unidad_negocio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.i002t_gerencia
    ADD CONSTRAINT i002fk_i001t_unidad_negocio FOREIGN KEY (co_unidad_negocio) REFERENCES public.i001t_unidad_negocio(co_unidad_negocio) ON UPDATE RESTRICT ON DELETE RESTRICT;


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
-- PostgreSQL database dump complete
--

