import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Fees.css";

const feeData = {
  Nursery: {
    admission: 15000,
    registration: 2500,
    tuition: 48000,
    annual: 12000,
    activity: 5000,
  },
  LKG: {
    admission: 15000,
    registration: 2500,
    tuition: 50000,
    annual: 12000,
    activity: 5000,
  },
  UKG: {
    admission: 15000,
    registration: 2500,
    tuition: 52000,
    annual: 12000,
    activity: 5000,
  },
  "Class 1": {
    admission: 18000,
    registration: 2500,
    tuition: 55000,
    annual: 14000,
    activity: 6000,
  },
  "Class 2": {
    admission: 18000,
    registration: 2500,
    tuition: 55000,
    annual: 14000,
    activity: 6000,
  },
  "Class 3": {
    admission: 18000,
    registration: 2500,
    tuition: 58000,
    annual: 14000,
    activity: 6000,
  },
  "Class 4": {
    admission: 18000,
    registration: 2500,
    tuition: 58000,
    annual: 14000,
    activity: 6000,
  },
  "Class 5": {
    admission: 18000,
    registration: 2500,
    tuition: 60000,
    annual: 15000,
    activity: 6500,
  },
  "Class 6": {
    admission: 20000,
    registration: 3000,
    tuition: 62000,
    annual: 16000,
    activity: 7000,
  },
  "Class 7": {
    admission: 20000,
    registration: 3000,
    tuition: 62000,
    annual: 16000,
    activity: 7000,
  },
  "Class 8": {
    admission: 20000,
    registration: 3000,
    tuition: 65000,
    annual: 16000,
    activity: 7000,
  },
  "Class 9": {
    admission: 22000,
    registration: 3000,
    tuition: 68000,
    annual: 18000,
    activity: 7500,
  },
  "Class 10": {
    admission: 22000,
    registration: 3000,
    tuition: 68000,
    annual: 18000,
    activity: 7500,
  },
  "Class 11": {
    admission: 25000,
    registration: 3500,
    tuition: 72000,
    annual: 20000,
    activity: 8000,
  },
  "Class 12": {
    admission: 25000,
    registration: 3500,
    tuition: 72000,
    annual: 20000,
    activity: 8000,
  },
};

function Fees() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Class 1");

  const fees = feeData[selectedClass];

  const total =
    fees.admission +
    fees.registration +
    fees.tuition +
    fees.annual +
    fees.activity;

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="fees-page">

      {/* Hero */}

      <section className="fees-hero">

        <div className="fees-hero-overlay"></div>

        <div className="fees-container">

          <button
            className="fees-back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

          <span className="section-label">
            EDUVISTA INTERNATIONAL SCHOOL
          </span>

          <h1>
            Fee Structure
          </h1>

          <p>
            Explore the estimated fee structure for
            Nursery to Class 12.
          </p>

        </div>

      </section>


      {/* Fee Portal */}

      <section className="fees-section">

        <div className="fees-container">

          <div className="fees-heading">

            <div>
              <span className="section-label">
                FEE PORTAL
              </span>

              <h2>
                Find fees for your class
              </h2>

              <p>
                Select a class to view its fee breakdown
                for the academic session.
              </p>
            </div>

            <div className="fees-session">
              <span>Academic Session</span>
              <strong>2026–27</strong>
            </div>

          </div>


          {/* Class Selector */}

          <div className="fees-selector-card">

            <label htmlFor="class-select">
              Select Class
            </label>

            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
            >
              {Object.keys(feeData).map((className) => (
                <option
                  key={className}
                  value={className}
                >
                  {className}
                </option>
              ))}
            </select>

            <div className="selected-class">
              <span>Selected Class</span>
              <strong>{selectedClass}</strong>
            </div>

          </div>


          {/* Fee Cards */}

          <div className="fee-content-grid">

            <div className="fee-breakdown-card">

              <div className="fee-card-header">

                <div>
                  <span>
                    {selectedClass}
                  </span>

                  <h3>
                    Fee Breakdown
                  </h3>
                </div>

                <div className="fee-total-small">
                  <span>Estimated Total</span>
                  <strong>
                    {formatAmount(total)}
                  </strong>
                </div>

              </div>


              <div className="fee-list">

                <div className="fee-row">
                  <span>Admission Fee</span>
                  <strong>
                    {formatAmount(fees.admission)}
                  </strong>
                </div>

                <div className="fee-row">
                  <span>Registration Fee</span>
                  <strong>
                    {formatAmount(fees.registration)}
                  </strong>
                </div>

                <div className="fee-row">
                  <span>Tuition Fee</span>
                  <strong>
                    {formatAmount(fees.tuition)}
                  </strong>
                </div>

                <div className="fee-row">
                  <span>Annual Charges</span>
                  <strong>
                    {formatAmount(fees.annual)}
                  </strong>
                </div>

                <div className="fee-row">
                  <span>Activity & Development</span>
                  <strong>
                    {formatAmount(fees.activity)}
                  </strong>
                </div>

              </div>


              <div className="fee-grand-total">

                <span>
                  Total Estimated Annual Fee
                </span>

                <strong>
                  {formatAmount(total)}
                </strong>

              </div>

            </div>


            {/* Payment Information */}

            <div className="fee-info-card">

              <span className="fee-info-icon">
                ₹
              </span>

              <h3>
                Payment Information
              </h3>

              <p>
                Parents can choose a convenient payment
                schedule according to the school's fee
                policy.
              </p>

              <div className="payment-option">
                <strong>Quarterly</strong>
                <span>Pay in four installments</span>
              </div>

              <div className="payment-option">
                <strong>Half-Yearly</strong>
                <span>Pay in two installments</span>
              </div>

              <div className="payment-option">
                <strong>Yearly</strong>
                <span>Pay the complete annual fee</span>
              </div>

            </div>

          </div>


          {/* Important Note */}

          <div className="fees-note">

            <div className="fees-note-icon">
              i
            </div>

            <div>
              <strong>
                Important Information
              </strong>

              <p>
                The amounts shown on this page are
                sample fee figures for the EduVista
                project. Actual school fees may vary.
                Please contact the school office for
                the latest official fee structure.
              </p>
            </div>

          </div>


          {/* CTA */}

          <div className="fees-cta">

            <div>
              <span className="section-label">
                READY TO JOIN EDuvISTA?
              </span>

              <h2>
                Give your child a place to grow.
              </h2>
            </div>

            <button
              onClick={() => navigate("/admissions")}
            >
              Apply for Admission →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Fees;


