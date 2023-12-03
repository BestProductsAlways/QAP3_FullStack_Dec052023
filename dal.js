const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Data Access Layer Functions
const getAllOrders = async (req, res) => {
  const result = await pool.query('SELECT * FROM orders');
  res.json(result.rows);
};

const addOrder = async (req, res) => {
  const { customer_id, product_id, quantity, order_date } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [customer_id, product_id, quantity, order_date]
  );
  res.json(result.rows[0]);
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { quantity } = req.body;
  const result = await pool.query('UPDATE orders SET quantity = $1 WHERE order_id = $2 RETURNING *', [quantity, orderId]);
  res.json(result.rows[0]);
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  await pool.query('DELETE FROM orders WHERE order_id = $1', [orderId]);
  res.json({ message: 'Order deleted successfully' });
};

module.exports = { getAllOrders, addOrder, updateOrder, deleteOrder };
