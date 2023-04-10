const express = require("express");
const { body } = require("express-validator/check");

const cashkickController = require("../controllers/cash-kick");

const router = express.Router();

router.post(
  "/cashkick",
  [
    body("name").trim().not().isEmpty(),
    body("term").trim().not().isEmpty(),
    body("paybackAmount").trim().not().isEmpty(),
    body("rate").trim().not().isEmpty(),
    body("totalPayout").trim().not().isEmpty(),
    body("userId").trim().not().isEmpty(),
  ],
  cashkickController.createCashkick
);

router.get("/cashkicks", cashkickController.getCashKicks);

module.exports = router;
