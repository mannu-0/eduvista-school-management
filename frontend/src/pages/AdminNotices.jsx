import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNotices.css";

function AdminNotices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/notices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch notices"
        );
      }

      setNotices(data);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load notices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/notices/${id}`,
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
          data.message || "Failed to delete notice"
        );
      }

      alert("Notice deleted successfully.");

      fetchNotices();
    } catch (err) {
      console.error(err);

      alert(
        err.message || "Failed to delete notice"
      );
    }
  };

  return (
    <div className="admin-notices-page">

      <div className="admin-notices-container">

        {/* Header */}

        <div className="admin-notices-header">

          <div>
            <span className="section-label">
              NOTICE MANAGEMENT
            </span>

            <h1>Notices</h1>

            <p>
              Create and manage school notices.
            </p>
          </div>

          <div className="admin-notices-header-actions">

            <button
              className="admin-notices-back-btn"
              onClick={() => navigate("/admin")}
            >
              ← Dashboard
            </button>

            <button
              className="admin-notices-add-btn"
              onClick={() =>
                navigate("/admin/notices/add")
              }
            >
              + Create Notice
            </button>

          </div>

        </div>


        {/* Stats */}

        <div className="admin-notices-stats">

          <div className="admin-notice-stat-card">
            <span>Total Notices</span>
            <strong>{notices.length}</strong>
          </div>

          <div className="admin-notice-stat-card">
            <span>Published</span>
            <strong>
              {
                notices.filter(
                  (notice) =>
                    notice.status === "Published"
                ).length
              }
            </strong>
          </div>

          <div className="admin-notice-stat-card">
            <span>Drafts</span>
            <strong>
              {
                notices.filter(
                  (notice) =>
                    notice.status === "Draft"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* Notices */}

        <div className="admin-notices-card">

          {loading && (
            <div className="admin-notices-message">
              Loading notices...
            </div>
          )}


          {!loading && error && (
            <div className="admin-notices-error">
              {error}
            </div>
          )}


          {!loading &&
            !error &&
            notices.length === 0 && (
              <div className="admin-notices-message">

                <h3>No notices found</h3>

                <p>
                  Create your first school notice.
                </p>

                <button
                  className="admin-notices-add-btn"
                  onClick={() =>
                    navigate("/admin/notices/add")
                  }
                >
                  + Create Notice
                </button>

              </div>
            )}


          {!loading &&
            !error &&
            notices.length > 0 && (

              <div className="admin-notices-table-wrapper">

                <table className="admin-notices-table">

                  <thead>

                    <tr>
                      <th>Notice</th>
                      <th>Category</th>
                      <th>Publish Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {notices.map((notice) => (

                      <tr key={notice._id}>

                        <td>

                          <div className="notice-title">
                            {notice.title}
                          </div>

                          <div className="notice-description">
                            {notice.description}
                          </div>

                        </td>

                        <td>
                          <span className="notice-category">
                            {notice.category}
                          </span>
                        </td>

                        <td>
                          {notice.publishDate
                            ? new Date(
                                notice.publishDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                        <td>

                          <span
                            className={`notice-status ${
                              notice.status ===
                              "Draft"
                                ? "draft"
                                : ""
                            }`}
                          >
                            {notice.status ||
                              "Published"}
                          </span>

                        </td>

                        <td>

                          <div className="notice-actions">

                            <button
                              className="notice-view-btn"
                              onClick={() =>
                                navigate(
                                  `/admin/notices/${notice._id}`
                                )
                              }
                            >
                              View
                            </button>

                            <button
                              className="notice-edit-btn"
                              onClick={() =>
                                navigate(
                                  `/admin/notices/${notice._id}/edit`
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="notice-delete-btn"
                              onClick={() =>
                                handleDelete(
                                  notice._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default AdminNotices;
