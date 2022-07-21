require('dotenv').config();
const passport = require('passport');

const indexControllers = {};

const ModelUser = require('../models/User');

indexControllers.renderLogin = (req, res) => {
   res.render('login');
};

indexControllers.login = passport.authenticate('local.login', {
   failureRedirect: '/',
   successRedirect: '/welcome',
   badRequestMessage: 'Credenciales desconocidas!!!',
   failureFlash: true
});

indexControllers.register = async (req, res) => {
   const { 
      cedula,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email,
      password,
      confPassword
   } = req.body;

   let cedulaN = cedula.trim(),
      apellidosN = apellidos.trim(),
      nombresN = nombres.trim(),
      fechaNacimientoN = fechaNacimiento.trim(),
      generoN = genero.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase(),
      passwordN = password.trim(),
      confPasswordN = confPassword.trim();

   if (
      cedulaN === '' ||
      apellidosN === '' ||
      nombresN === '' ||
      fechaNacimientoN === '' ||
      generoN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === '' ||
      passwordN === '' ||
      confPasswordN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         if (passwordN != confPasswordN) {
            res.json({
               tittle: 'Contraseñas diferentes',
               description: 'Las contraseñas no coinciden o no son iguales!!!',
               icon: 'info',
               res: 'false'
            });
         } else {
            const CedulaUser = await ModelUser
               .findOne({
                  cedula: cedula
               });
         
            if (CedulaUser) {
               res.json({
                  tittle: 'Usuario existente',
                  description: 'El usuario ya se encuentra registrado!!!',
                  icon: 'warning',
                  res: 'false'
               });
            } else {
               const newUser = new ModelUser({
                  cedula: cedulaN,
                  apellidos: apellidosN,
                  nombres: nombresN,
                  fechaNacimiento: fechaNacimientoN,
                  genero: generoN,
                  direccion: direccionN,
                  telefono: telefonoN,
                  email: emailN,
                  password: passwordN
               });
            
               newUser.password = await newUser
                  .encryptPass(password);
               const resp = await newUser
                  .save();
   
               if (resp) {
                  res.json({
                     tittle: 'Registro Existoso',
                     description: 'Se ha registrado con éxito!!!',
                     icon: 'success',
                     res: 'true'
                  });
               } else {
                  res.json({
                     tittle: 'No registrado',
                     description: 'No se ha podido registrar sus datos!!!',
                     icon: 'error',
                     res: 'false'
                  });
               }
            }
         }
      } catch (e) {
         console.log(e);

         res.json({
            tittle: 'Problemas',
            description: 'Opss! Error 500 x_x. ¡Intentelo más luego!',
            icon: 'error',
            res: 'error'
         });
      }
   }
};

indexControllers.welcome = (req, res) => {
   res.render('welcome');
};

module.exports = indexControllers;