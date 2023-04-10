const express = require("express");

const userRoutes = require("./user");
const paymentRoutes = require("./payment");
const contractRoutes = require("./contract");
const cashkickRoutes = require("./cash-kick");

const router = express.Router();

router.use(userRoutes);
router.use(paymentRoutes);
router.use(contractRoutes);
router.use(cashkickRoutes);

module.exports = router;
