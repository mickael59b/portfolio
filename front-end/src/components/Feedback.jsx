import React, { useState } from 'react';
import '../assets/css/feedback.css';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false); // Pour gérer l'état du popup
  const [rating, setRating] = useState(0); // Pour stocker la note
  const [comment, setComment] = useState(''); // Pour stocker le commentaire
  const [submitted, setSubmitted] = useState(false); // Pour savoir si le feedback a été soumis

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Veuillez donner une note avant de soumettre.');
      return;
    }

    // Simuler l'envoi des données (par exemple, à une API)
    console.log({ rating, comment });

    // Réinitialiser le formulaire et afficher un message de confirmation
    setSubmitted(true);
    setRating(0);
    setComment('');
    setIsOpen(false); // Fermer le popup après soumission
  };

  return (
    <div>
      {/* Bouton pour ouvrir le popup */}
      <button
        className="btn btn-primary"
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '150px',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
        }}
        onClick={() => setIsOpen(true)}
      >
        Feedback
      </button>

      {/* Popup de feedback */}
      {isOpen && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content p-4 bg-light border rounded"
            style={{ maxWidth: '400px', width: '90%' }}
          >
            <h5 className="modal-title mb-3">Donnez votre avis</h5>
            {submitted && <p className="text-success">Merci pour votre feedback !</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Note :</label>
                <input
                  type="range"
                  className="form-range"
                  id="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`badge ${rating >= star ? 'bg-warning' : 'bg-secondary'}`}>
                      {star}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Commentaire :</label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Écrivez votre commentaire ici..."
                  style={{ height: '80px' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
              >
                Envoyer
              </button>

              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setIsOpen(false)}
              >
                Fermer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;