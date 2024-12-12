const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const router = express.Router();

// Route pour créer un projet
router.post('/', async (req, res) => {
  try {
    // Vérification du corps de la requête
    if (!req.body.title || !req.body.category || !req.body.description) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Créer un nouveau projet avec le titre
    const project = new Project(req.body);
    await project.save();
    return res.status(201).json(project); // Réponse avec le projet créé
  } catch (err) {
    console.error('Erreur lors de la création du projet:', err);
    return res.status(500).json({ message: 'Erreur lors de la création du projet', error: err.message });
  }
});

// Récupérer toutes les catégories uniques des projets
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des catégories', error: err.message });
  }
});

// Récupérer les projets avec option de filtrage par catégorie et pagination
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category && category !== 'All' ? { category } : {};

    const projects = await Project.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProjects = await Project.countDocuments(filter);

    res.json({
      projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de récupération des projets', error: err.message });
  }
});

// Récupérer un projet par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.json(project);
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

// Supprimer un projet par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

module.exports = router;
