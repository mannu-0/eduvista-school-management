import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTeachers.css";

function AdminTeachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/teachers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch teachers"
        );
      }

      setTeachers(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const subjects = [
    ...new Set(
      teachers
        .map((teacher) => teacher.subject)
        .filter(Boolean)
    ),
  ].sort();

  const filteredTeachers = teachers.filter((teacher) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      teacher.teacherName
        ?.toLowerCase()
        .includes(searchText) ||
      teacher.email
        ?.toLowerCase()
        .includes(searchText) ||
      teacher.phone?.includes(search) ||
      teacher.qualification
        ?.toLowerCase()
        .includes(searchText) ||
      teacher.subject
        ?.toLowerCase()
        .includes(searchText);

    const matchesSubject =
      subjectFilter === "All" ||
      teacher.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  });

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  return (
    <div className="teachers-page">
      <div className="teachers-container">

        <div className="teachers-header">
          <div>
            <span className="section-label">
              TEACHER MANAGEMENT
            </span>

            <h1>Teachers</h1>

            <p>
              Manage all teachers and faculty members
              at EduVista School.
            </p>
          </div>

          <button
            className="teachers-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>
        </div>

        <div className="teachers-stats">

          <div className="teacher-stat-card">
            <span>Total Teachers</span>
            <strong>{teachers.length}</strong>
          </div>

          <div className="teacher-stat-card">
            <span>Active Teachers</span>
            <strong>{activeTeachers}</strong>
          </div>

          <div className="teacher-stat-card">
            <span>Subjects</span>
            <strong>{subjects.length}</strong>
          </div>

        </div>

        <div className="teachers-toolbar">

          <input
            type="text"
            placeholder="Search by name, email, phone or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={subjectFilter}
            onChange={(e) =>
              setSubjectFilter(e.target.value)
            }
          >
            <option value="All">
              All Subjects
            </option>

            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              >
                {subject}
              </option>
            ))}
          </select>

          <button
            className="teacher-add-btn"
            onClick={() => navigate("/admin/teachers/add")}
          >

            + Add Teacher
          </button>

          <button
            className="teachers-refresh-btn"
            onClick={fetchTeachers}
          >
            ↻ Refresh
          </button>

        </div>

        <div className="teachers-card">

          {loading && (
            <div className="teachers-message">
              Loading teachers...
            </div>
          )}

          {!loading && error && (
            <div className="teachers-error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredTeachers.length === 0 && (
              <div className="teachers-message">
                No teachers found.
              </div>
            )}

          {!loading &&
            !error &&
            filteredTeachers.length > 0 && (
              <div className="teachers-table-wrapper">

                <table className="teachers-table">

                  <thead>
                    <tr>
                      <th>Teacher</th>
                      <th>Subject</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher._id}>

                        <td>
                          <div className="teacher-name">
                            {teacher.teacherName}
                          </div>

                          <div className="teacher-email">
                            {teacher.email}
                          </div>
                        </td>

                        <td>
                          {teacher.subject || "-"}
                        </td>

                        <td>
                          {teacher.qualification || "-"}
                        </td>

                        <td>
                          {teacher.experience || 0} years
                        </td>

                        <td>
                          {teacher.phone || "-"}
                        </td>

                        <td>
                          <span
                            className={`teacher-status ${
                              teacher.status === "Inactive"
                                ? "inactive"
                                : ""
                            }`}
                          >
                            {teacher.status || "Active"}
                          </span>
                        </td>

                        <td>
                          <button
                            className="teacher-view-btn"
                            onClick={() =>
                              navigate(
                                `/admin/teachers/${teacher._id}`
                              )
                            }
                          >
                            View Details
                          </button>
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

export default AdminTeachers;
