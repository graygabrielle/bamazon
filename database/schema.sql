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
("12.9-inch 256GB iPad pro", "electronics", 1000, 5),
("wireless Logitec iPad keyboard", "electronics", 60, 12),  
("large chrome wall clock", "electronics", 40, 10), 
("sage-green leather arm chair", "furniture", 250, 15),
("cherrywood kitchen table", "furniture", 200, 50), 
("stainless-steel water bottle", "kitchen", 18, 20),
("diamond-cut knife sharpener", "kitchen", 22, 25), 
("10-inch springform cake pan", "kitchen", 25, 10), 
("small blue gardening trowel", "garden", 8, 20), 
("red tulip bulbs 50-pack", "garden", 15, 30); 

SELECT * FROM products;