const bcrypt = require('bcrypt'); //on importe le package de cryptage de mdp
const jwt  = require('jsonwebtoken')
const User = require('../models/User');

exports.signup = (req, res, next) => {
    //fonction qui crypte le mdp et prend en parametre le mdp de la requete(ce que le user entre), le sel ici 10
  bcrypt.hash(req.body.password, 10)
    .then(hash => { //on récupère le hash généré et le mets dans hash
        const user = new User({
        name: req.body.name,
        firstname: req.body.firstname,
        role:req.body.role,
        email: req.body.email,
        password: hash,
        tel:req.body.tel
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ error: 'Utilisateur non trouvé !' });
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ error: 'Mot de passe incorrect !' });
                   }
                   const token = jwt.sign(
                       { userId: user._id }, //le token créé contiendra l'id utilisateur
                       'RANDOM_TOKEN_SECRET', //clé aleatoire secrete
                       { expiresIn: '24h' } //date d'expiration du token 
                   );
                   res.cookie('token', token, {
                     httpOnly: true,
                     // secure: true,  // à décommenter en production
                     // domain: 'your-domain.com',  // à décommenter en production
                     maxAge: 3600000  // expire après 1 heure
                   });
                   res.status(200).json({
                       status: 200,
                       userId: user._id,
                       userRole: user.role,
                       token: token
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnecté' });
};

