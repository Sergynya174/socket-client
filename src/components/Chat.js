import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Chat.module.css";
import useChatScroll from "../utils/castomHooks/useChatScroll";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";

const socket = io.connect("https://onlinechat-ovzz.onrender.com");

const Chat = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [params, setParams] = useState(null);
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const ref = useChatScroll(state);

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);
  const leaveRoom = () => {
    socket.emit("leaveRoom", { params });
    navigate("/");
  };
  const handleChange = ({ target: { value } }) => setMessage(value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!message) return;
    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  });

  return (
    <>
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <div className={styles.title}>{params?.room}</div>
          <div className={styles.users}>{users} users in this room</div>
          <button className={styles.leave} onClick={leaveRoom}>
            leave the room
          </button>
        </header>
        <div className={styles.containerMessages} ref={ref}>
          <Messages messages={state} name={params?.name} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="message"
              value={message}
              className={styles.textInput}
              placeholder="Message..."
              required
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className={styles.emoji}>
            <button className={styles.img} onClick={() => setOpen(!isOpen)} />
            {isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width="100%"
                  searchDisabled="true"
                  right="20%"
                />
              </div>
            )}
            {message ? <button className={styles.button} /> : ""}
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
