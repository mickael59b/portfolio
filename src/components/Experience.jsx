import React, { useState } from 'react';
import job_png from '../assets/images/school.png';

// Composant individuel pour un élément de l'accordéon
const ExperienceItem = ({ title, text, year, company, technologies, index, activeIndex, setActiveIndex }) => {
  const isActive = index === activeIndex;
  const toggleAccordion = () => setActiveIndex(isActive ? null : index);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-exp-${index}`}>
        <button
          className={`accordion-button ${isActive ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isActive}
          aria-controls={`collapse-exp-${index}`}
        >
          {title} <span className="fw-medium text-primary ms-auto fs-14">{year}</span>
        </button>
      </h2>
      <div
        id={`collapse-exp-${index}`}
        className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
        aria-labelledby={`heading-exp-${index}`}
        data-bs-parent="#Experience_accordion"
      >
        <div className="accordion-body">
          <p className="text-muted mb-1">{text}</p>
          <p className="fw-medium">{company}</p>
          {technologies && technologies.map((tech, idx) => (
            <span
              key={idx}
              className="badge badge-lg rounded bg-soft-alt-info fw-normal fs-13 text-uppercase mt-2 me-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant principal pour l'affichage des expériences
const Experience = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="row g-0">
      {/* Colonne pour l'en-tête avec une image */}
      <div className="col-lg-4 col-md-6">
        <div className="card rounded bg-light h-100 border-0">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="mx-auto text-center">
              <img src={job_png} alt="Experience" className="vector-dark" height="150" />
              <h5 className="text-dark fs-22 fw-medium my-2">Experience</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne pour l'accordéon */}
      <div className="col-lg-8 col-md-6">
        <div className="card rounded bg-white h-100 border-0">
          <div className="card-body p-0">
            <div className="accordion accordion-flush" id="Experience_accordion">
              {items.map((item, index) => (
                <ExperienceItem
                  key={index}
                  index={index}
                  title={item.title}
                  text={item.text}
                  year={item.year}
                  company={item.company}
                  technologies={item.technologies}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;