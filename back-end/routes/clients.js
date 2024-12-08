// routes/clients.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

const router = express.Router();

// Validation du mot de passe (au moins 8 caractères, une majuscule, une minuscule et un chiffre)
const passwordValidation = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

// Inscription
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  // Vérification de l'unicité de l'email
  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
  }

  // Validation du mot de passe
  if (!passwordValidation(password)) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = new Client({ name, email, password: hashedPassword });
    await client.save();
    res.status(201).json({ message: 'Client enregistré avec succès!' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: 'Client non trouvé!' });

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect!' });

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }
});

module.exports = router;

