-- Query 1: E-mail addresses of users who have bought PRODUCT_1 in the past 7 days.
SELECT DISTINCT
    u.email
FROM
    users u
    JOIN orders o ON u.id = o.user_id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
WHERE
    p.name = 'PRODUCT_1'
    AND o.order_date >= NOW() - INTERVAL '7 days';

-- Query 2: Total sales amount, per day.
SELECT CAST(o.order_date AS DATE) AS sale_day, SUM(
        oi.quantity * oi.price_at_time_of_purchase
    ) AS total_sales
FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
GROUP BY
    sale_day
ORDER BY sale_day ASC;