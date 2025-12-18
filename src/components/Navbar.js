import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>MERN Events</h3>

      {isMobile && (
        <div style={styles.hamburger} onClick={toggleMenu}>
          <div style={{ ...styles.bar, transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></div>
          <div style={{ ...styles.bar, opacity: isOpen ? 0 : 1 }}></div>
          <div style={{ ...styles.bar, transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></div>
        </div>
      )}

      <ul
        style={{
          ...styles.ul,
          ...(isMobile
            ? {
                maxHeight: isOpen ? "300px" : "0px",
                overflow: "hidden",
                flexDirection: "column",
                position: "absolute",
                top: "60px",
                left: 0,
                width: "100%",
                backgroundColor: "#282c34",
                transition: "max-height 0.3s ease",
                zIndex: 100,
                gap: "15px",
                padding: isOpen ? "10px 0" : "0",
                textAlign: "center", // center text
              }
            : {
                display: "flex",
                flexDirection: "row",
                position: "static",
                backgroundColor: "transparent",
                maxHeight: "none",
                overflow: "visible",
                gap: "15px",
                padding: 0,
                textAlign: "left",
              }),
        }}
      >
        <li>
          <Link to="/" style={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/add-event" style={styles.link} onClick={() => setIsOpen(false)}>Add Event</Link>
        </li>
        <li>
          <Link to="/events" style={styles.link} onClick={() => setIsOpen(false)}>Events</Link>
        </li>
        <li>
          <Link to="/register" style={styles.link} onClick={() => setIsOpen(false)}>Register</Link>
        </li>
        <li>
          <Link to="/login" style={styles.link} onClick={() => setIsOpen(false)}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    position: "relative",
    zIndex: 1000,
  },
  logo: {
    color: "white",
    fontSize: "20px",
  },
  ul: {
    listStyle: "none",
    margin: 0,
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px 0", // more spacing vertically
    display: "block",
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "5px",
    zIndex: 1001,
  },
  bar: {
    width: "25px",
    height: "3px",
    backgroundColor: "white",
    transition: "all 0.3s ease",
  },
};

export default Navbar;
