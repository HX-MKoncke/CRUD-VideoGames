import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGenres,
  orderGames,
  filterCreated,
  filterGenres,
} from "Redux/Action";
import Cards from "Components/Home/Cards";
import NavBar from "Components/Home/NavBar";
import SearchBar from "Components/Home/SearchBar";
import Pagination from "Components/Home/Pagination";
import Loader from "Components/Home/Loader/Loader";
import Loader2 from "Components/Home/Loader/Loader2";

import styles from "./Home.module.css";

export default function Home() {
  const [loading, setRefreshState] = useState(false);
  const dispatch = useDispatch();
  // ***aqui traigo mis  datos del estado global***
  const { _videoGamesCopy, genres } = useSelector((state) => state);

  /*~~~~~~~~~~~~~~PAGINATION~~~~~~~~~~~~~~*/
  const [Orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const inOfLastGame = currentPage * gamesPerPage;
  const inOfFristGame = inOfLastGame - gamesPerPage;
  const pagesDisplayLimit = 5;
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const currentVideoGames = _videoGamesCopy?.slice(inOfFristGame, inOfLastGame);
  let lastpage = [];
  for (let i = 1; i <= Math.ceil(_videoGamesCopy.length / gamesPerPage); i++) {
    // la ultima pagina, esto lo uso de indice para mi nextSup
    lastpage.push(i);
  }

  const pagination = (pages) => {
    setCurrentPage(pages);
  };

  //**** */

  const getdata = () => {
    dispatch(getGames());
    setRefreshState(true);
  };

  useEffect(() => {
    // trae todos los juegos
    getdata();
  }, [dispatch]);

  /*~~~~~~~~~~~~~~HANDLES~~~~~~~~~~~~~~*/
  const handleLast = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setMaxPage(5);
      setMinPage(1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage - 1 < minPage) {
        setMaxPage(
          maxPage - pagesDisplayLimit < 5 ? 5 : maxPage - pagesDisplayLimit
        );
        setMinPage(
          minPage - pagesDisplayLimit <= 0 ? 1 : minPage - pagesDisplayLimit
        );
      }
    }
  };

  const handleNext = () => {
    if (currentPage !== lastpage.length) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPage) {
        setMaxPage(maxPage + pagesDisplayLimit);
        setMinPage(minPage + pagesDisplayLimit);
      }
    }
  };

  const handleFirst = () => {
    const lastPage = lastpage.length;
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
      setMaxPage(lastPage);
      setMinPage(lastPage - pagesDisplayLimit + 1);
    }
  };

  return (
    <div>
      {_videoGamesCopy.length ? (
        <div className={styles.mainContainer}>
          <div className={styles.navBar}>
            <NavBar />

            <SearchBar />
          </div>

          <div className={styles.cardArea}>
            {currentVideoGames.map((e) => {
              return (
                <Cards
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  background_image={e.background_image}
                  genres={e.genres}
                  rating={e.rating}
                />
              );
            })}
          </div>

          <div className="">
            <Pagination
              _videoGamesCopy={_videoGamesCopy.length}
              gamesPerPage={gamesPerPage}
              pagination={pagination}
              currentPage={currentPage}
              handlePrev={handlePrev}
              handleLast={handleLast}
              handleNext={handleNext}
              handleFirst={handleFirst}
              maxPage={maxPage}
              minPage={minPage}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
