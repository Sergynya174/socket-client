import React from "react";
import styles from "../styles/Messages.module.css";
import icon from "../images/icon.png";

const Messages = ({ messages, name }) => {
  return (
    <ul className={styles.chat}>
      {messages?.map(({ user, message }, i) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const classNameMessage = itsMe ? styles.right : styles.left;
        const classNameLogo = itsMe ? styles.logoRight : styles.logo;
        const classNameUser = itsMe
          ? styles.nameContainerRight
          : styles.nameContainerLeft;
        return (
          <li className={classNameMessage} key={i}>
            <div className={classNameUser}>
              <p className={styles.name}>{name}</p>
            </div>
            <img className={classNameLogo} src={icon} alt="Avatar" />
            <p className={styles.text}>{message}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;
