const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  categorie: {type: String, required: true},
});

//on exporte le schema pour qu'il soit utilisable dans les autres fichiers
module.exports = mongoose.model('Thing', thingSchema);//prend en paramettre le fichier de modele donc ici le fichier thing et le schema de données