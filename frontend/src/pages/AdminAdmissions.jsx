import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAdmissions.css";

function AdminAdmissions() {
  const navigate = useNavigate();

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5001/api/admissions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch admissions"
        );
      }

      setAdmissions(data);
    } catch (err) {
      console.error("Failed to fetch admissions:", err);
      setError(err.message || "Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5001/api/admissions/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setAdmissions((previousAdmissions) =>
        previousAdmissions.map((admission) =>
          admission._id === id
            ? {
                ...admission,
                status: data.admission.status,
              }
            : admission
        )
      );

      if (
        selectedAdmission &&
        selectedAdmission._id === id
      ) {
        setSelectedAdmission((previous) => ({
          ...previous,
          status: data.admission.status,
        }));
      }
    } catch (err) {
      console.error("Status update failed:", err);

      alert(
        err.message || "Failed to update application status"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  const totalApplications = admissions.length;

  const pendingApplications = admissions.filter(
    (admission) =>
      (admission.status || "Pending") === "Pending"
  ).length;

  const reviewedApplications = admissions.filter(
    (admission) =>
      admission.status === "Reviewed"
  ).length;

  const approvedApplications = admissions.filter(
    (admission) =>
      admission.status === "Approved"
  ).length;

  const rejectedApplications = admissions.filter(
    (admission) =>
      admission.status === "Rejected"
  ).length;

  const filteredAdmissions = admissions.filter(
    (admission) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (admission.studentName || "")
          .toLowerCase()
          .includes(searchText) ||
        (admission.email || "")
          .toLowerCase()
          .includes(searchText) ||
        (admission.guardianPhone || "")
          .toLowerCase()
          .includes(searchText) ||
        (admission.className || "")
          .toLowerCase()
          .includes(searchText);

      const currentStatus =
        admission.status || "Pending";

      const matchesStatus =
        statusFilter === "All" ||
        currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      case "Reviewed":
        return "status-reviewed";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* Header */}
        <div className="admin-header">

          <div>
            <span className="section-label">
              ADMINISTRATION
            </span>

            <h1>
              Admission Applications
            </h1>

            <p>
              Manage and review student admission
              applications.
            </p>
          </div>

          <div className="admin-header-actions">

            <button
              className="admin-refresh-btn"
              onClick={fetchAdmissions}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              className="admin-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>


        {/* Stats */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Total Applications
            </span>

            <strong className="admin-stat-value">
              {totalApplications}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Pending
            </span>

            <strong className="admin-stat-value">
              {pendingApplications}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Reviewed
            </span>

            <strong className="admin-stat-value">
              {reviewedApplications}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Approved
            </span>

            <strong className="admin-stat-value">
              {approvedApplications}
            </strong>
          </div>


          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Rejected
            </span>

            <strong className="admin-stat-value">
              {rejectedApplications}
            </strong>
          </div>

        </div>


        {/* Error */}
        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* Filters */}
        <div className="admin-filters">

          <input
            type="text"
            className="admin-search"
            placeholder="Search student, email, phone or class..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <select
            className="admin-status-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Reviewed">
              Reviewed
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

        </div>


        {/* Applications */}
        <div className="admin-card">

          {loading ? (

            <div className="admin-loading">
              Loading admission applications...
            </div>

          ) : filteredAdmissions.length === 0 ? (

            <div className="admin-empty">
              <h3>
                No applications found
              </h3>

              <p>
                No admission applications match
                your current search or filter.
              </p>
            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Parent / Guardian
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Applied On
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {filteredAdmissions.map(
                    (admission) => {

                      const status =
                        admission.status ||
                        "Pending";

                      return (
                        <tr
                          key={admission._id}
                        >

                          {/* Student */}
                          <td>

                            <div className="student-name">
                              {admission.studentName}
                            </div>

                            <div className="student-email">
                              {admission.email}
                            </div>

                          </td>


                          {/* Class */}
                          <td>
                            {admission.className ||
                              "-"}
                          </td>


                          {/* Parent */}
                          <td>
                            {admission.fatherName ||
                              admission.parentName ||
                              "-"}
                          </td>


                          {/* Phone */}
                          <td>
                            {admission.guardianPhone ||
                              admission.phone ||
                              "-"}
                          </td>


                          {/* Date */}
                          <td>
                            {formatDate(
                              admission.createdAt
                            )}
                          </td>


                          {/* Status */}
                          <td>

                            <select
                              className={`status-select ${getStatusClass(
                                status
                              )}`}
                              value={status}
                              onChange={(e) =>
                                updateStatus(
                                  admission._id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Reviewed">
                                Reviewed
                              </option>

                              <option value="Approved">
                                Approved
                              </option>

                              <option value="Rejected">
                                Rejected
                              </option>

                            </select>

                          </td>


                          {/* Action */}
                          <td>

                            <button
                              className="view-details-btn"
                              onClick={() =>
                                setSelectedAdmission(
                                  admission
                                )
                              }
                            >
                              View Details
                            </button>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* Details Modal */}
      {selectedAdmission && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedAdmission(null)
          }
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>
                <span className="section-label">
                  APPLICATION DETAILS
                </span>

                <h2>
                  {selectedAdmission.studentName}
                </h2>
              </div>

              <button
                className="admin-modal-close"
                onClick={() =>
                  setSelectedAdmission(null)
                }
              >
                ×
              </button>

            </div>


            <div className="admin-modal-body">

              {/* Student Information */}
              <div className="detail-section">

                <h3>
                  Student Information
                </h3>

                <div className="detail-grid">

                  <div>
                    <span>
                      Student Name
                    </span>

                    <strong>
                      {selectedAdmission.studentName ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Date of Birth
                    </span>

                    <strong>
                      {selectedAdmission.dateOfBirth
                        ? formatDate(
                            selectedAdmission.dateOfBirth
                          )
                        : "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Gender
                    </span>

                    <strong>
                      {selectedAdmission.gender ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Class Applying For
                    </span>

                    <strong>
                      {selectedAdmission.className ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Previous School
                    </span>

                    <strong>
                      {selectedAdmission.previousSchool ||
                        "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* Parent Information */}
              <div className="detail-section">

                <h3>
                  Parent / Guardian Information
                </h3>

                <div className="detail-grid">

                  <div>
                    <span>
                      Father's Name
                    </span>

                    <strong>
                      {selectedAdmission.fatherName ||
                        selectedAdmission.parentName ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Mother's Name
                    </span>

                    <strong>
                      {selectedAdmission.motherName ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Phone
                    </span>

                    <strong>
                      {selectedAdmission.guardianPhone ||
                        selectedAdmission.phone ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Email
                    </span>

                    <strong>
                      {selectedAdmission.email ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Occupation
                    </span>

                    <strong>
                      {selectedAdmission.occupation ||
                        "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* Address */}
              <div className="detail-section">

                <h3>
                  Address
                </h3>

                <p className="detail-address">
                  {selectedAdmission.address ||
                    "-"}
                </p>

                <div className="detail-grid">

                  <div>
                    <span>
                      City
                    </span>

                    <strong>
                      {selectedAdmission.city ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      State
                    </span>

                    <strong>
                      {selectedAdmission.state ||
                        "-"}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Pincode
                    </span>

                    <strong>
                      {selectedAdmission.pincode ||
                        "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* Additional Information */}
              <div className="detail-section">

                <h3>
                  Additional Information
                </h3>

                <p className="detail-message">
                  {selectedAdmission.message ||
                    "No additional information provided."}
                </p>

              </div>


              {/* Status */}
              <div className="detail-section">

                <h3>
                  Application Status
                </h3>

                <select
                  className={`status-select ${getStatusClass(
                    selectedAdmission.status ||
                      "Pending"
                  )}`}
                  value={
                    selectedAdmission.status ||
                    "Pending"
                  }
                  onChange={(e) =>
                    updateStatus(
                      selectedAdmission._id,
                      e.target.value
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Reviewed">
                    Reviewed
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>


              {/* Dates */}
              <div className="detail-meta">

                <span>
                  Application ID:
                  {" "}
                  {selectedAdmission._id}
                </span>

                <span>
                  Submitted:
                  {" "}
                  {formatDate(
                    selectedAdmission.createdAt
                  )}
                </span>

                <span>
                  Last Updated:
                  {" "}
                  {formatDate(
                    selectedAdmission.updatedAt
                  )}
                </span>

              </div>

            </div>


            <div className="admin-modal-footer">

              <button
                className="admin-modal-close-btn"
                onClick={() =>
                  setSelectedAdmission(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminAdmissions;


