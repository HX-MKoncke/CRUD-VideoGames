import React from "react";
import styles from "./NavBar.module.css";
import Logo from "Components/LandingPage/Logo";

export default function NavBar() {
  return (
    <div>
      <nav className={styles.nav}>
        <a className={styles.a} href="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </a>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <a className={styles.a} href="/home">
              HOME
            </a>
            <a className={styles.a} href="/create">
              CREATE
            </a>
            <a className={styles.a} href="/about">
              ABOUT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
