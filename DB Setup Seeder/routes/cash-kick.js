const express = require("express");
const { body } = require("express-validator/check");

const cashkickController = require("../controllers/cash-kick");

const router = express.Router();

router.post(
  "/cashkick",
  [
    body("name").trim().not().isEmpty(),
    // body("selectedContracts").trim().not().isEmpty(),
    body("status").trim().not().isEmpty(),
    body("maturity").trim().not().isEmpty(),
    body("totalReceived").trim().not().isEmpty(),
    body("totalFinanced").trim().not().isEmpty(),
    body("userId").trim().not().isEmpty(),
  ],
  cashkickController.createCashkick
);

// router.get("/cashkicks", contractController.getCashKicks);

module.exports = router;
