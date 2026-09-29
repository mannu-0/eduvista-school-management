import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTeacher.css";

function EditTeacher() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5001/api/teachers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch teacher"
          );
        }

        setFormData({
          teacherName: data.teacherName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          qualification: data.qualification || "",
          subject: data.subject || "",
          experience: data.experience ?? "",
          joiningDate: data.joiningDate
            ? data.joiningDate.split("T")[0]
            : "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          status: data.status || "Active",
        });
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Failed to load teacher"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id, token]);

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
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `http://localhost:5001/api/teachers/${id}`,
        {
          method: "PATCH",
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
          data.message || "Failed to update teacher"
        );
      }

      setSuccess("Teacher updated successfully.");

      setTimeout(() => {
        navigate(`/admin/teachers/${id}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to update teacher"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-teacher-page">
        <div className="edit-teacher-container">
          <div className="edit-teacher-message">
            Loading teacher information...
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.teacherName) {
    return (
      <div className="edit-teacher-page">
        <div className="edit-teacher-container">

          <button
            className="edit-teacher-back-btn"
            onClick={() => navigate("/admin/teachers")}
          >
            ← Teachers
          </button>

          <div className="edit-teacher-error">
            {error}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="edit-teacher-page">
      <div className="edit-teacher-container">

        <div className="edit-teacher-header">
          <div>
            <span className="section-label">
              TEACHER MANAGEMENT
            </span>

            <h1>Edit Teacher</h1>

            <p>
              Update teacher and faculty information.
            </p>
          </div>

          <button
            className="edit-teacher-back-btn"
            onClick={() =>
              navigate(`/admin/teachers/${id}`)
            }
          >
            ← Details
          </button>
        </div>

        <div className="edit-teacher-card">

          <form onSubmit={handleSubmit}>

            <div className="edit-form-section">
              <h2>Personal Information</h2>

              <div className="edit-form-grid">

                <div className="edit-form-group">
                  <label>Teacher Name *</label>

                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Phone *</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
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

            <div className="edit-form-section">
              <h2>Professional Information</h2>

              <div className="edit-form-grid">

                <div className="edit-form-group">
                  <label>Qualification *</label>

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Subject *</label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label>Experience (Years)</label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div className="edit-form-group">
                  <label>Joining Date *</label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="edit-form-group">
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

            <div className="edit-form-section">
              <h2>Address Information</h2>

              <div className="edit-form-grid">

                <div className="edit-form-group edit-full-width">
                  <label>Address</label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="edit-form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {error && (
              <div className="edit-teacher-form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="edit-teacher-form-success">
                {success}
              </div>
            )}

            <div className="edit-form-actions">

              <button
                type="button"
                className="edit-cancel-btn"
                onClick={() =>
                  navigate(`/admin/teachers/${id}`)
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Updating..."
                  : "Update Teacher"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default EditTeacher;
