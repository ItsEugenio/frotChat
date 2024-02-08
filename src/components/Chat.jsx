import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import styles from "../styles/prueba.module.css";

const socket = io("http://localhost:4000");

const ChatComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectado al chat");
      setIsConnected(true);
    });

    socket.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
      console.log('Segun el id', data.usuario,typeof(data.usuario));
    });




    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
    const input = document.getElementById("inputChat");
    input.value = "";
  };

  const GoRoom = () => {
    const inpuntGR = document.getElementById("goRoom");
    console.log("INPUT GOOO ROOMS", inpuntGR.value);
    if (inpuntGR.value === "cesar") {
      window.location.assign("/ChatRoom");
    } else {
      alert("No existe la sala a la que quieres entrar");
    }
  };

  return (
    <div className={styles.contChat}>
      <h1>Chat Global</h1>
      <p className={styles.conectState}>
        {isConnected ? "* Estas conectado al Chat *" : "* No estas conectado al Chat *"}
      </p>
      <div className={styles.contMessages}>
        {mensajes.map((mensaje) => (
          <p key={mensaje}>
            * {mensaje.usuario}: {mensaje.mensaje}
          </p>
        ))}
      </div>
      <input
        className={styles.inputChat}
        placeholder="Escriba lo que guste"
        id="inputChat"
        type="text"
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button className={styles.btnChat} onClick={enviarMensaje}>
        Enviar Mensaje
      </button>
      <h3>Ingresa el codigo de la room </h3>
      <input className={styles.inputChat} id="goRoom" type="text"></input>
      <button className={styles.btnChat} onClick={GoRoom}>
        Entrar a la room
      </button>
    </div>
  );
};

export default ChatComponent;
