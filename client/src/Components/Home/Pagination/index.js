import styles from "./Pagination.module.css";

export default function Pagination({
  _videoGamesCopy,
  gamesPerPage,
  pagination,
  currentPage,
  handleNext,
  handleFirst,
  handleLast,
  handlePrev,
  maxPage,
  minPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(_videoGamesCopy / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <section>
      <nav>
        {pageNumbers.length === 0 ? (
          <p></p>
        ) : (
          <ul className={styles.pagination}>
            <li className={`${styles.btn} ${styles.prev}`} onClick={handleLast}>
              ⪻
            </li>
            <li className={`${styles.btn} ${styles.prev}`} onClick={handlePrev}>
              {"<"}
            </li>

            {pageNumbers?.map((number) => {
              if (number <= maxPage && number >= minPage) {
                return (
                  <li
                    key={number}
                    id={number}
                    className={`${styles.btn} ${
                      number === currentPage ? styles.active : styles.inactive
                    }`}
                    onClick={() => pagination(number)}
                  >
                    {number}
                  </li>
                );
              } else {
                return null;
              }
            })}

            <li
              className={`${styles.btn} ${styles.next}`}
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(_videoGamesCopy / gamesPerPage)
              }
            >
              {">"}
            </li>
            <li
              className={`${styles.btn} ${styles.next}`}
              onClick={handleFirst}
              disabled={
                currentPage === Math.ceil(_videoGamesCopy / gamesPerPage)
              }
            >
              ⪼
            </li>
          </ul>
        )}
      </nav>
    </section>
  );
}
