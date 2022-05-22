const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");
const { getApiInfo, getDbInfo, getAllInfo, getOneGame } = require("./utils");

//Get all (or single, by name passed via query) games
const getVideoGames = async (req, res) => {
  try {
    const { name } = req.query;

    const allgames = await getAllInfo();
    if (name) {
      let gameName = allgames
        .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 16);
      gameName.length
        ? res.status(200).json(gameName)
        : res.status(404).send("Game not found");
    } else {
      res.status(200).send(allgames);
    }
  } catch (error) {
    res.status(400).send({ errorMsg: error });
  }
};

//Get single game by ID.
const getSingleGame = async (req, res) => {
  try {
    const { id } = req.params;
    //If we search from DB.
    if (id.length > 7 && typeof id === "string") {
      let dbGame = await getDbInfo();
      let singleGame = await dbGame.filter((g) => g.id === id);
      return singleGame
        ? res.send(singleGame)
        : res.status(404).send("Game not found");
    } else {
      //Else, it is from API, we search on the individual endpoint.
      let singleGame = await getOneGame(id);
      res.send(singleGame);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postGame = async function (req, res) {
  try {
    let {
      name,
      background_image,
      description,
      released,
      rating,
      genres,
      platforms,
      createdVideoGame,
    } = req.body;

    if (!name || !description || !platforms || !genres) {
      res.status(404).send("Information is missing");
    } else {
      let newGame = await Videogame?.create({
        name,
        background_image:
          background_image ||
          "https://i.pinimg.com/564x/52/67/1d/52671d53ded7bad5b43e825debfb286d.jpg",
        description,
        released,
        rating,
        platforms,
        createdVideoGame,
      });
      //Here i find all the matching genres from client-db
      let genresFromDb = await Genres.findAll({
        where: {
          name: {
            [Op.in]: req.body.genres,
          },
        },
      });
      //Then add em with the setter, as the genres are another entity and we need the normalization.
      await newGame.addGenres(genresFromDb);

      res.status(201).send({
        successMsg: "Game successfully created",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const putGame = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedGame = await Videogame.findOne({
      where: {
        id: id,
      },
    });

    await updatedGame.update({
      name: req.body.name,
      rating: req.body.rating,
      released: req.body.released,
      description: req.body.description,
      platforms: req.body.platforms,
    });

    //Here i find all the matching genres from client-db
    let genresFromDb = await Genres.findAll({
      where: {
        name: {
          [Op.in]: req.body.genres,
        },
      },
    });
    //Then add em with the setter, as the genres are another entity and we need the normalization.
    await updatedGame.setGenres(genresFromDb);

    res.status(201).send({
      successMsg: "Game successfully updated",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const gameDelete = await Videogame.findByPk(id);
    if (gameDelete) {
      await gameDelete.destroy();
      return res.send("Game deleted!");
    }
    res.status(404).send("Game not found");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getVideoGames,
  getSingleGame,
  postGame,
  putGame,
  deleteGame,
};
