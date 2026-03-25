CREATE DATABASE hospital_db;

\c hospital_db;

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    diagnosis VARCHAR(255),
    admission_status VARCHAR(20) DEFAULT 'Admitted'
);