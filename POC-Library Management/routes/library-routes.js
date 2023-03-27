const express = require("express");
const libraryController = require("../controllers/library-controllers");

const router = express.Router();

router.get("/library", libraryController.getLibrary);

router.get("/library/new-library", libraryController.newLibrary);

router.post("/library/add-library", libraryController.addLibrary);

router.get(
  "/library/edit-library/:libraryId",
  libraryController.postEditLibrary
);

router.post("/library/edit-library", libraryController.editLibrary);

router.post("/library/delete-library", libraryController.deleteLibrary);

module.exports = router;
