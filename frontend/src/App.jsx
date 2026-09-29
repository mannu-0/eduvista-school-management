import './App.css'
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admissions from "./pages/Admissions";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdmissionDetails from "./pages/AdmissionDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminStudentDetails from "./pages/AdminStudentDetails";
import AdminTeachers from "./pages/AdminTeachers";
import AddTeacher from "./pages/AddTeacher";
import AdminTeacherDetails from "./pages/AdminTeacherDetails";
import EditTeacher from "./pages/EditTeacher";
import EditStudent from "./pages/EditStudent";
import AdminNotices from "./pages/AdminNotices";
import CreateNotice from "./pages/CreateNotice";
import NoticeDetails from "./pages/NoticeDetails";
import School from "./pages/School";
import Notices from "./pages/Notices";
import Fees from "./pages/Fees";
import SchoolCalendar from "./pages/SchoolCalendar";
import AdminSchedule from "./pages/AdminSchedule";

function Home() {
  const navigate = useNavigate();

  const [homeNotices, setHomeNotices] = useState([]);
  const [noticesLoading, setNoticesLoading] = useState(true);

  useEffect(() => {
    const fetchHomeNotices = async () => {
       try {
        const response = await fetch(
          "http://localhost:5001/api/notices"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const publishedNotices = data
          .filter(
            (notice) => notice.status === "Published"
          )
          .sort(
            (a, b) =>
              new Date(b.publishDate || b.createdAt) -
              new Date(a.publishDate || a.createdAt)
          )
          .slice(0, 3);

        setHomeNotices(publishedNotices);
      } catch (error) {
        console.error("Home notices error:", error);
      } finally {
        setNoticesLoading(false);
      }
    };
    fetchHomeNotices();
  }, []);
  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-content">

          <div className="logo">
            <div className="logo-mark">E</div>

            <div>
              <h2>EduVista</h2>
              <span>International School</span>
            </div>
          </div>

          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#academics">Academics</a>
            <a href="#facilities">Facilities</a>
            <a href="#events">Events</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Navbar Admission Button */}
          <button
            className="admission-btn"
            onClick={() => navigate("/admissions")}
          >
            Admissions
          </button>

          <button
            className="fees-btn"
            onClick={() => navigate("/fees")}
          >
            Fees Portal
          </button>
       
          <button
            className="nav-calendar-btn"
            onClick={() => navigate("/school-calendar")}
          >
            School Calendar
          </button>

         <button
           className="admin-btn"
           onClick={() => navigate("/admin/login")}
          >
           Admin
          </button>

        </div>
      </header>


      {/* Hero */}
      <main>

        <section id="home" className="hero">

          <div className="hero-overlay"></div>

          <div className="container hero-content">

            <div className="hero-text">

              <span className="eyebrow">
                WELCOME TO EDVISTA
              </span>

              <h1>
                Building Futures,
                <br />
                <span>Inspiring Minds.</span>
              </h1>

              <p>
                A place where curiosity meets knowledge,
                character meets confidence, and every student
                gets the opportunity to shine.
              </p>

              <div className="hero-buttons">

                <button 
                  className="primary-btn"
                  onClick={() => navigate("/school")}
                >
                  Explore Our School
                </button>

                {/* Hero Admission Button */}
                <button
                  className="secondary-btn"
                  onClick={() => navigate("/admissions")}
                >
                  Apply for Admission
                </button>

              </div>

            </div>


            <div className="hero-card">

              <span>EST.</span>

              <strong>1998</strong>

              <p>
                Creating generations of
                <br />
                confident learners
              </p>

            </div>

          </div>

        </section>


        {/* Stats */}
        <section className="stats">

          <div className="container stats-grid">

            <div>
              <strong>25+</strong>
              <span>Years of Excellence</span>
            </div>

            <div>
              <strong>2,500+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>150+</strong>
              <span>Qualified Teachers</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Academic Success</span>
            </div>

          </div>

        </section>


        {/* About */}
        <section id="about" className="section about">

          <div className="container about-grid">

            <div className="about-image">

              <div className="image-placeholder">

                <span>EDUVISTA</span>

                <strong>
                  Where Learning
                  <br />
                  Comes Alive
                </strong>

              </div>

            </div>


            <div className="about-content">

              <span className="section-label">
                ABOUT OUR SCHOOL
              </span>

              <h2>
                More than a school.
                <br />
                <span>A place to belong.</span>
              </h2>

              <p>
                EduVista International School is committed to
                providing an engaging and supportive learning
                environment where students can discover their
                potential and develop into responsible global
                citizens.
              </p>

              <p>
                We combine strong academics with sports, arts,
                technology and character development to provide
                students with a well-rounded education.
              </p>

              <button className="text-btn">
                Discover Our Story →
              </button>

            </div>

          </div>

        </section>


        {/* Academics */}
        <section id="academics" className="section academics">

          <div className="container">

            <div className="section-heading">

              <span className="section-label">
                ACADEMICS
              </span>

              <h2>
                Learning designed for the future.
              </h2>

              <p>
                A balanced curriculum that encourages curiosity,
                creativity and critical thinking.
              </p>

            </div>


            <div className="academic-grid">

              <article className="academic-card">

                <div className="card-icon">
                  01
                </div>

                <h3>
                  Primary School
                </h3>

                <p>
                  Building strong foundations through
                  interactive and joyful learning.
                </p>

                <a href="#academics">
                  Explore →
                </a>

              </article>


              <article className="academic-card featured">

                <div className="card-icon">
                  02
                </div>

                <h3>
                  Middle School
                </h3>

                <p>
                  Developing independent thinkers through
                  exploration and practical learning.
                </p>

                <a href="#academics">
                  Explore →
                </a>

              </article>


              <article className="academic-card">

                <div className="card-icon">
                  03
                </div>

                <h3>
                  Senior School
                </h3>

                <p>
                  Preparing students for higher education
                  and the challenges of tomorrow.
                </p>

                <a href="#academics">
                  Explore →
                </a>

              </article>

            </div>

          </div>

        </section>


        {/* Facilities */}
        <section id="facilities" className="section facilities">

          <div className="container">

            <div className="section-heading">

              <span className="section-label">
                OUR FACILITIES
              </span>

              <h2>
                Everything students need to thrive.
              </h2>

            </div>


            <div className="facility-grid">

              <div className="facility-item">

                <span>⌘</span>

                <h3>
                  Smart Classrooms
                </h3>

                <p>
                  Technology-enabled learning spaces.
                </p>

              </div>


              <div className="facility-item">

                <span>⚗</span>

                <h3>
                  Science Labs
                </h3>

                <p>
                  Hands-on experiments and discovery.
                </p>

              </div>


              <div className="facility-item">

                <span>▦</span>

                <h3>
                  Modern Library
                </h3>

                <p>
                  A world of knowledge at your fingertips.
                </p>

              </div>


              <div className="facility-item">

                <span>⚽</span>

                <h3>
                  Sports Complex
                </h3>

                <p>
                  Space to play, compete and grow.
                </p>

              </div>

            </div>

          </div>

        </section>

       {/* Events & Notices */}
       <section id="events" className="section events">

          <div className="container">

            <div className="section-heading event-heading">

              <div>
                <span className="section-label">
                  SCHOOL UPDATES
                </span>

                <h2>
                  Latest Notices & Announcements
                </h2>

                <p>
                  Stay updated with important announcements,
                  school events and activities.
                </p>
              </div>

              <button
                className="text-btn"
                onClick={() => navigate("/notices")}
              >
                View All Notices →
              </button>

            </div>

            <div className="event-grid">

              <article className="event-card">

                <div className="event-date">

                  <strong>15</strong>

                  <span>OCT</span>

                </div>

                <div className="event-content">

                   <div className="event-top">

                    <span className="event-type">
                      EVENT
                    </span>

                    <span className="event-status">
                      ● Upcoming
                    </span>

                  </div>

                  <h3>
                    Annual Sports Day
                  </h3>

                  <p>
                    Celebrating energy, teamwork and
                    sportsmanship with our students.
                  </p>

                  <span className="event-link">
                    View Event →
                  </span>

                </div>

              </article>

              <article className="event-card">

                <div className="event-date">

                  <strong>22</strong>

                  <span>OCT</span>

                </div>

                <div className="event-content">

                  <div className="event-top">

                    <span className="event-type notice">
                      NOTICE
                    </span>

                    <span className="event-status">
                      ● Important
                    </span>

                  </div>

                  <h3>
                    Parent Teacher Meeting
                  </h3>

                  <p>
                    Connect with teachers and discuss
                    your child's academic progress.
                  </p>

                  <span className="event-link">
                    View Notice →
                  </span>

                </div>

              </article>

              <article className="event-card">

                <div className="event-date">

                  <strong>05</strong>

                  <span>NOV</span>
                </div>

                <div className="event-content">

                  <div className="event-top">

                    <span className="event-type">
                      EVENT
                    </span>

                    <span className="event-status">
                      ● Upcoming
                    </span>

                  </div>

                  <h3>
                    Science Exhibition
                  </h3>

                  <p>
                    Students showcase innovative ideas,
                    experiments and creative projects.
                  </p>

                  <span className="event-link">
                    Explore Event →
                  </span>

                </div>

              </article>

            </div>

          </div>

        </section>
        {/* CTA */}
        <section className="cta">

          <div className="container cta-content">

            <div>

              <span className="section-label">
                START YOUR JOURNEY
              </span>

              <h2>
                Give your child a place to grow.
              </h2>

            </div>

            {/* Bottom Admission Button */}
            <button
              className="primary-btn"
              onClick={() => navigate("/admissions")}
            >
              Begin Admission →
            </button>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer id="contact" className="footer">

        <div className="container footer-grid">

          <div>

            <div className="logo footer-logo">

              <div className="logo-mark">
                E
              </div>

              <div>

                <h2>
                  EduVista
                </h2>

                <span>
                  International School
                </span>

              </div>

            </div>


            <p>
              Building confident learners and responsible
              citizens for a better tomorrow.
            </p>

          </div>


          <div>

            <h3>
              Quick Links
            </h3>

            <a href="#about">
              About Us
            </a>

            <a href="#academics">
              Academics
            </a>

            <a href="#facilities">
              Facilities
            </a>

            <a href="#events">
              Events
            </a>

          </div>


          <div>

            <h3>
              Contact
            </h3>

            <p>
              123 Education Avenue
            </p>

            <p>
              Jaipur, Rajasthan
            </p>

            <p>
              +91 98765 43210
            </p>

            <p>
              info@eduvista.school
            </p>

          </div>

        </div>


        <div className="container footer-bottom">

          <span>
            © 2026 EduVista International School
          </span>

          <span>
            Designed for learning. Built for the future.
          </span>

        </div>

      </footer>

    </div>
  )
}


function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />
       
      <Route
        path="/notices"
        element={<Notices />}
      /> 

      <Route
        path="/fees"
        element={<Fees />}
      />

      <Route
       path="/admin/login"
       element={<AdminLogin />}
      />

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admissions"
        element={<Admissions />}
      />

      <Route
        path="/admin/admissions"
        element={
          <AdminProtectedRoute>
            <AdminAdmissions />
          </AdminProtectedRoute>
        }

      />

      <Route
        path="/admin/admissions/:id"
        element={
          <AdminProtectedRoute>
            <AdmissionDetails />
          </AdminProtectedRoute>
        }

      />

      <Route
        path="/admin/students"
        element={
          <AdminProtectedRoute>
            <AdminStudents />
          </AdminProtectedRoute>
        }
      />
      
      <Route
        path="/admin/students/:id"
        element={
          <AdminProtectedRoute>
            <AdminStudentDetails />
          </AdminProtectedRoute>
        }
      /> 

      <Route
        path="/admin/students/:id/edit"
        element={
          <AdminProtectedRoute>
            <EditStudent />
          </AdminProtectedRoute>
        }
      />
      
      <Route
        path="/admin/teachers"
        element={
          <AdminProtectedRoute>
            <AdminTeachers />
          </AdminProtectedRoute>
        }
      />
      
      <Route
        path="/admin/notices"
        element={
          <AdminProtectedRoute>
            <AdminNotices />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/notices/add"
        element={
          <AdminProtectedRoute>
            <CreateNotice />
          </AdminProtectedRoute>
        }
      />
 
      <Route
        path="/admin/notices/:id"
        element={
          <AdminProtectedRoute>
            <NoticeDetails />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/teachers/add"
        element={
          <AdminProtectedRoute>
            <AddTeacher />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/teachers/:id"
        element={
          <AdminProtectedRoute>
            <AdminTeacherDetails />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/teachers/:id/edit"
        element={
          <AdminProtectedRoute>
            <EditTeacher />
          </AdminProtectedRoute>
        }
      /> 

      <Route
        path="/school"
        element={<School />}
      />

      <Route
        path="/school-calendar"
        element={<SchoolCalendar />}
      />

      <Route
        path="/admin/schedule"
        element={
          <AdminProtectedRoute>
            <AdminSchedule />
          </AdminProtectedRoute>
        }
      />
      
    </Routes>
  );

}


export default App;
