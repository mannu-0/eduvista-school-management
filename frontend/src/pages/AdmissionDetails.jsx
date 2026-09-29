import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdmissionDetails.css";

function AdmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/admissions"
        );

        const data = await response.json();

        const foundAdmission = data.find(
          (item) => item._id === id
        );

        setAdmission(foundAdmission || null);
      } catch (error) {
        console.error(
          "Failed to fetch admission:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdmission();
  }, [id]);

  if (loading) {
    return (
      <section className="admission-details-page">
        <div className="details-container">
          <p>Loading application...</p>
        </div>
      </section>
    );
  }

  if (!admission) {
    return (
      <section className="admission-details-page">
        <div className="details-container">
          <h1>Application Not Found</h1>

          <button
            className="back-btn"
            onClick={() => navigate("/admin/admissions")}
          >
            ← Back to Applications
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="admission-details-page">
      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => navigate("/admin/admissions")}
        >
          ← Back to Applications
        </button>

        <div className="details-header">
          <div>
            <span className="section-label">
              ADMISSION APPLICATION
            </span>

            <h1>{admission.studentName}</h1>

            <p>
              Application ID: {admission._id}
            </p>
          </div>

          <div className="details-status">
            {admission.status}
          </div>
        </div>

        <div className="details-card">

          <h2>Student Information</h2>

          <div className="details-grid">
            <div>
              <span>Student Name</span>
              <strong>{admission.studentName}</strong>
            </div>

            <div>
              <span>Date of Birth</span>
              <strong>
                {admission.dateOfBirth
                  ? new Date(
                      admission.dateOfBirth
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Gender</span>
              <strong>
                {admission.gender || "-"}
              </strong>
            </div>

            <div>
              <span>Class Applying For</span>
              <strong>
                {admission.className}
              </strong>
            </div>

            <div>
              <span>Previous School</span>
              <strong>
                {admission.previousSchool || "-"}
              </strong>
            </div>
          </div>

          <hr />

          <h2>Parent / Guardian Information</h2>

          <div className="details-grid">
            <div>
              <span>Father's Name</span>
              <strong>
                {admission.fatherName || "-"}
              </strong>
            </div>

            <div>
              <span>Mother's Name</span>
              <strong>
                {admission.motherName || "-"}
              </strong>
            </div>

            <div>
              <span>Guardian Phone</span>
              <strong>
                {admission.guardianPhone || "-"}
              </strong>
            </div>

            <div>
              <span>Email</span>
              <strong>
                {admission.email || "-"}
              </strong>
            </div>

            <div>
              <span>Occupation</span>
              <strong>
                {admission.occupation || "-"}
              </strong>
            </div>
          </div>

          <hr />

          <h2>Address Information</h2>

          <div className="details-grid">
            <div className="full-width">
              <span>Address</span>
              <strong>
                {admission.address || "-"}
              </strong>
            </div>

            <div>
              <span>City</span>
              <strong>
                {admission.city || "-"}
              </strong>
            </div>

            <div>
              <span>State</span>
              <strong>
                {admission.state || "-"}
              </strong>
            </div>

            <div>
              <span>Pincode</span>
              <strong>
                {admission.pincode || "-"}
              </strong>
            </div>
          </div>

          <hr />

          <h2>Additional Information</h2>

          <div className="message-box">
            {admission.message || "No additional message provided."}
          </div>

          <hr />

          <div className="application-meta">
            <div>
              <span>Application Submitted</span>
              <strong>
                {new Date(
                  admission.createdAt
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Last Updated</span>
              <strong>
                {new Date(
                  admission.updatedAt
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AdmissionDetails;
