const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const router = express.Router();

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
  const { id } = req.params;  // Récupère l'ID de l'URL
  console.log('Requête reçue pour l\'ID du projet:', id);  // Affiche l'ID du projet

  try {
    // Vérification si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('ID invalide:', id);  // Affiche si l'ID est invalide
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

    const project = await Project.findById(id);
    if (!project) {
      console.log('Projet non trouvé pour l\'ID:', id);  // Affiche si le projet n'est pas trouvé
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.json(project);  // Retourne les données du projet
  } catch (err) {
    console.error('Erreur serveur :', err);  // Affiche l'erreur serveur si elle se produit
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

// Supprimer un projet par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  // Récupère l'ID du projet à supprimer
  try {
    // Vérification si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de projet invalide' });
    }

    // Supprimer le projet par son ID
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

module.exports = router;

