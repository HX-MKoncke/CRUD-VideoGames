const { getGenresFromDB, saveGenres } = require("./utils");

//Just get genres from api, load em to db and send them back to the client.
const getGenres = async (req, res) => {
  try {
    await saveGenres();
    let genres = await getGenresFromDB();
    genres = genres.map((g) => {
      return {
        id: g.id,
        name: g.name,
      };
    });
    res.send(genres);
  } catch (error) {
    res.send({ errorMsg: error });
  }
};

module.exports = {
  getGenres,
};
