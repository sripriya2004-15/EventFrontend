import React from "react";
import HomeImage from "../assets/images/home.jpg"; // optional hero image
import "./Home.css";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="home-container">
        <img src={HomeImage} alt="Home" className="home-image" />
        <div className="home-overlay"></div> {/* Gradient overlay */}
        <div className="home-text">
          <h1>Welcome to Our Event Portal</h1>
          <p>Discover amazing events and stay updated!</p>
        
        </div>
      </div>

      {/* Description Section */}
      <div className="home-description container mt-5 p-4 shadow-sm rounded text-center">
        <h2>About Our Website</h2>
        <p className="lead mt-3">
          Our platform allows you to explore and join various events happening in your college or community. 
          You can view upcoming events, register for them, and stay updated with the latest activities. 
          Whether it’s workshops, seminars, exhibitions, or concerts, our portal keeps you informed and connected.
        </p>
        <p className="mt-3">
          Navigate through the website using the menu above to check upcoming events, register, and login to your account.
        </p>
      </div>
    </div>
  );
}

export default Home;
