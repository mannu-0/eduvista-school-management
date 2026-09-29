import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/admissions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admissions");
        }

        const admissions = await response.json();

        setStats({
          total: admissions.length,
          pending: admissions.filter(
            (item) => item.status === "Pending"
          ).length,
          reviewed: admissions.filter(
            (item) => item.status === "Reviewed"
          ).length,
          approved: admissions.filter(
            (item) => item.status === "Approved"
          ).length,
          rejected: admissions.filter(
            (item) => item.status === "Rejected"
          ).length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-loading">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">

        {/* Header */}

        <div className="admin-header">

          <div>
            <span className="section-label">
              ADMIN PANEL
            </span>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome to EduVista School Management.
            </p>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* Statistics */}

        <div className="admin-stats-grid">

          <div className="admin-stat-card">

            <span className="admin-stat-label">
              Total Applications
            </span>

            <strong>
              {stats.total}
            </strong>

            <p>
              All admission applications
            </p>

          </div>


          <div className="admin-stat-card">

            <span className="admin-stat-label">
              Pending
            </span>

            <strong>
              {stats.pending}
            </strong>

            <p>
              Waiting for review
            </p>

          </div>


          <div className="admin-stat-card">

            <span className="admin-stat-label">
              Reviewed
            </span>

            <strong>
              {stats.reviewed}
            </strong>

            <p>
              Applications reviewed
            </p>

          </div>


          <div className="admin-stat-card">

            <span className="admin-stat-label">
              Approved
            </span>

            <strong>
              {stats.approved}
            </strong>

            <p>
              Approved applications
            </p>

          </div>


          <div className="admin-stat-card">

            <span className="admin-stat-label">
              Rejected
            </span>

            <strong>
              {stats.rejected}
            </strong>

            <p>
              Rejected applications
            </p>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="admin-card dashboard-actions">

          <div className="dashboard-section-header">

            <div>
              <span className="section-label">
                MANAGEMENT
              </span>

              <h2>
                Quick Actions
              </h2>
            </div>

          </div>


          <div className="dashboard-action-grid">

            <button
              className="dashboard-action"
              onClick={() => navigate("/admin/admissions")}
            >
              <span className="dashboard-action-icon">
                📋
              </span>

              <div>
                <strong>
                  Admission Applications
                </strong>

                <p>
                  View and manage student applications
                </p>
              </div>

              <span>
                →
              </span>
            </button>


            <button
              className="dashboard-action"
              onClick={() => navigate("/admin/students")}
            >
              <span className="dashboard-action-icon">
                🎓
              </span>

              <div>
                <strong>
                  Students
                </strong>

                <p>
                  Manage enrolled students
                </p>
              </div>

              <span>
                →
              </span>
            </button>


            <button
              className="dashboard-action"
              onClick={() => navigate("/admin/teachers")}
            >
              <span className="dashboard-action-icon">
                👨‍🏫
              </span>

              <div>
                <strong>
                  Teachers
                </strong>

                <p>
                  Manage teachers and faculty
                </p>
              </div>

              <span>
                →
              </span>
            </button>


            <button
              className="dashboard-action"
              onClick={() => navigate("/admin/notices")}
            >
              <span className="dashboard-action-icon">
                📢
              </span>

              <div>
                <strong>
                  Notices
                </strong>

                <p>
                  Manage school notices
                </p>
              </div>

              <span>
                →
              </span>
            </button>

            <button
              className="dashboard-card"
              onClick={() => navigate("/admin/schedule")}
            >
              <div className="dashboard-card-icon">
                📅
              </div>

              <div>
                <h3>School Schedule</h3>

                <p>
                  Manage school timings, holidays,
                  vacations and important dates.
                </p>
              </div>

              <span className="dashboard-card-arrow">
                →
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
