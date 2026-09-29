import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNotice.css";

function CreateNotice() {
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    publishDate: "",
    status: "Published",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/notices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create notice"
        );
      }

      alert("Notice created successfully.");

      navigate("/admin/notices");
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to create notice"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create-notice-page">

      <div className="create-notice-container">

        {/* Header */}

        <div className="create-notice-header">

          <div>

            <span className="section-label">
              NOTICE MANAGEMENT
            </span>

            <h1>Create Notice</h1>

            <p>
              Create a new school notice for students,
              parents and staff.
            </p>

          </div>

          <button
            className="create-notice-back-btn"
            onClick={() =>
              navigate("/admin/notices")
            }
          >
            ← Notices
          </button>

        </div>


        {/* Form */}

        <form
          className="create-notice-card"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="create-notice-error">
              {error}
            </div>
          )}


          {/* Title */}

          <div className="notice-form-group">

            <label htmlFor="title">
              Notice Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter notice title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* Description */}

          <div className="notice-form-group">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Write the complete notice..."
              rows="7"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>


          {/* Category + Status */}

          <div className="notice-form-grid">

            <div className="notice-form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">
                  General
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Event">
                  Event
                </option>

                <option value="Holiday">
                  Holiday
                </option>

                <option value="Exam">
                  Exam
                </option>

                <option value="Important">
                  Important
                </option>
              </select>

            </div>


            <div className="notice-form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Published">
                  Published
                </option>

                <option value="Draft">
                  Draft
                </option>
              </select>

            </div>

          </div>


          {/* Publish Date */}

          <div className="notice-form-group">

            <label htmlFor="publishDate">
              Publish Date
            </label>

            <input
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
              required
            />

          </div>


          {/* Actions */}

          <div className="create-notice-actions">

            <button
              type="button"
              className="create-notice-cancel-btn"
              onClick={() =>
                navigate("/admin/notices")
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-notice-submit-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Create Notice"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateNotice;
