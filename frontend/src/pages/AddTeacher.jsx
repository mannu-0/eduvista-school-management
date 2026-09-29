import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTeacher.css";

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teacherName: "",
    email: "",
    phone: "",
    gender: "",
    qualification: "",
    subject: "",
    experience: "",
    joiningDate: "",
    address: "",
    city: "",
    state: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5001/api/teachers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            experience: Number(formData.experience) || 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create teacher"
        );
      }

      setSuccess("Teacher added successfully.");

      setTimeout(() => {
        navigate("/admin/teachers");
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-teacher-page">
      <div className="add-teacher-container">

        <div className="add-teacher-header">
          <div>
            <span className="section-label">
              TEACHER MANAGEMENT
            </span>

            <h1>Add Teacher</h1>

            <p>
              Add a new teacher or faculty member
              to EduVista School.
            </p>
          </div>

          <button
            className="add-teacher-back-btn"
            onClick={() => navigate("/admin/teachers")}
          >
            ← Teachers
          </button>
        </div>

        <div className="add-teacher-card">

          <form onSubmit={handleSubmit}>

            <div className="form-section">
              <h2>Personal Information</h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>Teacher Name *</label>

                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="Enter teacher name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="teacher@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone *</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender *</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

              </div>
            </div>

            <div className="form-section">
              <h2>Professional Information</h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>Qualification *</label>

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. M.Sc, B.Ed"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Joining Date *</label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

              </div>
            </div>

            <div className="form-section">
              <h2>Address Information</h2>

              <div className="form-grid">

                <div className="form-group full-width">
                  <label>Address</label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </div>

              </div>
            </div>

            {error && (
              <div className="teacher-form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="teacher-form-success">
                {success}
              </div>
            )}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-teacher-btn"
                onClick={() =>
                  navigate("/admin/teachers")
                }
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-teacher-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Teacher"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default AddTeacher;
