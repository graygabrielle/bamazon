DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
id SERIAL PRIMARY KEY,
product VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
price INT(10) NOT NULL,
stock INT(10) NOT NULL
);

INSERT INTO products (product, department, price, stock)
VALUES 
("iPad pro 12.9-inch 256GB", "electronics", 1000, 5),
("wireless Logitec computer mouse", "electronics", 20, 12),  
("large chrome wall clock", "electronics", 40, 10), 
("sage-green leather arm chair", "furniture", 250, 15),
("cherrywood kitchen table", "furniture", 200, 50), 
("stainless-steel water bottle", "kitchen", 18, 20),
("diamond-cut knife sharpener", "kitchen", 22, 25), 
("spring-form cake pan 10-inch", "kitchen", 25, 10), 
("blue gardening gloves (small)", "garden", 8, 20), 
("red tulip bulbs (pack of 50)", "garden", 15, 30); 

SELECT * FROM products;