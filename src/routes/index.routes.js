const { Router } = require('express');
const router = Router();

const { 
   renderLogin,
   login,
   register,
   welcome
} = require('../controllers/index.controller');

router.get('/', renderLogin);
router.post('/login', login);
router.post('/register', register);


router.get('/welcome', welcome);

module.exports = router;