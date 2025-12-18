import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🔍 NEW: search state
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      let headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await axios.get("https://backendproject-n66m.onrender.com/api/events", { headers });
      setEvents(res.data);

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      await axios.post(
        `https://backendproject-n66m.onrender.com/api/events/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Successfully registered for the event!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to register for event");
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      await axios.delete(`https://backendproject-n66m.onrender.com/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  // 🔍 NEW: filtered events
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Events</h2>

      {/* 🔍 SEARCH BAR */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredEvents.length === 0 ? (
          <p className="text-center">No events found</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="col-md-6 mb-4">
              <div className="card shadow p-3 h-100 position-relative">
                {event.image && (
                  <img
                    src={`https://backendproject-n66m.onrender.com/uploads/${event.image}`}
                    alt={event.title}
                    className="card-img-top mb-3"
                    style={{
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "5px"
                    }}
                  />
                )}

                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Capacity:</strong> {event.capacity || "N/A"}</p>
                <p><strong>Attendees:</strong> {event.attendees.length}</p>

                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={() => handleRegister(event._id)}
                >
                  Register / Join
                </button>

                {/* Creator-only buttons */}
                {event.createdBy &&
                  ((typeof event.createdBy === "string" && userId === event.createdBy) ||
                    (event.createdBy._id &&
                      userId === event.createdBy._id.toString())) && (
                    <>
                      <button
                        className="btn btn-warning w-100 mb-2"
                        onClick={() => navigate(`/events/edit/${event._id}`)}
                      >
                        Update Event
                      </button>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete Event
                      </button>
                    </>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
