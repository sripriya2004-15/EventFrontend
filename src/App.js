import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Events from "./pages/Event";
import EditEvent from "./pages/EditEvent";

function App() {
  // Theme state
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events" element={<Events theme={theme} />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
