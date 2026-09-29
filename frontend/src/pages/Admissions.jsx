import { useState } from "react";
import "./Admissions.css";

function Admissions() {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    previousSchool: "",

    fatherName: "",
    motherName: "",
    guardianPhone: "",
    email: "",
    occupation: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5001/api/admissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit application"
        );
      }

      console.log("Admission submitted:", data);

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Admission submission failed:",
        error
      );

      alert("Failed to submit admission application");
    }
  };

  return (
    <section className="admission-page">

      <div className="admission-container">

        {/* Header */}
        <div className="admission-header">

          <span className="section-label">
            ADMISSIONS
          </span>

          <h1>
            Admission Application
          </h1>

          <p>
            Start your child's journey with EduVista
            International School.
          </p>

        </div>


        {submitted ? (

          /* Success Message */
          <div className="admission-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Application Submitted Successfully!
            </h2>

            <p>
              Thank you for applying to EduVista
              International School.
            </p>

            <p className="success-note">
              Our admission team will review your
              application and contact you soon.
            </p>

          </div>

        ) : (

          /* Admission Form */
          <form
            className="admission-form"
            onSubmit={handleSubmit}
          >

            {/* ========================= */}
            {/* Student Information */}
            {/* ========================= */}

            <div className="form-section">

              <div className="form-section-header">

                <span className="form-number">
                  01
                </span>

                <div>
                  <h2>
                    Student Information
                  </h2>

                  <p>
                    Tell us about the student applying
                    for admission.
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Student Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Date of Birth
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Gender
                    <span>*</span>
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Class Applying For
                    <span>*</span>
                  </label>

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Class
                    </option>

                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>

                  </select>

                </div>


                <div className="form-group full-width">

                  <label>
                    Previous School
                  </label>

                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Enter previous school name"
                  />

                </div>

              </div>

            </div>


            {/* ========================= */}
            {/* Parent Information */}
            {/* ========================= */}

            <div className="form-section">

              <div className="form-section-header">

                <span className="form-number">
                  02
                </span>

                <div>
                  <h2>
                    Parent / Guardian Information
                  </h2>

                  <p>
                    Provide parent or guardian contact
                    information.
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Father's Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Parent / Guardian Phone
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />

                </div>


                <div className="form-group full-width">

                  <label>
                    Occupation
                  </label>

                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Parent / Guardian occupation"
                  />

                </div>

              </div>

            </div>


            {/* ========================= */}
            {/* Address */}
            {/* ========================= */}

            <div className="form-section">

              <div className="form-section-header">

                <span className="form-number">
                  03
                </span>

                <div>
                  <h2>
                    Address Information
                  </h2>

                  <p>
                    Enter the student's residential
                    address.
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Address
                    <span>*</span>
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter complete address"
                    required
                  ></textarea>

                </div>


                <div className="form-group">

                  <label>
                    City
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                  />

                </div>

              </div>

            </div>


            {/* ========================= */}
            {/* Additional Information */}
            {/* ========================= */}

            <div className="form-section">

              <div className="form-section-header">

                <span className="form-number">
                  04
                </span>

                <div>
                  <h2>
                    Additional Information
                  </h2>

                  <p>
                    Anything else you would like us
                    to know?
                  </p>
                </div>

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter any additional information..."
                ></textarea>

              </div>

            </div>


            {/* Submit */}
            <div className="form-submit">

              <p>
                Fields marked with <span>*</span> are required.
              </p>

              <button
                type="submit"
                className="admission-submit"
              >
                Submit Application
                <span>→</span>
              </button>

            </div>

          </form>

        )}

      </div>

    </section>
  );
}

export default Admissions;
