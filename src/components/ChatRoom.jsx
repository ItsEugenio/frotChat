import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import styles from "../styles/prueba.module.css";

const socket = io("http://localhost:4000");

function ChatRoom() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectado al chat");
      setIsConnected(true);
    });

    socket.emit("joinRoom", "geoguessr");

    socket.on("messageRoom", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
      console.log("mensajes de data", mensajes);
    });

    return () => {
      socket.off("connect");
      socket.off("messageRoom");
    };
  }, []);

  const enviarMensaje = () => {
    const messageObject = {
      type: "messageRoom",
      content: nuevoMensaje,
      username: socket.id,
      room: "geoguessr",
    };

    socket.emit("messageRoom", messageObject);
    console.log("FUNCION MESAGE", messageObject);
    const input = document.getElementById("inputChatRoom");
    input.value = "";
  };
  return (
    <div className={styles.contChat}>
      <h1>Chat Rooms</h1>
      <p>{isConnected ? "Conectado a la Room" : "No conectado a la Room"}</p>
      <div className={styles.contMessages}>
        {mensajes.map((mensaje) => (
          <li key={mensaje}>
            {mensaje.username}: {mensaje.content}
          </li>
        ))}
      </div>
      <textarea
        className={styles.textarea}
        rows="4"
        cols="33"
        id="inputChatRoom"
        type="text"
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button className={styles.btnChat} onClick={enviarMensaje}>
        Enviar
      </button>
    </div>
  );
}

export default ChatRoom;
