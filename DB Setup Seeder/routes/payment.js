const express = require("express");
const { body } = require("express-validator/check");

const paymentController = require("../controllers/payment");

const router = express.Router();

router.post(
  "/payment",
  [
    body("dueDate").trim().not().isEmpty(),
    body("status").trim().not().isEmpty(),
    body("expectedAmount").trim().not().isEmpty(),
    body("outstanding").trim().not().isEmpty(),
    body("cashKickId").trim().not().isEmpty(),
  ],
  paymentController.addPayment
);

router.get("/payments", paymentController.getPayments);

module.exports = router;
