import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEvent.css"; // For custom animations

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const eventData = new FormData();
      Object.keys(formData).forEach((key) =>
        eventData.append(key, formData[key])
      );
      if (image) eventData.append("image", image);

      await axios.post("https://backendproject-n66m.onrender.com/api/events", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event created successfully");
      setFormData({ title: "", description: "", date: "", location: "", capacity: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow animate-card mx-auto">
        <h3 className="text-center mb-4 animate-title">Create Event</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="form-control mb-3 animate-input"
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="form-control mb-3 animate-input"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3 animate-input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3 animate-input"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3 animate-input"
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3 animate-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button className="btn btn-dark w-100 animate-btn">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
