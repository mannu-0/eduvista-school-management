import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminTeacherDetails.css";

function AdminTeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setTeacher(data);
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Failed to load teacher details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id, token]);

  // Delete teacher
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/teachers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete teacher"
        );
      }

      alert("Teacher deleted successfully.");

      navigate("/admin/teachers");
    } catch (err) {
      console.error("Delete teacher failed:", err);

      alert(
        err.message || "Failed to delete teacher"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="teacher-details-page">
        <div className="teacher-details-container">
          <div className="teacher-details-message">
            Loading teacher details...
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="teacher-details-page">
        <div className="teacher-details-container">

          <button
            className="teacher-details-back-btn"
            onClick={() => navigate("/admin/teachers")}
          >
            ← Teachers
          </button>

          <div className="teacher-details-error">
            {error}
          </div>

        </div>
      </div>
    );
  }

  if (!teacher) {
    return null;
  }

  return (
    <div className="teacher-details-page">

      <div className="teacher-details-container">

        {/* Header */}
        <div className="teacher-details-header">

          <div>
            <span className="section-label">
              TEACHER MANAGEMENT
            </span>

            <h1>
              {teacher.teacherName}
            </h1>

            <p>
              Teacher profile and professional information.
            </p>
          </div>

          <button
            className="teacher-details-back-btn"
            onClick={() => navigate("/admin/teachers")}
          >
            ← Teachers
          </button>

        </div>


        {/* Teacher Profile */}
        <div className="teacher-profile-card">

          <div className="teacher-profile-main">

            {/* Avatar */}
            <div className="teacher-avatar">
              {teacher.teacherName
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* Basic Information */}
            <div>

              <h2>
                {teacher.teacherName}
              </h2>

              <p>
                {teacher.subject || "Subject not specified"}
              </p>

              <span
                className={`teacher-detail-status ${
                  teacher.status === "Inactive"
                    ? "inactive"
                    : ""
                }`}
              >
                {teacher.status || "Active"}
              </span>

            </div>

          </div>


          {/* Actions */}
          <div className="teacher-profile-actions">

            <button
              className="teacher-edit-btn"
              onClick={() =>
                navigate(`/admin/teachers/${id}/edit`)
              }
            >
              ✎ Edit Teacher
            </button>

            <button
              className="teacher-delete-btn"
              onClick={handleDelete}
            >
              🗑 Delete Teacher
            </button>

          </div>

        </div>


        {/* Details Grid */}
        <div className="teacher-detail-grid">

          {/* Personal Information */}
          <div className="teacher-info-card">

            <h2>
              Personal Information
            </h2>

            <div className="teacher-info-row">
              <span>Name</span>

              <strong>
                {teacher.teacherName || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Email</span>

              <strong>
                {teacher.email || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Phone</span>

              <strong>
                {teacher.phone || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Gender</span>

              <strong>
                {teacher.gender || "-"}
              </strong>
            </div>

          </div>


          {/* Professional Information */}
          <div className="teacher-info-card">

            <h2>
              Professional Information
            </h2>

            <div className="teacher-info-row">
              <span>Qualification</span>

              <strong>
                {teacher.qualification || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Subject</span>

              <strong>
                {teacher.subject || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Experience</span>

              <strong>
                {teacher.experience || 0} years
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Joining Date</span>

              <strong>
                {teacher.joiningDate
                  ? new Date(
                      teacher.joiningDate
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </strong>
            </div>

          </div>


          {/* Address Information */}
          <div className="teacher-info-card">

            <h2>
              Address Information
            </h2>

            <div className="teacher-info-row">
              <span>Address</span>

              <strong>
                {teacher.address || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>City</span>

              <strong>
                {teacher.city || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>State</span>

              <strong>
                {teacher.state || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Pincode</span>

              <strong>
                {teacher.pincode || "-"}
              </strong>
            </div>

          </div>


          {/* System Information */}
          <div className="teacher-info-card">

            <h2>
              System Information
            </h2>

            <div className="teacher-info-row">
              <span>Status</span>

              <strong>
                {teacher.status || "Active"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Teacher ID</span>

              <strong>
                {teacher._id || "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Created</span>

              <strong>
                {teacher.createdAt
                  ? new Date(
                      teacher.createdAt
                    ).toLocaleString("en-IN")
                  : "-"}
              </strong>
            </div>

            <div className="teacher-info-row">
              <span>Last Updated</span>

              <strong>
                {teacher.updatedAt
                  ? new Date(
                      teacher.updatedAt
                    ).toLocaleString("en-IN")
                  : "-"}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminTeacherDetails;
