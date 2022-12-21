import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={styles.btn} onClick={props.click} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
