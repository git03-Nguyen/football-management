CREATE DATABASE "DB_FootballTournament";
ALTER DATABASE "DB_FootballTournament" OWNER TO postgres;

--
-- Name: delete_teams_statistics_on_status_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_teams_statistics_on_status_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF OLD.status = true AND NEW.status = false THEN
        DELETE FROM teams_statistics WHERE team_id = OLD.id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.delete_teams_statistics_on_status_change() OWNER TO postgres;

--
-- Name: insert_teams_statistics_on_status_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_teams_statistics_on_status_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.status = true AND OLD.status = false THEN
        INSERT INTO teams_statistics (team_id)
        VALUES (NEW.id);
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.insert_teams_statistics_on_status_change() OWNER TO postgres;

--
-- Name: update_a_goals_on_goal(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_a_goals_on_goal() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.type = 'goal' THEN
        -- Find the team that the player belongs to in the match
        DECLARE
            team_conceded INT;
        BEGIN
            SELECT
                CASE
                    WHEN NEW.team_id = M.team_id_1 THEN M.team_id_2
                    WHEN NEW.team_id = M.team_id_2 THEN M.team_id_1
                    ELSE NULL
                END
            INTO team_conceded
            FROM matches M
            WHERE M.id = NEW.match_id;

            -- Update a_goals for the team that conceded the goal
            IF team_conceded IS NOT NULL THEN
                UPDATE teams_statistics
                SET a_goals = a_goals + 1
                WHERE team_id = team_conceded;
            END IF;
        END;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_a_goals_on_goal() OWNER TO postgres;

--
-- Name: update_match_scores(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_match_scores() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.type = 'goal' THEN
        UPDATE matches
        SET
            scores_1 = scores_1 + 1
        WHERE
            id = NEW.match_id
            AND NEW.player_id IN (SELECT id FROM players WHERE team_id = matches.team_id_1);

        UPDATE matches
        SET
            scores_2 = scores_2 + 1
        WHERE
            id = NEW.match_id
            AND NEW.player_id IN (SELECT id FROM players WHERE team_id = matches.team_id_2);
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_match_scores() OWNER TO postgres;

--
-- Name: update_score_on_results_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_score_on_results_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE teams_statistics
    SET score = (NEW.wins * 3) + NEW.draws
	WHERE team_id = NEW.team_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_score_on_results_change() OWNER TO postgres;

--
-- Name: update_teams_played(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_teams_played() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.is_played = true AND OLD.is_played = false THEN
        UPDATE teams_statistics
        SET played = played + 1
        WHERE team_id = NEW.team_id_1 OR team_id = NEW.team_id_2;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_teams_played() OWNER TO postgres;

--
-- Name: update_teams_results(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_teams_results() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.is_finished = true AND OLD.is_finished = false THEN
        IF NEW.scores_1 > NEW.scores_2 THEN
            UPDATE teams_statistics
            SET wins = wins + 1
            WHERE team_id = NEW.team_id_1;
            UPDATE teams_statistics
            SET losses = losses + 1
            WHERE team_id = NEW.team_id_2;
        ELSIF NEW.scores_1 < NEW.scores_2 THEN
            UPDATE teams_statistics
            SET wins = wins + 1
            WHERE team_id = NEW.team_id_2;
            UPDATE teams_statistics
            SET losses = losses + 1
            WHERE team_id = NEW.team_id_1;
        ELSE
            UPDATE teams_statistics
            SET draws = draws + 1
            WHERE team_id = NEW.team_id_1 OR team_id = NEW.team_id_2;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_teams_results() OWNER TO postgres;

--
-- Name: update_teams_statistics(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_teams_statistics() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.type = 'goal' THEN
        -- Update goals for the team scoring the goal
        UPDATE teams_statistics
        SET goals = goals + 1
        WHERE team_id = (SELECT team_id FROM players WHERE id = NEW.player_id);

    ELSIF NEW.type = 'red_card' THEN
        -- Update red cards for the team receiving the red card
        UPDATE teams_statistics
        SET red_cards = red_cards + 1
        WHERE team_id = (SELECT team_id FROM players WHERE id = NEW.player_id);

    ELSIF NEW.type = 'yellow_card' THEN
        -- Update yellow cards for the team receiving the yellow card
        UPDATE teams_statistics
        SET yellow_cards = yellow_cards + 1
        WHERE team_id = (SELECT team_id FROM players WHERE id = NEW.player_id);

    ELSIF NEW.type = 'own_goal' THEN
        -- Update own goals for the team scoring the own goal
        UPDATE teams_statistics
        SET own_goals = own_goals + 1
        WHERE team_id = (SELECT team_id FROM players WHERE id = NEW.player_id);
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_teams_statistics() OWNER TO postgres;

--
-- Name: update_winner_on_scores_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_winner_on_scores_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.scores_1 IS DISTINCT FROM OLD.scores_1 OR NEW.scores_2 IS DISTINCT FROM OLD.scores_2 THEN
        IF NEW.scores_1 > NEW.scores_2 THEN
            UPDATE matches
            SET winner_id = NEW.team_id_1
            WHERE id = NEW.id;
        ELSIF NEW.scores_1 < NEW.scores_2 THEN
            UPDATE matches
            SET winner_id = NEW.team_id_2
            WHERE id = NEW.id;
        ELSE
            UPDATE matches
            SET winner_id = NULL
            WHERE id = NEW.id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_winner_on_scores_change() OWNER TO postgres;

--
SET default_tablespace = '';

SET default_table_access_method = heap;

--
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
-- Name: formats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formats (
    id integer NOT NULL,
    type character varying DEFAULT 'Đá vòng tròn'::character varying NOT NULL
);


ALTER TABLE public.formats OWNER TO postgres;

--
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
-- Name: users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: formats formats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formats
    ADD CONSTRAINT formats_pkey PRIMARY KEY (id);


--
-- Name: match_events match_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_pkey PRIMARY KEY (id);


--
-- Name: match_events match_events_type_check; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.match_events
    ADD CONSTRAINT match_events_type_check CHECK (((type)::text = ANY ((ARRAY['start'::character varying, 'end'::character varying, 'goal'::character varying, 'own_goal'::character varying, 'red_card'::character varying, 'yellow_card'::character varying])::text[]))) NOT VALID;


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: teams_statistics teams_in_tournament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_statistics
    ADD CONSTRAINT teams_in_tournament_pkey PRIMARY KEY (team_id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: tournaments tournament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournament_pkey PRIMARY KEY (id);


--
-- Name: teams trigger_delete_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_delete_teams_statistics AFTER UPDATE OF status ON public.teams FOR EACH ROW EXECUTE FUNCTION public.delete_teams_statistics_on_status_change();


--
-- Name: teams trigger_insert_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_insert_teams_statistics AFTER UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.insert_teams_statistics_on_status_change();


--
-- Name: match_events trigger_update_a_goals_on_goal; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_a_goals_on_goal AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_a_goals_on_goal();


--
-- Name: match_events trigger_update_match_scores; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_match_scores AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_match_scores();


--
-- Name: teams_statistics trigger_update_score_on_results_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_score_on_results_change AFTER UPDATE OF wins, draws, losses ON public.teams_statistics FOR EACH ROW EXECUTE FUNCTION public.update_score_on_results_change();


--
-- Name: matches trigger_update_teams_played; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_played AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_teams_played();


--
-- Name: matches trigger_update_teams_results; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_results AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_teams_results();


--
-- Name: match_events trigger_update_teams_statistics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_teams_statistics AFTER INSERT ON public.match_events FOR EACH ROW EXECUTE FUNCTION public.update_teams_statistics();


--
-- Name: matches trigger_update_winner_on_scores_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_winner_on_scores_change AFTER UPDATE OF scores_1, scores_2 ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_winner_on_scores_change();


--
-- Name: match_events match_events_match_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id) NOT VALID;


--
-- Name: match_events match_events_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_events
    ADD CONSTRAINT match_events_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id) NOT VALID;


--
-- Name: matches matches_team_id_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team_id_1_fkey FOREIGN KEY (team_id_1) REFERENCES public.teams(id) NOT VALID;


--
-- Name: matches matches_team_id_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team_id_2_fkey FOREIGN KEY (team_id_2) REFERENCES public.teams(id) NOT VALID;


--
-- Name: matches matches_tournament_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES public.tournaments(id) NOT VALID;


--
-- Name: matches matches_winner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_winner_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(id) NOT VALID;


--
-- Name: players players_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) NOT VALID;


--
-- Name: teams_statistics teams_in_tournament_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_statistics
    ADD CONSTRAINT teams_in_tournament_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: teams teams_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: teams teams_tournament_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES public.tournaments(id) NOT VALID;


--
-- Name: tournaments tournaments_format_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournaments_format_id_fkey FOREIGN KEY (format_id) REFERENCES public.formats(id) NOT VALID;


--

--
-- TOC entry 4892 (class 0 OID 34620)
-- Dependencies: 220
-- Data for Name: formats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (1, 'Đá vòng tròn');
INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (2, 'Loại trực tiếp');
INSERT INTO public.formats OVERRIDING SYSTEM VALUE VALUES (3, 'Chia bảng đấu');


--
-- TOC entry 4901 (class 0 OID 42905)
-- Dependencies: 229
-- Data for Name: match_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (13, NULL, 42, 'start', '00p00s', NULL);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (14, NULL, 42, 'end', '90p00s', NULL);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (15, 5, 42, 'goal', '12p00s', 6);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (16, 10, 42, 'goal', '15p00s', 7);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (17, 5, 42, 'goal', '34p12s', 6);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (18, 11, 42, 'goal', '67p30s', 7);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (19, 7, 42, 'yellow_card', '88p44s', 6);
INSERT INTO public.match_events OVERRIDING SYSTEM VALUE VALUES (20, NULL, 43, 'start', '00p00s', NULL);


--
-- TOC entry 4898 (class 0 OID 42826)
-- Dependencies: 226
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (42, 6, 7, 7, '2024-01-24', 1, 'Sân vận động Quân khu 7', false, 0, 2, 2, NULL, true, true, '01:25:00');
INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (43, 8, 9, 7, '2024-01-24', 1, 'Sân vận động Quân khu 7', false, 0, 0, 0, NULL, true, false, '07:00:00');
INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (44, 6, 8, 7, '2024-01-25', 2, 'Sân vận động Quân khu 7', false, 0, 0, 0, NULL, false, false, '10:00:00');
INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (45, 7, 9, 7, '2024-01-25', 2, 'Sân vận động Quân khu 7', false, 0, 0, 0, NULL, false, false, '13:00:00');
INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (46, 6, 9, 7, '2024-01-26', 3, 'Sân vận động Quân khu 7', false, 0, 0, 0, NULL, false, false, '10:00:00');
INSERT INTO public.matches OVERRIDING SYSTEM VALUE VALUES (47, 7, 8, 7, '2024-01-26', 3, 'Sân vận động Quân khu 7', false, 0, 0, 0, NULL, false, false, '13:00:00');


--
-- TOC entry 4896 (class 0 OID 42807)
-- Dependencies: 224
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (4, 'Bùi Văn A', 11, 2001, 'GK, LB', '0357031330', 6);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (5, 'Trương Văn B', 12, 2004, 'RB, CB', '0357031330', 6);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (6, 'Võ Văn C', 13, 2005, 'CM, LM', '0357031330', 6);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (7, 'Đỗ Văn D', 14, 2003, 'ST', '0357031330', 6);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (8, 'Huỳnh Văn E', 15, 2002, 'GK', '0357031330', 6);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (9, 'Nguyễn Văn F', 11, 2001, 'GK', '0357031330', 7);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (10, 'Lê Văn G', 12, 2002, 'LB, RB', '0357031330', 7);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (11, 'Vũ Văn H', 13, 2000, 'ST', '0357031330', 7);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (12, 'Lại Văn I', 14, 2003, 'CM, RM', '0357031330', 7);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (13, 'Trương Văn J', 15, 2004, 'CB, GK', '0357031330', 7);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (14, 'Hoàng Văn K', 11, 2001, 'GK', '0357031330', 8);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (15, 'Nguyễn Văn L', 12, 2003, 'LB, RB', '0357031330', 8);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (16, 'Bùi Văn M', 13, 2002, 'CM', '0357031330', 8);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (17, 'Lê Văn N', 14, 2000, 'ST', '0357031330', 8);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (18, 'Cao Văn O', 15, 2001, 'ST', '0357031330', 8);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (19, 'Phan Văn P', 11, 2001, 'GK', '0357031330', 9);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (20, 'Phạm Văn Q', 12, 2002, 'LB, CB', '0357031330', 9);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (21, 'Nguyễn Văn R', 13, 2003, 'CM', '0357031330', 9);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (22, 'Bùi Văn S', 14, 2000, 'ST', '0357031330', 9);
INSERT INTO public.players OVERRIDING SYSTEM VALUE VALUES (23, 'Trần Văn T', 15, 2004, 'LM, RM', '0357031330', 9);


--
-- TOC entry 4894 (class 0 OID 34635)
-- Dependencies: 222
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teams OVERRIDING SYSTEM VALUE VALUES (8, 'FC HDT', 7, 5, 'Mr. Troussier', 'user@user.com', '0357031330', 'Trung cấp', 'Hội anh em văn phòng.', false, 'https://drive.google.com/drive/folders/1sbmTpytDdDseVBqvUzzTXq9Im7bRXBsq', true);
INSERT INTO public.teams OVERRIDING SYSTEM VALUE VALUES (9, 'FC ANH EM', 7, 2, 'Mr. Ánh', 'admin@admin.com', '0357031330', 'Sơ cấp', 'Cố gắng vì đam mê.', false, 'https://drive.google.com/drive/folders/1sbmTpytDdDseVBqvUzzTXq9Im7bRXBsq', true);
INSERT INTO public.teams OVERRIDING SYSTEM VALUE VALUES (6, 'DOMINO TEAM', 7, 5, 'Mr. Thiên Ân', 'user@user.com', '0357031330', 'Sơ cấp', 'Chơi vui là chính.', false, 'https://drive.google.com/drive/folders/1sbmTpytDdDseVBqvUzzTXq9Im7bRXBsq', true);
INSERT INTO public.teams OVERRIDING SYSTEM VALUE VALUES (7, 'FC AKT', 7, 5, 'Mr. Troussier', 'user@user.com', '0357031330', 'Chuyên nghiệp', 'Đội bóng chuyên nghiệp.', false, 'https://drive.google.com/drive/folders/1sbmTpytDdDseVBqvUzzTXq9Im7bRXBsq', true);


--
-- TOC entry 4899 (class 0 OID 42863)
-- Dependencies: 227
-- Data for Name: teams_statistics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teams_statistics VALUES (7, 0, 1, 0, 1, 1, 2, 2, 0, 0, 0);
INSERT INTO public.teams_statistics VALUES (6, 0, 1, 0, 1, 1, 2, 2, 0, 1, 0);
INSERT INTO public.teams_statistics VALUES (8, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
INSERT INTO public.teams_statistics VALUES (9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);


--
-- TOC entry 4890 (class 0 OID 34601)
-- Dependencies: 218
-- Data for Name: tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tournaments OVERRIDING SYSTEM VALUE VALUES (7, 'HDT League Season 1', '2024-01-24', '2024-01-31', 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.635863047679!2d106.6797512748567!3d10.762521589385393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1bfc262bf1%3A0x4e843897f2900135!2zMjI3IMSQLiBOZ3V54buFbiBWxINuIEPhu6ssIFBoxrDhu51uZyA0LCBRdeG6rW4gNSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1704601347126!5m2!1sen!2s', 'https://drive.google.com/file/d/1oM7kRm2XUMQ9Wdi5Gu6dAJj_fc0umABk/preview', 124, false, 1, 4, 5, false);


--
-- TOC entry 4888 (class 0 OID 26414)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (2, 'admin@admin.com', '$2b$10$F0bKh3vD8URyJrTqXNA0MuaBEHTy2RC5UyK2jtBbnpLf/Nyfle8jS', 'BTC Giải đấu', 'avt-default.png', '2003-05-19', '0357031330', 'Đây là tài khoản BTC.', 1);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (5, 'user@user.com', '$2b$10$eIu8Ygb4S.rcxF6DoImSz.lxOVkm0FAwL0lxxPVMZHDWWGq0gbZqe', 'BQL Đội bóng', 'avt-default.png', NULL, NULL, NULL, 0);


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 215
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 6, true);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 219
-- Name: formats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formats_id_seq', 1, true);


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 228
-- Name: match_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_events_id_seq', 20, true);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 225
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matches_id_seq', 47, true);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 223
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.players_id_seq', 23, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 221
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 9, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 217
-- Name: tournament_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tournament_id_seq', 7, true);


-- Completed on 2024-01-26 22:20:58

--
-- PostgreSQL database dump complete
--
