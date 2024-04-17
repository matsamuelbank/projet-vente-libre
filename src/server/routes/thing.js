const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const thingController = require('../controllers/thing');

router.get('/', auth, thingController.getAllthing);
router.post('/', auth, multer, thingController.createThing);
router.get('/seller/', auth, thingController.getThingsBySeller);
router.get('/selectedthing/:id', auth,thingController.getOneThing)

// router.get('/:id', auth, stuffCtrl.getOneThing);
// router.put('/:id', auth, multer,stuffCtrl.modifyThing);
// router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;