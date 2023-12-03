const express = require('express');
const router = express.Router();
const { getAllOrders, addOrder, updateOrder, deleteOrder } = require('./dal');

// API Routes
router.get('/api/orders', getAllOrders);
router.post('/api/orders', addOrder);
router.put('/api/orders/:id', updateOrder);
router.delete('/api/orders/:id', deleteOrder);

