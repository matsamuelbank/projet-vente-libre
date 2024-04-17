

const express = require('express');
const app = express(); // Création de l'application express

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',  // Spécifie l'origine autorisée
  credentials: true,  // Autorise les cookies
};

app.use(cors(corsOptions)); // Utilisation du middleware CORS avec les options spécifiques

// Middleware pour traiter les données JSON
app.use(express.json());

const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const thingRoutes = require('./routes/thing');
const path = require('path');


mongoose.connect('mongodb+srv://samuel:matsamuel1er@atlascluster.owyzjbs.mongodb.net/vente_libre_bd')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/user', userRoutes); // Utilisation les routes définies dans userRoutes, /api/user sera l'url de base pour ces routes
app.use('/api/thing', thingRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
