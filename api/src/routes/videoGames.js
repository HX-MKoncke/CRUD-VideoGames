const router = require("express").Router();

const {
  getVideoGames,
  getSingleGame,
  postGame,
  putGame,
  deleteGame,
} = require("../controllers/videoGames");

//Creating routes and adding the controllers.

router.get("/videogames", getVideoGames);

router.get("/videogame/:id", getSingleGame);

router.post("/videogame", postGame);

router.put("/videogame/:id", putGame);

router.delete("/videogame/:id", deleteGame);

module.exports = router;
