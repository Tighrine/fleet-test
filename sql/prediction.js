// predict_sales.js

const { Pool } = require("pg");

/**
 * Prédit les ventes de produits pour les 7 prochains jours.
 */
async function predictProductSales() {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "r2d2z6po",
    port: 5450,
  });

  try {
    const sqlQuery = `
      SELECT
          p.id AS product_id,
          p.name AS product_name,
          CAST(o.order_date AS DATE) AS sale_day,
          SUM(oi.quantity) AS total_quantity_sold
      FROM products p
      JOIN order_items oi ON p.id = oi.product_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.order_date >= NOW() - INTERVAL '30 days'
      GROUP BY p.id, p.name, sale_day
      ORDER BY p.id, sale_day;
    `;
    const res = await pool.query(sqlQuery);
    const salesData = res.rows;

    console.log("salesData: ", salesData);
    // en me basant sur la moyenne des ventes des 30 derniers jours
    salesData.forEach((row) => {
      const avgPerDay = row.total_quantity_sold
        ? row.total_quantity_sold / 30
        : 0;
      const predicted7Days = avgPerDay * 7;

      console.log(`- ${row.product_name}: ${predicted7Days.toFixed(2)} units`);
    });
  } catch (err) {
    console.error("Error during prediction:", err);
  } finally {
    await pool.end();
  }
}

predictProductSales();
