import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

const Main = () => {
  const { USERNAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [USERNAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (evt) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if (isDisabled) evt.preventDefault();
  };

  return (
    <div className={styles.loginBox}>
      <h2 className={styles.h2}>Login</h2>
      <form>
        <div className={styles.userBox}>
          <input
            type="text"
            name="username"
            required
            value={values[USERNAME]}
            className={styles.input}
            autoComplete="off"
            onChange={handleChange}
          />
          <label className={styles.label}>NickName</label>
        </div>
        <div className={styles.userBox}>
          <input
            type="text"
            name="room"
            required
            value={values[ROOM]}
            className={styles.input}
            autoComplete="off"
            onChange={handleChange}
          />
          <label className={styles.label}>Room</label>
        </div>
        <Link
          to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
          onClick={handleClick}
          className={styles.a}
          type="submit"
        >
          <span className={styles.span}></span>
          <span className={styles.span}></span>
          <span className={styles.span}></span>
          <span className={styles.span}></span>
          Submit
        </Link>
      </form>
    </div>
  );
};

export default Main;
