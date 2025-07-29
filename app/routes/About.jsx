import React from 'react';
import './About.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome to CureNet! We are dedicated to providing reliable and accessible healthcare
          information and services. Our mission is to empower users with medical insights and
          connect them to the right care easily.
        </p>
        <p className="about-text">
          Our team consists of experienced medical professionals, software engineers, and
          healthcare advocates working together to create a user-friendly platform focused on
          your well-being.
        </p>
        <p className="about-text">
          Whether you need to track your health, get medical alerts, or understand your symptoms,
          CureNet is here to support you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
