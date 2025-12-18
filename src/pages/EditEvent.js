import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first");
          return;
        }

        const eventRes = await axios.get(
          `https://backendproject-n66m.onrender.com/api/events/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const event = eventRes.data;
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date.slice(0, 10),
          location: event.location,
          capacity: event.capacity || ""
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImage(e.target.files[0]);

  // UPDATE EVENT
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

      await axios.put(
        `https://backendproject-n66m.onrender.com/api/events/${id}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Event updated successfully");
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update event");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Edit Event</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="form-control mb-3"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            required
          />

          <input
            className="form-control mb-3"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />

          <input
            className="form-control mb-3"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
          />

          <input
            className="form-control mb-3"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button className="btn btn-success w-100">Update Event</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
