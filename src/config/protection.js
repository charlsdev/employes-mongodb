const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }

   req.flash('error_msg', 'No estas autorizado. Inicia sesión...');
   res.redirect('/');
};

helpers.isNotAuthenticated = (req, res, next) => {
   if (!req.isAuthenticated()) {
      return next();
   }

   res.redirect('/welcome');
};

module.exports = helpers;