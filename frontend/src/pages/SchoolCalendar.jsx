import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SchoolCalendar.css";

function SchoolCalendar() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
        console.error("Schedule fetch error:", err);

        setError(
          err.message || "Failed to load school calendar"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatShortDate = (date) => {
    if (!date) return "";

    return new Date(date)
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
      .toUpperCase();
  };

  const timings = schedules.filter(
    (item) => item.type === "timing"
  );

  const vacations = schedules.filter(
    (item) => item.type === "vacation"
  );

  const holidays = schedules.filter(
    (item) => item.type === "holiday"
  );

  const academicDates = schedules.filter(
    (item) => item.type === "academic"
  );

  const events = schedules.filter(
    (item) => item.type === "event"
  );

  return (
    <div className="school-calendar-page">

      {/* HERO */}

      <section className="calendar-hero">

        <div className="calendar-hero-overlay"></div>

        <div className="calendar-container">

          <button
            className="calendar-back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

          <span className="section-label">
            EDUVISTA SCHOOL CALENDAR
          </span>

          <h1>
            School Timetable
            <br />
            <span>& Academic Calendar</span>
          </h1>

          <p>
            Plan your school year with important timings,
            holidays, vacations and academic schedules.
          </p>

        </div>

      </section>


      {/* MAIN */}

      <section className="calendar-section">

        <div className="calendar-container">

          {/* ACADEMIC YEAR */}

          <div className="academic-year-card">

            <div className="year-icon">
              📅
            </div>

            <div>
              <span>ACADEMIC YEAR</span>

              <h2>
                2026 – 2027
              </h2>

              <p>
                Important school schedules and dates
                for the academic session.
              </p>
            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="calendar-message">
              Loading school calendar...
            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="calendar-error">
              {error}
            </div>
          )}


          {!loading && !error && (

            <>

              {/* SCHOOL TIMINGS */}

              <div className="calendar-heading">

                <span className="section-label">
                  SCHOOL TIMINGS
                </span>

                <h2>
                  Know your school day.
                </h2>

                <p>
                  School timings and daily schedules
                  announced by EduVista.
                </p>

              </div>


              {timings.length > 0 ? (

                <div className="timing-grid">

                  {timings.map((item) => (

                    <div
                      className="timing-card"
                      key={item._id}
                    >

                      <div className="timing-icon">
                        🕐
                      </div>

                      <span>
                        {item.title}
                      </span>

                      <h3>
                        {item.startTime &&
                        item.endTime
                          ? `${item.startTime} – ${item.endTime}`
                          : "Timing details"}
                      </h3>

                      <p>
                        {item.description ||
                          "School timing information"}
                      </p>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="calendar-empty">
                  No school timings available.
                </div>

              )}


              {/* VACATIONS */}

              <div className="calendar-heading">

                <span className="section-label">
                  VACATION SCHEDULE
                </span>

                <h2>
                  Time to relax, recharge & return.
                </h2>

                <p>
                  Important vacation periods for students.
                </p>

              </div>


              {vacations.length > 0 ? (

                <div className="vacation-grid">

                  {vacations.map((item) => (

                    <div
                      className="vacation-card"
                      key={item._id}
                    >

                      <div className="vacation-top">

                        <span>
                          ☀️
                        </span>

                        <small>
                          VACATION
                        </small>

                      </div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.startDate &&
                        item.endDate
                          ? `${formatDate(
                              item.startDate
                            )} – ${formatDate(
                              item.endDate
                            )}`
                          : "Date not announced"}
                      </p>

                      <p>
                        {item.description}
                      </p>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="calendar-empty">
                  No vacation schedule available.
                </div>

              )}


              {/* HOLIDAYS */}

              <div className="calendar-heading holidays-heading">

                <span className="section-label">
                  IMPORTANT DATES
                </span>

                <h2>
                  Holidays & School Closures
                </h2>

                <p>
                  Keep these dates handy while planning
                  your academic year.
                </p>

              </div>


              {holidays.length > 0 ? (

                <div className="holiday-list">

                  {holidays.map((holiday) => (

                    <div
                      className="holiday-item"
                      key={holiday._id}
                    >

                      <div className="holiday-date">

                        <strong>
                          {holiday.startDate
                            ? new Date(
                                holiday.startDate
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                }
                              )
                            : "--"}
                        </strong>

                        <span>
                          {holiday.startDate
                            ? new Date(
                                holiday.startDate
                              )
                                .toLocaleDateString(
                                  "en-IN",
                                  {
                                    month: "short",
                                  }
                                )
                                .toUpperCase()
                            : ""}
                        </span>

                      </div>


                      <div className="holiday-info">

                        <h3>
                          {holiday.title}
                        </h3>

                        <p>
                          {holiday.description ||
                            "School holiday"}
                        </p>

                        {holiday.startDate && (
                          <small>
                            {formatDate(
                              holiday.startDate
                            )}

                            {holiday.endDate &&
                              ` – ${formatDate(
                                holiday.endDate
                              )}`}
                          </small>
                        )}

                      </div>


                      <span className="holiday-arrow">
                        →
                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="calendar-empty">
                  No holidays announced.
                </div>

              )}


              {/* ACADEMIC DATES */}

              {academicDates.length > 0 && (

                <>

                  <div className="calendar-heading">

                    <span className="section-label">
                      ACADEMIC DATES
                    </span>

                    <h2>
                      Important Academic Dates
                    </h2>

                  </div>


                  <div className="academic-date-grid">

                    {academicDates.map((item) => (

                      <div
                        className="academic-date-card"
                        key={item._id}
                      >

                        <span>
                          {formatShortDate(
                            item.startDate
                          )}
                        </span>

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.description}
                        </p>

                      </div>

                    ))}

                  </div>

                </>

              )}


              {/* EVENTS */}

              {events.length > 0 && (

                <>

                  <div className="calendar-heading">

                    <span className="section-label">
                      SCHOOL EVENTS
                    </span>

                    <h2>
                      Upcoming School Events
                    </h2>

                  </div>


                  <div className="calendar-event-list">

                    {events.map((event) => (

                      <div
                        className="calendar-event-card"
                        key={event._id}
                      >

                        <div className="calendar-event-date">

                          <strong>
                            {event.startDate
                              ? new Date(
                                  event.startDate
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                  }
                                )
                              : "--"}
                          </strong>

                          <span>
                            {event.startDate
                              ? new Date(
                                  event.startDate
                                )
                                  .toLocaleDateString(
                                    "en-IN",
                                    {
                                      month: "short",
                                    }
                                  )
                                  .toUpperCase()
                              : ""}
                          </span>

                        </div>


                        <div>

                          <span className="event-label">
                            SCHOOL EVENT
                          </span>

                          <h3>
                            {event.title}
                          </h3>

                          <p>
                            {event.description}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </>

              )}


              {/* NOTE */}

              <div className="calendar-note">

                <div className="note-icon">
                  ℹ️
                </div>

                <div>

                  <strong>
                    Please Note
                  </strong>

                  <p>
                    Dates and timings mentioned above
                    are based on the latest school
                    schedule. The school may make
                    changes when required. Parents
                    and students are advised to check
                    the latest school notices for
                    official updates.
                  </p>

                </div>

              </div>

            </>

          )}

        </div>

      </section>


      {/* CTA */}

      <section className="calendar-cta">

        <div className="calendar-container calendar-cta-content">

          <div>

            <span className="section-label">
              EDUVISTA INTERNATIONAL SCHOOL
            </span>

            <h2>
              Building Futures, Inspiring Minds.
            </h2>

          </div>

          <button
            onClick={() => navigate("/notices")}
          >
            View School Notices →
          </button>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="calendar-footer">

        <div className="calendar-container">

          <div>
            © 2026 EduVista International School
          </div>

          <div>
            Designed for learning. Built for the future.
          </div>

        </div>

      </footer>

    </div>
  );
}

export default SchoolCalendar;