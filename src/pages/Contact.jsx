import React, { useRef, useState } from 'react';
import '../assets/css/contact.css';
import Carte_map from '../assets/images/contact-bg.png';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Message from '../components/Message';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(''); // Pour stocker le token
    const recaptchaRef = useRef(null); // Pour accéder au reCAPTCHA

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validateForm = () => {
        const { firstName, lastName, email, message } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
            return "Tous les champs sont obligatoires.";
        }
        if (!validateEmail(email)) {
            return "L'email fourni est invalide.";
        }
        if (message.length < 10) {
            return "Votre message doit contenir au moins 10 caractères.";
        }
        if (!recaptchaToken) {
            return "Veuillez compléter le reCAPTCHA.";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setFormError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('https://back-end-api-gfl0.onrender.com/api/contact', {
                ...formData,
                recaptchaToken, // Inclure le token reCAPTCHA
            });

            if (response.data.success) {
                setFormSuccess(true);
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
                setRecaptchaToken(''); // Réinitialiser le token
                setFormError('');
                recaptchaRef.current.reset(); // Réinitialiser le reCAPTCHA
                setTimeout(() => setFormSuccess(false), 3000);
            } else {
                setFormError('Erreur lors de l\'envoi du formulaire.');
            }
        } catch (error) {
            setFormError(error.response?.data.message || 'Une erreur est survenue. Veuillez réessayer plus tard.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact - Mon Portfolio</title>
                <meta
                    name="description"
                    content="Contactez-moi pour discuter de votre projet et découvrir comment je peux vous aider à faire briller votre marque."
                />
            </Helmet>

            <div id="contact" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="heading pb-5">
                                <h2>Let's level up your brand, together</h2>
                                <p>
                                    Contactez-moi pour discuter de votre projet et découvrir comment je peux
                                    vous aider à faire briller votre marque.
                                </p>
                                <img className="carte_img" src={Carte_map} alt="Carte_map" />
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="5"
                                        required
                                    />
                                </div>

                                {/* reCAPTCHA */}
                                <ReCAPTCHA
                                    sitekey="6LdVeAspAAAAAAhQb8mrSQAuuMtsW2HnLVkW_WJZ" // Remplacez par votre clé publique
                                    onChange={(token) => setRecaptchaToken(token)}
                                    ref={recaptchaRef}
                                />

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                    </button>
                                </div>

                                {/* Messages d'erreur et de succès */}
                                {formError && <Message type="danger" message={formError} />}
                                {formSuccess && <Message type="success" message="Votre message a été envoyé avec succès !" />}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;