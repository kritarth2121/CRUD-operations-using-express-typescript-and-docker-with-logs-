-- sudo -i postgre psql
CREATE DATABASE trakinvest;

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    description VARCHAR(255)
);

INSERT INTO employee (name, email,description)
    VALUES ('Kritarth', 'kt@ibm.com',"CEO"),
    ('Rana', 'rana@web.com',"CTO"),
    ('Amit', 'amit@web.com',"Peon");

select * from employee;