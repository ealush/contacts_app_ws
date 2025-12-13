import styles from "./pager.module.css";
import React from "react";

export default function Loading() {
  return (
    <div className={styles.pagerContainer}>
      <h3>Loading...</h3>
    </div>
  );
}
