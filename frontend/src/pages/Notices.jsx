import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notices.css";

function Notices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5001/api/notices"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch notices"
          );
        }

        const publishedNotices = data
          .filter(
            (notice) => notice.status === "Published"
          )
          .sort(
            (a, b) =>
              new Date(b.publishDate || b.createdAt) -
              new Date(a.publishDate || a.createdAt)
          );

        setNotices(publishedNotices);
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Failed to load notices"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) => {
    const searchText = search.toLowerCase();

    return (
      notice.title
        ?.toLowerCase()
        .includes(searchText) ||
      notice.description
        ?.toLowerCase()
        .includes(searchText) ||
      notice.category
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="public-notices-page">

      {/* Header */}

      <section className="public-notices-hero">

        <div className="public-notices-hero-overlay"></div>

        <div className="public-notices-container">

          <button
            className="public-notices-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

          <span className="section-label">
            EDUVISTA NOTICE BOARD
          </span>

          <h1>
            Latest School Notices
          </h1>

          <p>
            Stay informed about important announcements,
            events and updates from EduVista International School.
          </p>

        </div>

      </section>


      {/* Notices Section */}

      <section className="public-notices-section">

        <div className="public-notices-container">

          {/* Toolbar */}

          <div className="public-notices-toolbar">

            <div>
              <span className="section-label">
                SCHOOL UPDATES
              </span>

              <h2>
                Important Announcements
              </h2>
            </div>

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Loading */}

          {loading && (
            <div className="public-notices-message">
              Loading latest notices...
            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="public-notices-error">
              {error}
            </div>
          )}


          {/* Empty */}

          {!loading &&
            !error &&
            filteredNotices.length === 0 && (
              <div className="public-notices-message">
                {search
                  ? "No notices found matching your search."
                  : "No notices available at the moment."}
              </div>
            )}


          {/* Notice Cards */}

          {!loading &&
            !error &&
            filteredNotices.length > 0 && (

              <div className="public-all-notices-grid">

                {filteredNotices.map((notice) => {

                  const date = notice.publishDate
                    ? new Date(notice.publishDate)
                    : new Date(notice.createdAt);

                  return (
                    <article
                      className="public-full-notice-card"
                      key={notice._id}
                    >

                      {/* Date */}

                      <div className="public-full-notice-date">

                        <span>
                          {date
                            .toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                              }
                            )
                            .toUpperCase()}
                        </span>

                        <strong>
                          {date.toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                            }
                          )}
                        </strong>

                        <small>
                          {date.toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                            }
                          )}
                        </small>

                      </div>


                      {/* Content */}

                      <div className="public-full-notice-content">

                        <div className="public-full-notice-top">

                          <span className="public-full-notice-category">
                            {notice.category ||
                              "GENERAL"}
                          </span>

                          <span className="public-full-notice-published">
                            ● Published
                          </span>

                        </div>


                        <h3>
                          {notice.title}
                        </h3>


                        <p>
                          {notice.description}
                        </p>


                        <div className="public-full-notice-footer">

                          <span>
                            Published on{" "}
                            {date.toLocaleDateString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>

            )}

        </div>

      </section>


      {/* Bottom CTA */}

      <section className="public-notices-cta">

        <div className="public-notices-container">

          <div>

            <span className="section-label">
              EDVISTA INTERNATIONAL SCHOOL
            </span>

            <h2>
              Building Futures, Inspiring Minds.
            </h2>

          </div>

          <button
            onClick={() => navigate("/admissions")}
          >
            Apply for Admission →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Notices;