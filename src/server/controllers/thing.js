const Thing = require('../models/Thing');
//const fs = require('fs'); //package node file system(fs) il permet d'interragir avec le système de fichier du serveur

exports.createThing = (req, res, next) => {
   const thingObject = JSON.parse(req.body.thing);// on recupere ce que l'on envoie coté client (c'est un objet convertie en string et ici on utilse parse pour le remetre en json )
   delete thingObject._id;
   delete thingObject._userId;
   const thing = new Thing({
       ...thingObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
 
   thing.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !', status: 201})})
   .catch(error => { res.status(400).json( { error })})
};

exports.getAllthing = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json({
        status: 'success',
        data: things
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getThingsBySeller = (req, res, next) => {
    Thing.find({ userId: req.auth.userId })
        .then(things => res.status(200).json({ status: 'success', data: things }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) =>{
  Thing.findOne({ _id: req.params.id})
        .then(thing => res.status(200).json({ status: 'success', data: thing }))
        .catch(error => res.status(400).json({ error }));
}
