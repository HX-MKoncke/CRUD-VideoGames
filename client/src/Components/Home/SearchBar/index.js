import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideoGameByName } from "Redux/Action";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [gameState, setGameState] = useState("");
  const dispatch = useDispatch();

  function handleOnSearch(e) {
    // e.preventDefault();

    if (gameState.length === 0) {
      return alert("Please type a game");
    } else {
      dispatch(getVideoGameByName(gameState));
      setGameState("");
    }
  }

  return (
    <div className={styles.searchBox}>
      <input
        id="text"
        className={styles.searchTxt}
        type="textfield"
        placeholder="Search a game..."
        value={gameState}
        onChange={(e) => setGameState(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleOnSearch();
        }}
      />

      <a className={styles.searchBtn} type="submit" onClick={handleOnSearch}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/151/151773.png"
          width="25px"
          height="25px"
          alt="search game"
        />
      </a>
    </div>
  );
}
