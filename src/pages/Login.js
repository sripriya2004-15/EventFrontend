import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
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
        "https://backendproject-n66m.onrender.com/api/auth/login",
        formData
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 animated-card">
            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="input-container mb-3">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-control input-with-icon"
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
                  className="form-control input-with-icon"
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

              <button
                type="submit"
                className="btn btn-dark w-100 btn-animated"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              Don’t have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
