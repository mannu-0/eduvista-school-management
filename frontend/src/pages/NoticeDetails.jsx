import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NoticeDetails.css";

function NoticeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5001/api/notices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch notice"
          );
        }

        setNotice(data);
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Failed to load notice details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice? This action cannot be undone."
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

      navigate("/admin/notices");
    } catch (err) {
      console.error(err);

      alert(
        err.message || "Failed to delete notice"
      );
    }
  };

  if (loading) {
    return (
      <div className="notice-details-page">
        <div className="notice-details-container">
          <div className="notice-details-message">
            Loading notice details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notice-details-page">
        <div className="notice-details-container">

          <button
            className="notice-details-back-btn"
            onClick={() =>
              navigate("/admin/notices")
            }
          >
            ← Notices
          </button>

          <div className="notice-details-error">
            {error}
          </div>

        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="notice-details-page">
        <div className="notice-details-container">
          <div className="notice-details-message">
            Notice not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-details-page">

      <div className="notice-details-container">

        {/* Header */}

        <div className="notice-details-header">

          <div>
            <span className="section-label">
              NOTICE MANAGEMENT
            </span>

            <h1>{notice.title}</h1>

            <p>
              Complete information about this school notice.
            </p>
          </div>

          <button
            className="notice-details-back-btn"
            onClick={() =>
              navigate("/admin/notices")
            }
          >
            ← Notices
          </button>

        </div>


        {/* Status */}

        <div className="notice-details-status-card">

          <div>
            <span>Status</span>

            <strong>
              {notice.status || "Published"}
            </strong>
          </div>

          <div>
            <span>Category</span>

            <strong>
              {notice.category || "General"}
            </strong>
          </div>

          <div>
            <span>Publish Date</span>

            <strong>
              {notice.publishDate
                ? new Date(
                    notice.publishDate
                  ).toLocaleDateString("en-IN")
                : "-"}
            </strong>
          </div>

        </div>


        {/* Actions */}

        <div className="notice-details-actions">

          <button
            className="notice-details-edit-btn"
            onClick={() =>
              navigate(
                `/admin/notices/${id}/edit`
              )
            }
          >
            ✎ Edit Notice
          </button>

          <button
            className="notice-details-delete-btn"
            onClick={handleDelete}
          >
            🗑 Delete Notice
          </button>

        </div>


        {/* Notice Content */}

        <div className="notice-details-card">

          <h2>Notice Details</h2>

          <div className="notice-details-content">

            <h3>{notice.title}</h3>

            <p>
              {notice.description}
            </p>

          </div>

        </div>


        {/* System Information */}

        <div className="notice-details-card">

          <h2>System Information</h2>

          <div className="notice-details-grid">

            <div>
              <span>Notice ID</span>

              <strong>
                {notice._id}
              </strong>
            </div>

            <div>
              <span>Created At</span>

              <strong>
                {notice.createdAt
                  ? new Date(
                      notice.createdAt
                    ).toLocaleString("en-IN")
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Last Updated</span>

              <strong>
                {notice.updatedAt
                  ? new Date(
                      notice.updatedAt
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

export default NoticeDetails;
