--  ####  these all command we have to write in the commnd line #### --

-- for creating the database

CREATE DATABASE perntodo;

--to use the database
--##### \c bdname ######--
-- to see tables
--##### \dt #####--
-- for creating table 

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- to see every thing in the table
--### SELECT FROM * tableNAME ####----