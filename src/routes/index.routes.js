const { Router } = require('express');
const router = Router();

const { 
   isAuthenticated,
   isNotAuthenticated
} = require('../config/protection');

const { 
   renderLogin,
   login,
   register,
   welcome,
   renderUsers,
   allUsers,
   registerUser,
   deleteUser,
   renderCompanies,
   allCompanies,
   registerCompany,
   deleteCompany,
   updateCompany,
   renderEmployes,
   allEmployes,
   registerEmploye,
   deleteEmploye,
   updateEmploye,
   renderPayments,
   allPayments,
   registerPayment,
   deletePayment,
   logout
} = require('../controllers/index.controller');

router.get('/', isNotAuthenticated, renderLogin);
router.post('/login', isNotAuthenticated, login);
router.post('/register', isNotAuthenticated, register);
router.get('/welcome', isAuthenticated, welcome);
router.get('/users', isAuthenticated, renderUsers);
router.get('/allUsers', isAuthenticated, allUsers);
router.post('/registerUser', isAuthenticated, registerUser);
router.delete('/deleteUser', isAuthenticated, deleteUser);
router.get('/companies', isAuthenticated, renderCompanies);
router.get('/allCompanies', isAuthenticated, allCompanies);
router.post('/registerCompany', isAuthenticated, registerCompany);
router.delete('/deleteCompany', isAuthenticated, deleteCompany);
router.put('/updateCompany', isAuthenticated, updateCompany);
router.get('/employes', isAuthenticated, renderEmployes);
router.get('/allEmployes', isAuthenticated, allEmployes);
router.post('/registerEmploye', isAuthenticated, registerEmploye);
router.delete('/deleteEmploye', isAuthenticated, deleteEmploye);
router.put('/updateEmploye', isAuthenticated, updateEmploye);
router.get('/payments', isAuthenticated, renderPayments);
router.get('/allPayments', isAuthenticated, allPayments);
router.post('/registerPayment', isAuthenticated, registerPayment);
router.delete('/deletePayment', isAuthenticated, deletePayment);
router.get('/exit', isAuthenticated, logout);

module.exports = router;