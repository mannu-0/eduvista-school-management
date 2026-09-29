import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminStudentDetails.css";

function AdminStudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setStudent(data);
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Failed to load student details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, token]);

  // Delete student
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/students/${id}`,
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
          data.message || "Failed to delete student"
        );
      }

      alert("Student deleted successfully.");

      navigate("/admin/students");
    } catch (error) {
      console.error("Delete student failed:", error);

      alert(
        error.message || "Failed to delete student"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="student-details-page">
        <div className="student-details-container">
          <div className="student-details-message">
            Loading student details...
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="student-details-page">
        <div className="student-details-container">

          <button
            className="student-details-back"
            onClick={() => navigate("/admin/students")}
          >
            ← Back to Students
          </button>

          <div className="student-details-error">
            {error}
          </div>

        </div>
      </div>
    );
  }

  // Student not found
  if (!student) {
    return (
      <div className="student-details-page">
        <div className="student-details-container">

          <div className="student-details-message">
            Student not found.
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="student-details-page">

      <div className="student-details-container">

        {/* Header */}

        <div className="student-details-header">

          <div>

            <span className="section-label">
              STUDENT DETAILS
            </span>

            <h1>
              {student.studentName}
            </h1>

            <p>
              Complete information about the enrolled student.
            </p>

          </div>

          <button
            className="student-details-back"
            onClick={() => navigate("/admin/students")}
          >
            ← Back to Students
          </button>

        </div>


        {/* Status */}

        <div className="student-details-status-card">

          <div>

            <span>
              Admission Status
            </span>

            <strong>
              {student.admissionStatus || "Active"}
            </strong>

          </div>

          <div>

            <span>
              Class
            </span>

            <strong>
              {student.className || "-"}
            </strong>

          </div>

        </div>


        {/* Actions */}

        <div className="student-details-actions">

          <button
            className="student-edit-btn"
            onClick={() =>
              navigate(`/admin/students/${id}/edit`)
            }
          >
            ✎ Edit Student
          </button>

          <button
            className="student-delete-btn"
            onClick={handleDelete}
          >
            🗑 Delete Student
          </button>

        </div>


        {/* Student Information */}

        <div className="student-details-card">

          <h2>
            Student Information
          </h2>

          <div className="student-details-grid">

            <div>
              <span>
                Student Name
              </span>

              <strong>
                {student.studentName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Date of Birth
              </span>

              <strong>
                {student.dateOfBirth
                  ? new Date(
                      student.dateOfBirth
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </strong>
            </div>


            <div>
              <span>
                Gender
              </span>

              <strong>
                {student.gender || "-"}
              </strong>
            </div>


            <div>
              <span>
                Class
              </span>

              <strong>
                {student.className || "-"}
              </strong>
            </div>


            <div>
              <span>
                Previous School
              </span>

              <strong>
                {student.previousSchool || "-"}
              </strong>
            </div>

          </div>

        </div>


        {/* Parent Information */}

        <div className="student-details-card">

          <h2>
            Parent / Guardian Information
          </h2>

          <div className="student-details-grid">

            <div>
              <span>
                Father's Name
              </span>

              <strong>
                {student.fatherName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Mother's Name
              </span>

              <strong>
                {student.motherName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Guardian Phone
              </span>

              <strong>
                {student.guardianPhone || "-"}
              </strong>
            </div>


            <div>
              <span>
                Email
              </span>

              <strong>
                {student.email || "-"}
              </strong>
            </div>


            <div>
              <span>
                Occupation
              </span>

              <strong>
                {student.occupation || "-"}
              </strong>
            </div>

          </div>

        </div>


        {/* Address */}

        <div className="student-details-card">

          <h2>
            Address Information
          </h2>

          <div className="student-details-grid">

            <div className="full-width">

              <span>
                Address
              </span>

              <strong>
                {student.address || "-"}
              </strong>

            </div>


            <div>

              <span>
                City
              </span>

              <strong>
                {student.city || "-"}
              </strong>

            </div>


            <div>

              <span>
                State
              </span>

              <strong>
                {student.state || "-"}
              </strong>

            </div>


            <div>

              <span>
                Pincode
              </span>

              <strong>
                {student.pincode || "-"}
              </strong>

            </div>

          </div>

        </div>


        {/* System Information */}

        <div className="student-details-card">

          <h2>
            System Information
          </h2>

          <div className="student-details-grid">

            <div>

              <span>
                Student ID
              </span>

              <strong>
                {student._id}
              </strong>

            </div>


            <div>

              <span>
                Admission ID
              </span>

              <strong>
                {student.admissionId || "-"}
              </strong>

            </div>


            <div>

              <span>
                Created At
              </span>

              <strong>
                {student.createdAt
                  ? new Date(
                      student.createdAt
                    ).toLocaleString("en-IN")
                  : "-"}
              </strong>

            </div>


            <div>

              <span>
                Last Updated
              </span>

              <strong>
                {student.updatedAt
                  ? new Date(
                      student.updatedAt
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

export default AdminStudentDetails;

