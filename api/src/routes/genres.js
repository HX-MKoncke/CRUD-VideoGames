const router = require("express").Router();

const { getGenres } = require("../controllers/genres");

//Creating routes and adding the controllers.

router.get("/genres", getGenres);

module.exports = router;
