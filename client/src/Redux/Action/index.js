import axios from "axios";

/*~~~~~~~~~~~~~~GETS~~~~~~~~~~~~~~*/
export function getGames() {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames`);
    return dispatch({ type: "GET_VIDEO_GAMES", payload: json.data });
  };
}

export function getVideoGameByName(name) {
  return async function (dispatch) {
    try {
      let game = await axios(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({ type: "SEARCH_GAME", payload: game.data });
    } catch (error) {
      alert("Game Not Found!");
      // console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios(`http://localhost:3001/videogame/${id}`);
      return dispatch({ type: "GET_DETAIL", payload: detail.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      let genres = await axios(`http://localhost:3001/genres`);
      return dispatch({ type: "GET_GENRES", payload: genres.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetDetail() {
  return {
    type: "RESET_DETAIL",
  };
}

/*~~~~~~~~~~~~~~POST~~~~~~~~~~~~~~*/
export function postGame(payload) {
  return async function () {
    const response = await axios.post(
      `http://localhost:3001/videogame`,
      payload
    );
    return { type: "POST_GAME", payload: response.data };
  };
}

/*~~~~~~~~~~~~~~PUT~~~~~~~~~~~~~~*/
export const updateGame = (id, data) => {
  return async function (dispatch) {
    await axios.put(`http://localhost:3001/videogame/${id}`, data);
    return dispatch({
      type: "UPDATE_GAME",
    });
  };
};

/*~~~~~~~~~~~~~~DELETE~~~~~~~~~~~~~~*/
export function deleteGame(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/videogame/${id}`);
      return dispatch({ type: "DELETE_GAME" });
    } catch (error) {
      console.log(error);
    }
  };
}

/*~~~~~~~~~~~~~~ORDERS~~~~~~~~~~~~~~*/
export const orderGames = (payload) => {
  return {
    type: "ORDER_GAMES",
    payload,
  };
};

/*~~~~~~~~~~~~~~FILTERS~~~~~~~~~~~~~~*/
export function filterGenres(payload) {
  return {
    type: "FILTER_GENRES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
