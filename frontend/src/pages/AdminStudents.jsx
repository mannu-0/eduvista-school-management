import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStudents.css";

function AdminStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch students"
        );
      }

      setStudents(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const classes = [
    ...new Set(
      students
        .map((student) => student.className)
        .filter(Boolean)
    ),
  ].sort();

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.studentName?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText) ||
      student.fatherName?.toLowerCase().includes(searchText) ||
      student.motherName?.toLowerCase().includes(searchText) ||
      student.guardianPhone?.includes(search);

    const matchesClass =
      classFilter === "All" ||
      student.className === classFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="students-page">

      <div className="students-container">

        {/* Header */}
        <div className="students-header">

          <div>
            <span className="section-label">
              STUDENT MANAGEMENT
            </span>

            <h1>Students</h1>

            <p>
              Manage all enrolled students at EduVista School.
            </p>
          </div>

          <button
            className="students-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>

        </div>


        {/* Stats */}
        <div className="students-stats">

          <div className="student-stat-card">
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

          <div className="student-stat-card">
            <span>Active Students</span>
            <strong>
              {
                students.filter(
                  (student) =>
                    student.admissionStatus === "Active"
                ).length
              }
            </strong>
          </div>

          <div className="student-stat-card">
            <span>Classes</span>
            <strong>{classes.length}</strong>
          </div>

        </div>


        {/* Filters */}
        <div className="students-toolbar">

          <input
            type="text"
            placeholder="Search by name, email, parent or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={classFilter}
            onChange={(e) =>
              setClassFilter(e.target.value)
            }
          >
            <option value="All">
              All Classes
            </option>

            {classes.map((className) => (
              <option
                key={className}
                value={className}
              >
                {className}
              </option>
            ))}
          </select>

          <button
            className="students-refresh-btn"
            onClick={fetchStudents}
          >
            ↻ Refresh
          </button>

        </div>


        {/* Content */}
        <div className="students-card">

          {loading && (
            <div className="students-message">
              Loading students...
            </div>
          )}


          {!loading && error && (
            <div className="students-error">
              {error}
            </div>
          )}


          {!loading &&
            !error &&
            filteredStudents.length === 0 && (
              <div className="students-message">
                No students found.
              </div>
            )}


          {!loading &&
            !error &&
            filteredStudents.length > 0 && (

              <div className="students-table-wrapper">

                <table className="students-table">

                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Parent</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredStudents.map((student) => (

                      <tr key={student._id}>

                        <td>
                          <div className="student-name">
                            {student.studentName}
                          </div>

                          <div className="student-email">
                            {student.email}
                          </div>
                        </td>


                        <td>
                          {student.className || "-"}
                        </td>


                        <td>
                          {student.fatherName || "-"}
                        </td>


                        <td>
                          {student.guardianPhone || "-"}
                        </td>


                        <td>
                          {student.city || "-"}
                        </td>


                        <td>
                          <span className="student-status">
                            {student.admissionStatus || "Active"}
                          </span>
                        </td>


                        <td>
                          <button
                            className="student-view-btn"
                            onClick={() =>
                              navigate(
                                `/admin/students/${student._id}`
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

export default AdminStudents;
