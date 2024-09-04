const contactController = require('../controllers/contactController')
const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/', contactController.postContact)
router.get('/',contactController.getAllContacts)
router.delete('/:id',contactController.deleteContact)


module.exports = router
