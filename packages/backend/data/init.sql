BEGIN;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET client_min_messages = warning;
SET schema 'public';

DROP TABLE IF EXISTS BookList;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS editor;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BookList (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    nationality VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE editor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    year_published INTEGER,
    description TEXT,
    pages INTEGER,
    author_id INTEGER,
    genre_id INTEGER,
    editor_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO "user" (lastname, firstname, email, password)
VALUES 
('Durand', 'Sophie', 'sophie.durand@example.com', 'hashedpassword1'),
('Martin', 'Julien', 'julien.martin@example.com', 'hashedpassword2');

INSERT INTO list (name, position)
VALUES 
('À lire', 1),
('Mes favoris', 2);

INSERT INTO author (lastname, firstname, nationality)
VALUES 
('Verne', 'Jules', 'Française'),
('Rowling', 'J.K.', 'Britannique');

INSERT INTO editor (name)
VALUES 
('Gallimard'),
('Bloomsbury');

INSERT INTO genre (name)
VALUES 
('Science-fiction'),
('Fantastique');

INSERT INTO book (title, isbn, year_published, description, pages, author_id, genre_id, editor_id)
VALUES 
('Vingt mille lieues sous les mers', '9782070418794', 1870, 'Une aventure sous-marine fascinante.', 300, 1, 1, 1),
('Harry Potter à l\''école des sorciers', '9780747532743', 1997, 'Le début de la saga Harry Potter.', 320, 2, 2, 2);

INSERT INTO BookList (book_id, list_id)
VALUES 
(1, 1),
(2, 2);

ALTER TABLE book
ADD CONSTRAINT fk_book_author
FOREIGN KEY (author_id) REFERENCES author(id)
ON DELETE SET NULL;

ALTER TABLE book
ADD CONSTRAINT fk_book_genre
FOREIGN KEY (genre_id) REFERENCES genre(id)
ON DELETE SET NULL;

ALTER TABLE book
ADD CONSTRAINT fk_book_editor
FOREIGN KEY (editor_id) REFERENCES editor(id)
ON DELETE SET NULL;

ALTER TABLE BookList
ADD CONSTRAINT fk_booklist_book
FOREIGN KEY (book_id) REFERENCES book(id)
ON DELETE CASCADE;

ALTER TABLE BookList
ADD CONSTRAINT fk_booklist_list
FOREIGN KEY (list_id) REFERENCES list(id)
ON DELETE CASCADE;

COMMIT;