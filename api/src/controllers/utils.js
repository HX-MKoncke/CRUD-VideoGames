const axios = require("axios");
const { Videogame, Genres } = require("../db");

require("dotenv").config();
const { API_KEY } = process.env;

//Get one hundred games from the api, as per Henry's request.
const getApiInfo = async () => {
  try {
    const games = [];
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    for (let i = 1; i < 5; i++) {
      let pages = await axios.get(url);
      pages.data?.results.forEach((e) => {
        games.push({
          id: e.id,
          name: e.name,
          background_image: e.background_image,
          rating: e.rating,
          genres: e.genres.map((gender) => gender.name),
          platforms: e.platforms.map((platform) => platform.platform.name),
        });
      });
      url = pages.data.next;
    }
    return games;
  } catch (error) {
    console.log(error);
  }
};

//Alternative way to find a single game, if we know it's id.
const getOneGame = async (id) => {
  try {
    //? Promise version
    // axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then((z) =>{
    //     res.send(z.data)
    // }).catch(e => next(e))

    const gameById = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const oneGame = {
      id: gameById.data.id,
      name: gameById.data.name,
      background_image: gameById.data.background_image,
      rating: gameById.data.rating,
      released: gameById.data.released, //
      description: gameById.data.description,
      genres: gameById.data.genres.map((g) => g.name),
      platforms: gameById.data.parent_platforms.map((p) => p.platform.name),
    };
    return oneGame;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  try {
    let dbgamesdata = await Videogame.findAll({
      //Find all games in db
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //Map em to look like the api.
    let newdatagame = dbgamesdata.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rating: e.rating,
        background_image: e.background_image,
        genres: e.genres.map((e) => e.name),
        description: e.description,
        released: e.released,
        createdInDB: e.createdInDB,
        plataforms: e.plataforms,
      };
    });
    return newdatagame;
  } catch (error) {
    console.log(error);
  }
};

//Concatenate the games from api and the created games from db.
const getAllInfo = () => {
  try {
    let allinfo = Promise.all([getApiInfo(), getDbInfo()]).then((result) => {
      return [...result[0], ...result[1]];
    });

    return allinfo; //info concat
  } catch (error) {
    console.log(error);
  }
};

//Save the genres from the api to the db
const saveGenres = async () => {
  try {
    const apiInfo = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = apiInfo.data.results.map((g) => {
      return { name: g.name };
    });
    //bulkcreate >>> squelize
    let dbGenres = await Genres.findAll();
    if (dbGenres.length === 0) {
      await Genres.bulkCreate(genres);
    }
  } catch (error) {
    console.log(error);
  }
};

//Get the previously added to db genres
const getGenresFromDB = async () => {
  try {
    let genresDB = await Genres.findAll();
    genresDB = genresDB.map((g) => g.toJSON());
    return genresDB;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiInfo,
  getOneGame,
  getDbInfo,
  getAllInfo,
  saveGenres,
  getGenresFromDB,
};
