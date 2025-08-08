DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS order_status_enum;

-- Create a custom ENUM type for order status for data integrity
CREATE TYPE order_status_enum AS ENUM ('pending', 'shipped', 'delivered', 'cancelled');

-- Table for users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status order_status_enum NOT NULL DEFAULT 'pending'
);

-- Join table for the many-to-many relationship between orders and products
-- This table allows an order to contain multiple products with specific quantities.
CREATE TABLE order_items (
    order_id INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time_of_purchase DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

INSERT INTO
    users (email, name)
VALUES (
        'alice@example.com',
        'Alice Smith'
    ),
    (
        'bob@example.com',
        'Bob Johnson'
    ),
    (
        'charlie@example.com',
        'Charlie Brown'
    );

INSERT INTO
    products (name, description, price)
VALUES (
        'PRODUCT_1',
        'High-quality wireless headphones',
        149.99
    ),
    (
        'PRODUCT_2',
        'Ergonomic mechanical keyboard',
        89.50
    ),
    (
        'PRODUCT_3',
        '4K Ultra-HD Monitor',
        399.00
    );

INSERT INTO
    orders (user_id, order_date, status)
VALUES (
        1,
        NOW() - INTERVAL '2 days',
        'shipped'
    );

INSERT INTO
    orders (user_id, order_date, status)
VALUES (
        2,
        NOW() - INTERVAL '15 days',
        'delivered'
    );

INSERT INTO
    orders (user_id, order_date, status)
VALUES (
        1,
        NOW() - INTERVAL '3 days',
        'pending'
    );

INSERT INTO
    orders (user_id, order_date, status)
VALUES (
        3,
        NOW() - INTERVAL '1 day',
        'pending'
    );

INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        price_at_time_of_purchase
    )
VALUES (1, 1, 1, 149.99),
    (1, 2, 1, 89.50);

INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        price_at_time_of_purchase
    )
VALUES (2, 1, 2, 145.00);

INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        price_at_time_of_purchase
    )
VALUES (3, 3, 1, 399.00);

INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        price_at_time_of_purchase
    )
VALUES (4, 1, 1, 149.99);
