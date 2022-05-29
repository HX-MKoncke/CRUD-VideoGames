const initialState = {
  videoGames: [],
  _videoGamesCopy: [],
  genres: [],
  gameDetail: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEO_GAMES":
      return {
        ...state,
        videoGames: action.payload,
        _videoGamesCopy: action.payload,
      };

    case "SEARCH_GAME":
      return {
        ...state,
        _videoGamesCopy: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        gameDetail: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "POST_GAME":
      return {
        ...state,
      };

    case "DELETE_GAME":
      return {
        ...state,
      };
    case "UPDATE_GAME":
      return {
        ...state,
      };
    case "ORDER_GAMES":
      return {
        ...state,
        // videoGames: orderDogs(action.payload, state.allDogs),
      };
    case "FILTER_GENRES":
      return {
        ...state,
        videoGames: action.payload,
      };

    case "FILTER_CREATED":
      return {
        ...state,
        // videoGames: filterDogs(action.payload, state.dogs),
      };

    default:
      return state;
  }
};
