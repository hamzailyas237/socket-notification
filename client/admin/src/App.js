import logo from "./logo.svg";
import "./App.css";
import AdminPanel from "./components/AdminPanel";
import NotificationComponent from "./components/NotificationComponent";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected to server");
});

function App() {
  return (
    <>
      <AdminPanel socket={socket} />
      {/* <NotificationComponent socket={socket} /> */}
    </>
  );
}

export default App;
