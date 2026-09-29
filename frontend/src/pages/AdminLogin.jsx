import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save admin authentication token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // Save admin information
      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      // Login successful → Admin Dashboard
      navigate("/admin");

    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">

      <div className="admin-login-card">

        <span className="section-label">
          ADMINISTRATION
        </span>

        <h1>Admin Login</h1>

        <p className="admin-login-subtitle">
          Sign in to manage admission applications.
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}

          <div className="login-field">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Error */}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* Login Button */}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </section>
  );
}

export default AdminLogin;

