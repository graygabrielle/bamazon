DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
id SERIAL PRIMARY KEY,
product VARCHAR(50) NOT NULL,
price INT(10) NOT NULL
);

INSERT INTO products (product, price)
VALUES ("clock", 400), ("table", 500);

SELECT * FROM products;