const express = require("express");
const { body } = require("express-validator/check");

const contractController = require("../controllers/contract");

const router = express.Router();

router.post(
  "/contract",
  [
    body("contractName").trim().not().isEmpty(),
    body("contractType").trim().not().isEmpty(),
    body("perPayment").trim().not().isEmpty(),
    body("termLength").trim().not().isEmpty(),
    body("paymentAmount").trim().not().isEmpty(),
  ],
  contractController.addContract
);

router.get("/contracts", contractController.getContracts);

module.exports = router;
