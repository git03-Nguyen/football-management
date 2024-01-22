--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-22 13:51:56

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
-- TOC entry 216 (class 1259 OID 26414)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(320) NOT NULL,
    password character varying NOT NULL,
    fullname character varying(50) DEFAULT 'Người dùng hệ thống'::character varying,
    avatar character varying(100) DEFAULT 'avt-default.png'::character varying,
    birthday date,
    phone character varying(11),
    introduction character varying(300),
    privilege integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26413)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- TOC entry 220 (class 1259 OID 34620)
-- Name: formats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formats (
    id integer NOT NULL,
    type character varying DEFAULT 'Đá vòng tròn'::character varying NOT NULL
);


ALTER TABLE public.formats OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34619)
-- Name: formats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.formats ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.formats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 42905)
-- Name: match_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match_events (
    id integer NOT NULL,
    player_id integer,
    match_id integer NOT NULL,
    type character varying(30) NOT NULL,
    "time" character varying(10) DEFAULT '00p00s'::character varying,
    team_id integer
);


ALTER TABLE public.match_events OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 42904)
-- Name: match_events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.match_events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.match_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 42826)
-- Name: matches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matches (
    id integer NOT NULL,
    team_id_1 integer,
    team_id_2 integer,
    tournament_id integer NOT NULL,
    date date,
    round integer,
    place character varying(100),
    require_tickets boolean DEFAULT false,
    views integer DEFAULT 0,
    scores_1 integer DEFAULT 0,
    scores_2 integer DEFAULT 0,
    winner_id integer,
    is_played boolean DEFAULT false,
    is_finished boolean DEFAULT false,
    "time" time without time zone
);


ALTER TABLE public.matches OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 42825)
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.matches ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 42807)
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    number integer,
    birthyear integer,
    positions character varying(30),
    phone character varying(12),
    team_id integer
);


ALTER TABLE public.players OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 42806)
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.players ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 34635)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    tournament_id integer NOT NULL,
    owner_id integer NOT NULL,
    contact_name character varying(50) NOT NULL,
    contact_email character varying(300) NOT NULL,
    contact_phone character varying(12) NOT NULL,
    level character varying(15) NOT NULL,
    introduction text,
    has_uniform boolean DEFAULT false NOT NULL,
    profile text,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34634)
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.teams ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 42863)
-- Name: teams_statistics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams_statistics (
    team_id integer NOT NULL,
    wins integer DEFAULT 0,
    draws integer DEFAULT 0,
    losses integer DEFAULT 0,
    played integer DEFAULT 0,
    score integer DEFAULT 0,
    goals integer DEFAULT 0,
    a_goals integer DEFAULT 0,
    red_cards integer DEFAULT 0,
    yellow_cards integer DEFAULT 0,
    own_goals integer DEFAULT 0
);


ALTER TABLE public.teams_statistics OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 34601)
-- Name: tournaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tournaments (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    time_start date,
    time_end date,
    place character varying(200),
    map_url text,
    rules_url text,
    n_of_followers integer DEFAULT 0 NOT NULL,
    is_closed boolean DEFAULT false,
    format_id integer,
    max_teams integer DEFAULT 0,
    n_of_players integer DEFAULT 5,
    require_tickets boolean DEFAULT false
);


ALTER TABLE public.tournaments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 34600)
-- Name: tournament_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tournaments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tournament_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- TOC entry 4884 (class 0 OID 34620)
-- Dependencies: 220
-- Data for Name: formats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (1, 'Đá vòng tròn');
INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (2, 'Loại trực tiếp');
INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (3, 'Chia bảng đấu');


--
-- TOC entry 4893 (class 0 OID 42905)
-- Dependencies: 229
-- Data for Name: match_events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4890 (class 0 OID 42826)
-- Dependencies: 226
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4888 (class 0 OID 42807)
-- Dependencies: 224
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4886 (class 0 OID 34635)
-- Dependencies: 222
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4891 (class 0 OID 42863)
-- Dependencies: 227
-- Data for Name: teams_statistics; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4882 (class 0 OID 34601)
-- Dependencies: 218
-- Data for Name: tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4880 (class 0 OID 26414)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (2, 'admin@admin.com', '$2b$10$F0bKh3vD8URyJrTqXNA0MuaBEHTy2RC5UyK2jtBbnpLf/Nyfle8jS', 'BTC Giải đấu', 'avt-default.png', '2003-05-19', '0357031330', 'Đây là tài khoản BTC.', 1);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 215
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 219
-- Name: formats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formats_id_seq', 1, true);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 228
-- Name: match_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_events_id_seq', 1, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 225
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matches_id_seq', 1, true);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 223
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.players_id_seq', 1, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 221
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 1, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 217
-- Name: tournament_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tournament_id_seq', 1, true);


--
-- TOC entry 4699 (class 2606 OID 26424)
-- Name: users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 4701 (class 2606 OID 26422)
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 34625)
-- Name: formats formats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formats
    ADD CONSTRAINT formats_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 42910)
-- Name: match_events match_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 42928)
-- Name: match_events match_events_type_check; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.match_events
    ADD CONSTRAINT match_events_type_check CHECK (((type)::text = ANY ((ARRAY['start'::character varying, 'end'::character varying, 'goal'::character varying, 'own_goal'::character varying, 'red_card'::character varying, 'yellow_card'::character varying])::text[]))) NOT VALID;


--
-- TOC entry 4711 (class 2606 OID 42834)
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 42811)
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 42871)
-- Name: teams_statistics teams_in_tournament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_statistics
    ADD CONSTRAINT teams_in_tournament_pkey PRIMARY KEY (team_id);


--
-- TOC entry 4707 (class 2606 OID 34643)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 34608)
-- Name: tournaments tournament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournament_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2620 OID 42963)
-- Name: teams trigger_delete_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_delete_teams_statistics AFTER UPDATE OF status ON public.teams FOR EACH ROW EXECUTE FUNCTION public.delete_teams_statistics_on_status_change();


--
-- TOC entry 4728 (class 2620 OID 42940)
-- Name: teams trigger_insert_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_insert_teams_statistics AFTER UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.insert_teams_statistics_on_status_change();


--
-- TOC entry 4733 (class 2620 OID 42957)
-- Name: match_events trigger_update_a_goals_on_goal; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_a_goals_on_goal AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_a_goals_on_goal();


--
-- TOC entry 4734 (class 2620 OID 42912)
-- Name: match_events trigger_update_match_scores; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_match_scores AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_match_scores();


--
-- TOC entry 4732 (class 2620 OID 42959)
-- Name: teams_statistics trigger_update_score_on_results_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_score_on_results_change AFTER UPDATE OF wins, draws, losses ON public.teams_statistics FOR EACH ROW EXECUTE FUNCTION public.update_score_on_results_change();


--
-- TOC entry 4729 (class 2620 OID 42930)
-- Name: matches trigger_update_teams_played; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_played AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_teams_played();


--
-- TOC entry 4730 (class 2620 OID 42932)
-- Name: matches trigger_update_teams_results; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_results AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_teams_results();


--
-- TOC entry 4735 (class 2620 OID 42936)
-- Name: match_events trigger_update_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_statistics AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_teams_statistics();


--
-- TOC entry 4731 (class 2620 OID 42961)
-- Name: matches trigger_update_winner_on_scores_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_winner_on_scores_change AFTER UPDATE OF scores_1, scores_2 ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_winner_on_scores_change();


--
-- TOC entry 4725 (class 2606 OID 42951)
-- Name: match_events match_events_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id) NOT VALID;


--
-- TOC entry 4726 (class 2606 OID 42946)
-- Name: match_events match_events_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id) NOT VALID;


--
-- TOC entry 4720 (class 2606 OID 42835)
-- Name: matches matches_team_id_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team_id_1_fkey FOREIGN KEY (team_id_1) REFERENCES public.teams(id) NOT VALID;


--
-- TOC entry 4721 (class 2606 OID 42840)
-- Name: matches matches_team_id_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team_id_2_fkey FOREIGN KEY (team_id_2) REFERENCES public.teams(id) NOT VALID;


--
-- TOC entry 4722 (class 2606 OID 42845)
-- Name: matches matches_tournament_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES public.tournaments(id) NOT VALID;


--
-- TOC entry 4723 (class 2606 OID 42850)
-- Name: matches matches_winner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_winner_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(id) NOT VALID;


--
-- TOC entry 4719 (class 2606 OID 42812)
-- Name: players players_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) NOT VALID;


--
-- TOC entry 4724 (class 2606 OID 42872)
-- Name: teams_statistics teams_in_tournament_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_statistics
    ADD CONSTRAINT teams_in_tournament_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 4717 (class 2606 OID 42913)
-- Name: teams teams_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 4718 (class 2606 OID 42801)
-- Name: teams teams_tournament_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES public.tournaments(id) NOT VALID;


--
-- TOC entry 4716 (class 2606 OID 42795)
-- Name: tournaments tournaments_format_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournaments_format_id_fkey FOREIGN KEY (format_id) REFERENCES public.formats(id) NOT VALID;


-- Completed on 2024-01-22 13:51:56

--
-- PostgreSQL database dump complete
--

