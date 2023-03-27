const express = require("express");
const router = express.Router();

const bookRoutes = require("./book-routes");
const libraryRoutes = require("./library-routes");

router.use(bookRoutes);
router.use(libraryRoutes);

module.exports = router;
