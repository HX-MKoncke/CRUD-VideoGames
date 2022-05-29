import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import Loader2 from "Components/Home/Loader/Loader2";

export default function Cards({ id, name, background_image, genres, rating }) {
  return (
    <Link
      to={"/home/" + id}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img className={styles.img} src={background_image} />
          </div>
          <div className={styles.contentBx}>
            <div className={styles.content}>
              <h1>{name}</h1>
              <h3>Rating: {rating} ★</h3>
              <p>{genres}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
