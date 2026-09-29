import "./About.css";

function About() {
  return (
    <section className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <span className="section-label">
          ABOUT EDuvista
        </span>

        <h1>
          A School Where
          <br />
          <span>Students Grow & Shine.</span>
        </h1>

        <p>
          EduVista International School is a learning community
          focused on academic excellence, creativity, confidence,
          character, and the overall development of every student.
        </p>
      </div>


      {/* Introduction */}
      <div className="about-section about-intro">

        <div className="about-content">

          <span className="section-label">
            WHO WE ARE
          </span>

          <h2>
            Learning Beyond
            <br />
            the Classroom
          </h2>

          <p>
            At EduVista, we believe education is not limited to
            textbooks and examinations. Our goal is to create an
            environment where students can ask questions, explore
            new ideas, develop practical skills, and become
            confident individuals.
          </p>

          <p>
            We encourage students to discover their strengths,
            respect others, take responsibility, and prepare
            themselves for the opportunities and challenges of
            the future.
          </p>

        </div>


        <div className="about-highlight">

          <div className="about-highlight-card">
            <strong>01</strong>
            <h3>Learn</h3>
            <p>
              Building strong academic foundations through
              meaningful learning.
            </p>
          </div>

          <div className="about-highlight-card">
            <strong>02</strong>
            <h3>Explore</h3>
            <p>
              Encouraging curiosity, creativity, and new ideas.
            </p>
          </div>

          <div className="about-highlight-card">
            <strong>03</strong>
            <h3>Grow</h3>
            <p>
              Developing confidence, character, and life skills.
            </p>
          </div>

        </div>

      </div>


      {/* Mission & Vision */}
      <div className="about-section about-mission">

        <div className="about-info-card">

          <span className="section-label">
            OUR MISSION
          </span>

          <h2>
            Education With
            <br />
            Purpose
          </h2>

          <p>
            Our mission is to provide a supportive and engaging
            learning environment where students can develop
            knowledge, skills, values, and confidence to become
            responsible members of society.
          </p>

        </div>


        <div className="about-info-card">

          <span className="section-label">
            OUR VISION
          </span>

          <h2>
            Preparing Students
            <br />
            for Tomorrow
          </h2>

          <p>
            We envision a school where every student gets the
            opportunity to discover their potential and develop
            the confidence to build a successful and meaningful
            future.
          </p>

        </div>

      </div>


      {/* Values */}
      <div className="about-values">

        <div className="about-values-header">

          <span className="section-label">
            OUR VALUES
          </span>

          <h2>
            What We Believe In
          </h2>

          <p>
            The principles that guide our students and our
            school community.
          </p>

        </div>


        <div className="about-values-grid">

          <div className="about-value-card">
            <div className="about-value-number">
              01
            </div>

            <h3>Excellence</h3>

            <p>
              We encourage students to always give their best
              and continuously improve.
            </p>
          </div>


          <div className="about-value-card">
            <div className="about-value-number">
              02
            </div>

            <h3>Integrity</h3>

            <p>
              We promote honesty, responsibility, respect, and
              strong personal values.
            </p>
          </div>


          <div className="about-value-card">
            <div className="about-value-number">
              03
            </div>

            <h3>Curiosity</h3>

            <p>
              We inspire students to ask questions, explore,
              experiment, and discover.
            </p>
          </div>


          <div className="about-value-card">
            <div className="about-value-number">
              04
            </div>

            <h3>Community</h3>

            <p>
              We believe students, teachers, parents, and the
              school work together to create a better future.
            </p>
          </div>

        </div>

      </div>


      {/* CTA */}
      <div className="about-cta">

        <span className="section-label">
          JOIN EDuvista
        </span>

        <h2>
          Ready to Begin
          <br />
          Your Journey?
        </h2>

        <p>
          Discover a learning environment designed to help
          students learn, grow, and achieve their potential.
        </p>

      </div>

    </section>
  );
}

export default About;
