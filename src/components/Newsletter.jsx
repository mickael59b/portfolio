// src/components/Newsletter.jsx
import React, { useState } from 'react';
import img_news from '../assets/images/wall-post-pana.svg';
import validator from 'validator';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!validator.isEmail(email)) {
      setError('Veuillez entrer une adresse email valide.');
      setSuccessMessage('');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://api.acti-informatique.com/contact/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setSuccessMessage('Merci pour votre inscription à la newsletter ! 😊');
      setEmail('');
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-sm-4 p-md-5 signup-form">
      <div className="card-body text-center">
        <h2>Découvrez mes projets et réalisations</h2>
        <p className="lead">
          Abonnez-vous pour être informé de mes nouveaux projets et mises à jour !
        </p>
        <form className="row g-2 justify-content-center" onSubmit={handleSubmit}>
          <div className="col-auto">
            <input
              type="email"
              className="form-control"
              placeholder="Email address..."
              aria-label="Email address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Subscribe!'}
            </button>
          </div>
        </form>

        {/* Messages d'erreur ou de succès */}
        {error && <p className="text-danger mt-3">{error}</p>}
        {successMessage && <p className="text-success mt-3">{successMessage}</p>}

        <p className="text-muted small fst-italic mt-3">
          Ce site est protégé par reCAPTCHA et la politique de{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            confidentialité de Google
          </a>{' '}
          et les{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            conditions de service
          </a>{' '}
          s'appliquent.
        </p>
      </div>
      <img
        src={img_news}
        alt="Man standing with tablet SVG"
        className="signup-form-img d-none d-md-block"
      />
    </div>
  );
};

export default Newsletter;