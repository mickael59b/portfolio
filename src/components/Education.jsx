import React, { useState } from 'react';
import education_png from '../assets/images/school.png';

// Composant individuel pour un élément de l'accordéon
const EducationItem = ({ title, text, year, institution, index, activeIndex, setActiveIndex }) => {
  const isActive = index === activeIndex;
  const toggleAccordion = () => setActiveIndex(isActive ? null : index);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${index}`}>
        <button
          className={`accordion-button ${isActive ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isActive}
          aria-controls={`collapse-${index}`}
        >
          {title} <span className="fw-medium text-primary ms-auto fs-14">{year}</span>
        </button>
      </h2>
      <div
        id={`collapse-${index}`}
        className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
        aria-labelledby={`heading-${index}`}
        data-bs-parent="#Education_accordion"
      >
        <div className="accordion-body">
          <p className="text-muted mb-3">{text}</p>
          <p className="fw-medium">{institution}</p>
        </div>
      </div>
    </div>
  );
};

// Composant principal pour l'affichage de l'éducation
const Education = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="row g-0">
      {/* Colonne pour l'en-tête avec une image */}
      <div className="col-lg-4 col-md-6">
        <div className="card rounded bg-light h-100 border-0">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="mx-auto text-center">
              <img src={education_png} alt="Education" className="vector-dark" height="150" />
              <h5 className="text-dark fs-22 fw-medium my-2">Education</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne pour l'accordéon */}
      <div className="col-lg-8 col-md-6">
        <div className="card rounded bg-white h-100 border-0">
          <div className="card-body p-0">
            <div className="accordion accordion-flush" id="Education_accordion">
              {items.map((item, index) => (
                <EducationItem
                  key={index}
                  index={index}
                  title={item.title}
                  text={item.text}
                  year={item.year}
                  institution={item.institution}
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

export default Education;
