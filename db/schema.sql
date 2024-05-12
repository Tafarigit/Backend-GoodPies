DROP DATABASE IF EXISTS pies_dev;
CREATE DATABASE pies_dev;

\c pies_dev;

DROP TABLE IF EXISTS pies;

CREATE TABLE pies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- psql -U postgres -f db/schema.sql
-- connect to the postgres terminal under the user postgres and run this file located at db/schema.sql
-- -- psql -U postgres -f db/seed.sql