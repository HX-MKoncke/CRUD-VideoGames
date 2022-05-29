import React, { Fragment } from "react";
import styles from "./LandingPage.module.css";
export default function Button() {
  return (
    <Fragment>
      <div>
        <a className={styles.a} href="/home">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          lets go!
        </a>
      </div>
    </Fragment>
  );
}
