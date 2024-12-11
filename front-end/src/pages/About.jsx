import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4 mb-4">About Us</h1>
          <p className="lead">
            Welcome to the About page! We are passionate about delivering the best solutions for our clients. Our team is dedicated to excellence, creativity, and innovation.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                Our mission is to empower businesses and individuals by providing cutting-edge tools and services that drive growth and success.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Our Team</h3>
              <p className="card-text">
                We are a team of talented developers, designers, and strategists who are committed to turning your ideas into reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center mt-5">
          <p>
            Thank you for visiting our website. Feel free to explore our{' '}
            <a href="/projects" className="text-decoration-none text-primary">Projects</a> or{' '}
            <a href="/contact" className="text-decoration-none text-primary">Contact us</a> 
            for any inquiries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

