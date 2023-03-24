const Library = require("../models/library");

exports.getLibrary = (req, res, next) => {
  Library.findAll()
    .then((libraries) => {
      libraries = libraries.map((library) => library.toJSON());
      res.render("library-views/library", {
        pageTitle: "Libraries",
        path: "/library",
        libraries: libraries,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newLibrary = (req, res, next) => {
  res.render("library-views/edit-library", {
    pageTitle: "New Library",
    path: "/edit-library",
    editing: false,
  });
};

exports.addLibrary = (req, res, next) => {
  Library.create(req.body)
    .then(() => res.redirect("/library"))
    .catch((err) => console.lof(err));
};

exports.postEditLibrary = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/library");
  }
  const libraryId = req.params.libraryId;
  Library.findByPk(libraryId)
    .then((library) => {
      res.render("library-views/edit-library", {
        pageTitle: "New Library",
        path: "/edit-library",
        editing: true,
        library: library,
      });
    })
    .catch((err) => console.error(err));
};

exports.editLibrary = (req, res, next) => {
  const libraryId = req.body.libraryId;
  const updatedLibraryName = req.body.name;
  const updatedLibraryAvailable = req.body.available === "on" ? true : false;
  Library.findByPk(libraryId)
    .then((library) => {
      library.name = updatedLibraryName;
      library.available = updatedLibraryAvailable;
      return library.save();
    })
    .then(() => {
      console.log("UPDATED LIBRARY DETAILS");
      res.redirect("/library");
    })
    .catch((err) => console.log(err));
};

exports.deleteLibrary = (req, res, next) => {
  const libraryId = req.body.libraryId;
  Library.findByPk(libraryId)
    .then((library) => {
      return library.destroy();
    })
    .then(() => {
      console.log("Deleted Library");
      res.redirect("/library");
    })
    .catch((err) => console.log(err));
};
