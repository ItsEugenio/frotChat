import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatComponent from "./components/Chat";
import ChatRoom from "./components/ChatRoom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatComponent/>} />
        <Route path="/ChatRoom" element={<ChatRoom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
