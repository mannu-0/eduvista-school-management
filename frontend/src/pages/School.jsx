import "./School.css";

function School() {
return ( <main className="school-page">

  {/* HERO */}
  <section className="school-hero">
    <div className="school-hero-overlay" />

    <div className="school-container school-hero-content">
      <span className="school-eyebrow">
        EDUIVISTA INTERNATIONAL SCHOOL
      </span>

      <h1>
        Where Every
        <span> Mind </span>
        Begins to Shine.
      </h1>

      <p>
        A vibrant learning community where curiosity becomes
        knowledge, confidence becomes character, and every student
        gets the opportunity to build a meaningful future.
      </p>

      <div className="school-hero-actions">
        <a href="/admissions" className="school-primary-btn">
          Apply for Admission
          <span>→</span>
        </a>

        <a href="#school-experience" className="school-outline-btn">
          Discover Our School
        </a>
      </div>

      <div className="school-hero-stats">
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
          <span>Teachers</span>
        </div>

        <div>
          <strong>98%</strong>
          <span>Student Success</span>
        </div>
      </div>
    </div>
  </section>


  {/* INTRO */}
  <section id="school-experience" className="school-intro">
    <div className="school-container">

      <div className="school-intro-grid">

        <div className="school-intro-heading">
          <span className="school-section-label">
            MORE THAN A SCHOOL
          </span>

          <h2>
            A place to
            <br />
            <em>belong.</em>
          </h2>
        </div>

        <div className="school-intro-text">
          <p className="school-lead">
            EduVista International School is committed to creating
            an engaging and supportive environment where students
            can discover their strengths and develop into confident,
            responsible individuals.
          </p>

          <p>
            We believe education should extend beyond textbooks.
            Our approach brings together academics, sports, arts,
            technology and character development to create a
            well-rounded school experience.
          </p>

          <a href="/about" className="school-text-link">
            Discover Our Story <span>→</span>
          </a>
        </div>

      </div>

    </div>
  </section>


  {/* EXPERIENCE CARDS */}
  <section className="school-experience">
    <div className="school-container">

      <div className="school-section-heading">
        <div>
          <span className="school-section-label">
            THE EDUIVISTA EXPERIENCE
          </span>

          <h2>
            Learning that goes
            <br />
            <em>beyond the classroom.</em>
          </h2>
        </div>

        <p>
          We give students opportunities to learn, create,
          collaborate and discover what they are capable of.
        </p>
      </div>


      <div className="school-experience-grid">

        <article className="school-experience-card school-card-large">
          <div className="school-card-number">01</div>

          <div className="school-card-content">
            <span>ACADEMICS</span>
            <h3>Build a strong foundation.</h3>
            <p>
              Develop knowledge, problem-solving skills and a
              genuine curiosity for learning through engaging
              academic experiences.
            </p>
            <a href="/academics">
              Explore Academics →
            </a>
          </div>
        </article>


        <article className="school-experience-card school-card-green">
          <div className="school-card-number">02</div>

          <div className="school-card-content">
            <span>ACTIVITIES</span>
            <h3>Discover your passion.</h3>
            <p>
              From sports and arts to technology and creative
              activities, students get space to explore their
              interests.
            </p>
            <a href="/facilities">
              Explore Facilities →
            </a>
          </div>
        </article>


        <article className="school-experience-card school-card-gold">
          <div className="school-card-number">03</div>

          <div className="school-card-content">
            <span>CHARACTER</span>
            <h3>Grow with confidence.</h3>
            <p>
              We encourage respect, responsibility, communication
              and confidence as essential parts of education.
            </p>
          </div>
        </article>

      </div>

    </div>
  </section>


  {/* PHILOSOPHY */}
  <section className="school-philosophy">
    <div className="school-container">

      <div className="school-philosophy-box">

        <div className="school-philosophy-left">
          <span className="school-section-label">
            OUR PHILOSOPHY
          </span>

          <h2>
            Education should
            <br />
            <em>inspire.</em>
          </h2>
        </div>

        <div className="school-philosophy-right">
          <p>
            A great school does more than prepare students for
            examinations. It prepares them to ask better questions,
            solve problems, communicate confidently and contribute
            positively to the world around them.
          </p>

          <div className="school-philosophy-points">

            <div>
              <span>✦</span>
              <strong>Think</strong>
              <p>Question, explore and understand.</p>
            </div>

            <div>
              <span>✦</span>
              <strong>Create</strong>
              <p>Turn ideas into meaningful experiences.</p>
            </div>

            <div>
              <span>✦</span>
              <strong>Lead</strong>
              <p>Take responsibility and inspire others.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>


  {/* VALUES */}
  <section className="school-values-section">
    <div className="school-container">

      <div className="school-values-heading">
        <span className="school-section-label">
          WHAT WE VALUE
        </span>

        <h2>
          The qualities we
          <br />
          help students develop.
        </h2>
      </div>


      <div className="school-values-grid">

        <div className="school-value-item">
          <span>01</span>
          <h3>Curiosity</h3>
          <p>
            The confidence to ask questions and explore new ideas.
          </p>
        </div>

        <div className="school-value-item">
          <span>02</span>
          <h3>Respect</h3>
          <p>
            Understanding and valuing people, ideas and differences.
          </p>
        </div>

        <div className="school-value-item">
          <span>03</span>
          <h3>Responsibility</h3>
          <p>
            Taking ownership of choices, actions and learning.
          </p>
        </div>

        <div className="school-value-item">
          <span>04</span>
          <h3>Confidence</h3>
          <p>
            Believing in yourself and having the courage to grow.
          </p>
        </div>

      </div>

    </div>
  </section>


  {/* CTA */}
  <section className="school-final-cta">
    <div className="school-container">

      <span className="school-section-label">
        BEGIN THE JOURNEY
      </span>

      <h2>
        Your child's next chapter
        <br />
        starts here.
      </h2>

      <p>
        Explore EduVista International School and discover a
        learning environment built around curiosity, confidence
        and opportunity.
      </p>

      <div className="school-final-actions">

        <a
          href="/admissions"
          className="school-primary-btn"
        >
          Apply for Admission
          <span>→</span>
        </a>

        <a
          href="/contact"
          className="school-final-link"
        >
          Contact the School →
        </a>

      </div>

    </div>
  </section>

</main>

);
}

export default School;
