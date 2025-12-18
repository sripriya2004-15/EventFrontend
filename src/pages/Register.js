import axios from "axios";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backendproject-n66m.onrender.com/api/auth/register",
        formData
      );
      alert(res.data.message);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 animated-card">
            <h2 className="text-center mb-4">Register</h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="input-container mb-3">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  className="form-control input-with-icon text-left"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="input-container mb-3">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-control input-with-icon text-left"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-container mb-3">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control input-with-icon text-left"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit" className="btn btn-dark text-white w-100 btn-animated">
                Register
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
