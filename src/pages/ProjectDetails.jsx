import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenirProjetParId } from '../services/apiProjets';
import '../assets/css/projets.css'; // CSS pour la mise en forme

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await obtenirProjetParId(id);
        const projectData = response.project;
        setProject(projectData);
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
        setError('Erreur lors de la récupération du projet');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center my-5">
        <p>Projet introuvable.</p>
      </div>
    );
  }

  const {
    title,
    description,
    shortDescription,
    skills,
    category,
    client,
    createdAt,
    link,
    imageUrl,
  } = project;

  return (
    <>
    <section className="projet-details section-space-top my-5">
      <div className="container">
        <div className="row">
          {/* Image principale du projet */}
          <div className="col-lg-7 mb-4">
            <div className="projet-details__wrapper">
              <div className="projet-details__img">
                <img
                  src={imageUrl || 'https://via.placeholder.com/800'}
                  alt={title}
                  className="img-fluid rounded shadow-lg"
                />
              </div>
              <div className="projet-details__categories">
                <span className="posted_in">
                  <a href="#" rel="tag">{category || 'Catégorie non spécifiée'}</a>
                </span>
              </div>
            </div>
          </div>

          {/* Détails du projet */}
          <div className="col-lg-5">
            <div className="projet-details__content">
              <div className="projet-details__location">
                <i className="fa-solid fa-location-pin"></i>
                {client || 'Client non spécifié'}
              </div>
              <h4 className="projet-details__title">{title}</h4>
              
              {/* Information about pledges and backers */}
              <div className="projet-details__count-box">
                <div className="projet-details__count-box__single count-box">
                  <div className="projet-details__count-box__data">
                    <h5>$</h5>
                    <h5 className="count-text" data-stop="6830" data-speed="1500">6830</h5>
                  </div>
                  <span>Pledged</span>
                </div>
                <div className="projet-details__count-box__single count-box">
                  <div className="projet-details__count-box__data">
                    <h5 className="count-text" data-stop="80" data-speed="1500">80</h5>
                  </div>
                  <span>Backers</span>
                </div>
                <div className="projet-details__count-box__single count-box">
                  <div className="projet-details__count-box__data">
                    <h5 className="count-text" data-stop="23" data-speed="1500">23</h5>
                  </div>
                  <span>Days Left</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="projet-details__progress">
                <div className="progress-box">
                  <div className="progress-box__bar-text">Raised</div>
                  <div className="progress-box__bar">
                    <div
                      className="progress-box__bar__inner count-bar counted"
                      data-percent="70%"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  <div className="progress-box__bar-number">
                    <span className="count-text" data-stop="70" data-speed="1000">70</span>
                    <span>%</span>
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div className="projet-details__goal">
                <h6>Goal: <span>3600.00 USD</span></h6>
              </div>

              {/* Full description */}
              <div className="projet-details__desc">
                <p>{description || "Pas de description disponible."}</p>
              </div>

              {/* GitHub link */}
              <div className="projet-details__btn-box">
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Voir sur GitHub
                  </a>
                )}
              </div>

              {/* Skills */}
              <div className="projet-details__skills">
                <h5>Technologies et Compétences</h5>
                <div className="d-flex flex-wrap gap-3">
                  {skills ? (
                    skills.split(',').map((skill, index) => (
                      <span key={index} className="badge bg-info text-dark p-2">
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <p>Aucune compétence spécifiée.</p>
                  )}
                </div>
              </div>

              {/* Avatar section (can be customized further) */}
              <div className="projet-details__avater">
                <div className="projet-details__avater__img">
                  <img src="https://via.placeholder.com/100" alt="Avatar" />
                </div>
                <div className="projet-details__avater__text">
                  <div className="projet-details__avater__title">
                    <span>by</span>
                    <h5>Author Name</h5>
                  </div>
                  <p className="projet-details__avater__subtitle">2 Projects / 10 Backed</p>
                </div>
              </div>

              {/* Amount selection */}
              <ul className="projet-details__amount-list">
                <li>
                  <label>
                    <input name="price" className="projet-checkbox" value="10" type="radio" />
                    <div className="projet-details__amount-list__single">$10</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input name="price" className="projet-checkbox" value="20" type="radio" />
                    <div className="projet-details__amount-list__single">$20</div>
                  </label>
                </li>
                <li>
                  <label>
                    <input name="price" className="projet-checkbox" value="30" type="radio" />
                    <div className="projet-details__amount-list__single">$30</div>
                  </label>
                </li>
              </ul>

              {/* Buttons and social media */}
              <div className="projet-details__bottom">
                <a href="" className="btn btn-secondary">Book this Project</a>
                <div className="projet-details__social">
                  <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
                  <a href="https://twitter.com"><i className="fa-brands fa-twitter"></i></a>
                  <a href="https://www.pinterest.com/"><i className="fa-brands fa-pinterest-p"></i></a>
                  <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="projet-details__tab">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12">
              <div className="main-tab tab--two">
                <div className="main-tab__wrapper">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-story-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-story"
                        type="button"
                        role="tab"
                      >
                        Story
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-faq-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-faq"
                        type="button"
                        role="tab"
                      >
                        FAQs
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-updates-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-updates"
                        type="button"
                        role="tab"
                      >
                        Updates
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-reviews-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-reviews"
                        type="button"
                        role="tab"
                      >
                        Reviews <span>(2)</span>
                      </button>
                    </li>
                  </ul>

                  <div className="main-tab__content tab-content" id="pills-tabContent">
                    {/* Story Tab */}
                    <div className="main-tab__pane tab-pane fade show active" id="pills-story" role="tabpanel">
                      <p className="main-tab__content__text">
                        {project.description || "Description détaillée du projet..."}
                      </p>
                      <ul className="main-tab__content__list">
                        <li><i className="fa-solid fa-circle-check"></i>Point clé 1</li>
                        <li><i className="fa-solid fa-circle-check"></i>Point clé 2</li>
                        <li><i className="fa-solid fa-circle-check"></i>Point clé 3</li>
                        <li><i className="fa-solid fa-circle-check"></i>Point clé 4</li>
                      </ul>
                      <div className="tab--two__content__images">
                        <img src="/api/placeholder/400/300" alt="Project visual 1" className="img-fluid" />
                        <img src="/api/placeholder/400/300" alt="Project visual 2" className="img-fluid" />
                      </div>
                    </div>

                    {/* FAQ Tab */}
                    <div className="main-tab__pane tab-pane fade" id="pills-faq" role="tabpanel">
                      {/* Contenu FAQ */}
                    </div>

                    {/* Updates Tab */}
                    <div className="main-tab__pane tab-pane fade" id="pills-updates" role="tabpanel">
                      {/* Contenu Updates */}
                    </div>

                    {/* Reviews Tab */}
                    <div className="main-tab__pane tab-pane fade" id="pills-reviews" role="tabpanel">
                      {/* Contenu Reviews */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with Rewards */}
            <div className="col-lg-4 col-xl-4 col-md-7">
              <div className="sidebar-two">
                <div className="sidebar-two__wrapper">
                  <h4 className="sidebar-two__title">Rewards</h4>
                  <h6 className="sidebar-two__subtitle"><span>$100</span> or More</h6>
                  <div className="sidebar-two__img">
                    <img src="/api/placeholder/300/200" alt="Reward" className="img-fluid" />
                  </div>
                  <p className="sidebar-two__desc">
                    Reward description goes here. Lorem ipsum dolor sit amet, piscing elit.
                  </p>
                  <div className="sidebar-two__date">20 November, 2024</div>
                  <div className="sidebar-two__delivary">Estimated Delivery</div>
                  <div className="sidebar-two__reward-text">
                    <div className="sidebar-two__reward-title__title">
                      <i className="fa-solid fa-user"></i> 1 Backers
                    </div>
                    <div className="sidebar-two__reward-title__title">
                      <i className="fa-solid fa-trophy"></i> 19 Rewards Left
                    </div>
                    <button className="btn btn-primary w-100 mt-3">
                      Select a Reward
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;