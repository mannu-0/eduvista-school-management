import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    previousSchool: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    email: "",
    occupation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    admissionStatus: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5001/api/students/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch student"
          );
        }

        setFormData({
          studentName: data.studentName || "",
          dateOfBirth: data.dateOfBirth
            ? data.dateOfBirth.split("T")[0]
            : "",
          gender: data.gender || "",
          className: data.className || "",
          previousSchool: data.previousSchool || "",
          fatherName: data.fatherName || "",
          motherName: data.motherName || "",
          guardianPhone: data.guardianPhone || "",
          email: data.email || "",
          occupation: data.occupation || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          admissionStatus:
            data.admissionStatus || "Active",
        });
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Failed to load student"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
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
        `http://localhost:5001/api/students/${id}`,
        {
          method: "PATCH",
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
          data.message || "Failed to update student"
        );
      }

      setSuccess("Student updated successfully.");

      setTimeout(() => {
        navigate(`/admin/students/${id}`);
      }, 800);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to update student"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-student-page">
        <div className="edit-student-container">
          <div className="edit-student-message">
            Loading student information...
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.studentName) {
    return (
      <div className="edit-student-page">
        <div className="edit-student-container">

          <button
            className="edit-student-back-btn"
            onClick={() =>
              navigate("/admin/students")
            }
          >
            ← Students
          </button>

          <div className="edit-student-error">
            {error}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="edit-student-page">

      <div className="edit-student-container">

        {/* Header */}
        <div className="edit-student-header">

          <div>
            <span className="section-label">
              STUDENT MANAGEMENT
            </span>

            <h1>
              Edit Student
            </h1>

            <p>
              Update student and parent information.
            </p>
          </div>

          <button
            className="edit-student-back-btn"
            onClick={() =>
              navigate(`/admin/students/${id}`)
            }
          >
            ← Details
          </button>

        </div>


        {/* Form */}
        <div className="edit-student-card">

          <form onSubmit={handleSubmit}>

            {/* Student Information */}
            <div className="edit-student-section">

              <h2>
                Student Information
              </h2>

              <div className="edit-student-grid">

                <div className="edit-student-group">
                  <label>
                    Student Name *
                  </label>

                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Date of Birth *
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Gender *
                  </label>

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


                <div className="edit-student-group">
                  <label>
                    Class *
                  </label>

                  <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group edit-student-full">
                  <label>
                    Previous School
                  </label>

                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>


            {/* Parent Information */}
            <div className="edit-student-section">

              <h2>
                Parent / Guardian Information
              </h2>

              <div className="edit-student-grid">

                <div className="edit-student-group">
                  <label>
                    Father's Name *
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Guardian Phone *
                  </label>

                  <input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Occupation
                  </label>

                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>


            {/* Address */}
            <div className="edit-student-section">

              <h2>
                Address Information
              </h2>

              <div className="edit-student-grid">

                <div className="edit-student-group edit-student-full">
                  <label>
                    Address *
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    State *
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="edit-student-group">
                  <label>
                    Pincode *
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

            </div>


            {/* Status */}
            <div className="edit-student-section">

              <h2>
                Admission Status
              </h2>

              <div className="edit-student-grid">

                <div className="edit-student-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="admissionStatus"
                    value={formData.admissionStatus}
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


            {/* Messages */}
            {error && (
              <div className="edit-student-form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="edit-student-form-success">
                {success}
              </div>
            )}


            {/* Actions */}
            <div className="edit-student-actions">

              <button
                type="button"
                className="edit-student-cancel-btn"
                onClick={() =>
                  navigate(`/admin/students/${id}`)
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-student-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Updating..."
                  : "Update Student"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditStudent;
