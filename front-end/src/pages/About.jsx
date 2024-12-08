import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1>About Us</h1>
      <p>
        Welcome to the About page! We are passionate about delivering the best solutions for our clients. Our team is 
        dedicated to excellence, creativity, and innovation.
      </p>
      <p>
        This application is built using React and Vite for the frontend, with a robust backend powered by Node.js and MongoDB.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to empower businesses and individuals by providing cutting-edge tools and services that drive growth 
        and success.
      </p>
      <h3>Our Team</h3>
      <p>
        We are a team of talented developers, designers, and strategists who are committed to turning your ideas into reality.
      </p>
      <p>
        Thank you for visiting our website. Feel free to explore our <a href="/projects">Projects</a> or <a href="/contact">Contact us</a> 
        for any inquiries.
      </p>
    </div>
  );
};

export default About;
