const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('../controllers/user.controller')

const router = express.Router();
router.use(bodyParser.json());

router.post('/register', UserController.registerUserController);
router.post('/verify-email', UserController.verifyEmailController);
// router.post('/create', customerController.addCustomer);
// router.put('/:id', customerController.updateCustomer);
// router.delete('/:id', customerController.deleteCustomer);
// router.post('/create', movieController.addMovie);
// router.get('/by-star/:starId', movieController.getMoviesByStar);
module.exports = router;