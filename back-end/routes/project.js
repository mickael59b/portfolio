// routes/project.js

const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Récupérer toutes les catégories uniques des projets
router.get('/categories', async (req, res) => {
  try {
    // Récupérer toutes les catégories uniques
    const categories = await Project.distinct('category');
    res.json(categories); // Renvoyer les catégories en réponse
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des catégories' });
  }
});

// Récupérer les projets avec option de filtrage par catégorie
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter);
    res.json(projects); // Renvoyer les projets filtrés
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des projets' });
  }
});

module.exports = router;
