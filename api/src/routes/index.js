const router = require("express").Router();

const videoGamesRouter = require("./videoGames");
const genresRouter = require("./genres");

router.use("/", videoGamesRouter);
router.use("/", genresRouter);

//Just export all the routes
module.exports = router;
