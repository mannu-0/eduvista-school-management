import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSchedule.css";

function AdminSchedule() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    type: "timing",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    status: "Active",
  });

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/schedules"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch schedules"
        );
      }

      setSchedules(data);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load schedules"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      type: "timing",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      status: "Active",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const url = editingId
        ? `http://localhost:5001/api/schedules/${editingId}`
        : "http://localhost:5001/api/schedules";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save schedule"
        );
      }

      await fetchSchedules();

      resetForm();
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to save schedule"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);

    setForm({
      type: schedule.type || "timing",
      title: schedule.title || "",
      description: schedule.description || "",
      startDate: schedule.startDate
        ? schedule.startDate.slice(0, 10)
        : "",
      endDate: schedule.endDate
        ? schedule.endDate.slice(0, 10)
        : "",
      startTime: schedule.startTime || "",
      endTime: schedule.endTime || "",
      status: schedule.status || "Active",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `http://localhost:5001/api/schedules/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete schedule"
        );
      }

      setSchedules((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to delete schedule"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTypeLabel = (type) => {
    const labels = {
      timing: "School Timing",
      holiday: "Holiday",
      vacation: "Vacation",
      academic: "Academic",
      event: "School Event",
    };

    return labels[type] || type;
  };

  return (
    <div className="admin-schedule-page">

      {/* Header */}

      <div className="admin-schedule-header">

        <div>

          <span className="section-label">
            SCHOOL MANAGEMENT
          </span>

          <h1>
            Schedule & Calendar
          </h1>

          <p>
            Manage school timings, holidays, vacations,
            academic dates and events.
          </p>

        </div>

        <button
          className="schedule-back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Dashboard
        </button>

      </div>


      {/* Error */}

      {error && (
        <div className="schedule-error">
          {error}
        </div>
      )}


      {/* Top Actions */}

      <div className="schedule-toolbar">

        <div>
          <strong>
            {schedules.length}
          </strong>

          <span>
            Active Schedules
          </span>
        </div>

        <button
          className="schedule-add-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm
            ? "✕ Close Form"
            : "+ Add Schedule"}
        </button>

      </div>


      {/* Form */}

      {showForm && (
        <div className="schedule-form-card">

          <div className="schedule-form-header">

            <div>

              <span className="section-label">
                {editingId
                  ? "EDIT SCHEDULE"
                  : "NEW SCHEDULE"}
              </span>

              <h2>
                {editingId
                  ? "Update Schedule"
                  : "Create Schedule"}
              </h2>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="schedule-form-grid">

              {/* Type */}

              <div className="form-group">

                <label>
                  Schedule Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >

                  <option value="timing">
                    School Timing
                  </option>

                  <option value="holiday">
                    Holiday
                  </option>

                  <option value="vacation">
                    Vacation
                  </option>

                  <option value="academic">
                    Academic
                  </option>

                  <option value="event">
                    School Event
                  </option>

                </select>

              </div>


              {/* Status */}

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
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


              {/* Title */}

              <div className="form-group full">

                <label>
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Example: Summer School Timing"
                  value={form.title}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Description */}

              <div className="form-group full">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter details about this schedule..."
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                />

              </div>


              {/* Start Date */}

              <div className="form-group">

                <label>
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />

              </div>


              {/* End Date */}

              <div className="form-group">

                <label>
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                />

              </div>


              {/* Start Time */}

              <div className="form-group">

                <label>
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />

              </div>


              {/* End Time */}

              <div className="form-group">

                <label>
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="schedule-form-actions">

              <button
                type="button"
                className="schedule-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="schedule-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Schedule"
                  : "Create Schedule"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Schedule List */}

      <div className="schedule-list-card">

        <div className="schedule-list-header">

          <div>

            <span className="section-label">
              MANAGED SCHEDULES
            </span>

            <h2>
              School Calendar
            </h2>

          </div>

          <button
            className="schedule-refresh-btn"
            onClick={fetchSchedules}
          >
            ↻ Refresh
          </button>

        </div>


        {loading && (
          <div className="schedule-message">
            Loading schedules...
          </div>
        )}


        {!loading &&
          schedules.length === 0 && (
            <div className="schedule-empty">

              <div>
                📅
              </div>

              <h3>
                No schedules yet
              </h3>

              <p>
                Create your first school schedule,
                holiday or vacation.
              </p>

              <button
                onClick={() => setShowForm(true)}
              >
                + Add First Schedule
              </button>

            </div>
          )}


        {!loading &&
          schedules.length > 0 && (

            <div className="schedule-table-wrapper">

              <table className="schedule-table">

                <thead>

                  <tr>

                    <th>
                      Schedule
                    </th>

                    <th>
                      Type
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Time
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {schedules.map((schedule) => (

                    <tr key={schedule._id}>

                      <td>

                        <div className="schedule-title">
                          {schedule.title}
                        </div>

                        <div className="schedule-description">
                          {schedule.description ||
                            "No description"}
                        </div>

                      </td>


                      <td>

                        <span
                          className={`schedule-type ${schedule.type}`}
                        >
                          {getTypeLabel(
                            schedule.type
                          )}
                        </span>

                      </td>


                      <td>

                        <div className="schedule-date">

                          {formatDate(
                            schedule.startDate
                          )}

                          {schedule.endDate && (
                            <>
                              <span> → </span>

                              {formatDate(
                                schedule.endDate
                              )}
                            </>
                          )}

                        </div>

                      </td>


                      <td>

                        {schedule.startTime ||
                        schedule.endTime ? (
                          <span className="schedule-time">
                            {schedule.startTime || "--"}
                            {" – "}
                            {schedule.endTime || "--"}
                          </span>
                        ) : (
                          "-"
                        )}

                      </td>


                      <td>

                        <span
                          className={`schedule-status ${
                            schedule.status ===
                            "Inactive"
                              ? "inactive"
                              : ""
                          }`}
                        >
                          {schedule.status}
                        </span>

                      </td>


                      <td>

                        <div className="schedule-actions">

                          <button
                            className="schedule-edit-btn"
                            onClick={() =>
                              handleEdit(schedule)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="schedule-delete-btn"
                            onClick={() =>
                              handleDelete(
                                schedule._id
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
  );
}

export default AdminSchedule;