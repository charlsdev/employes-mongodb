require('dotenv').config();
const passport = require('passport');

const indexControllers = {};

const ModelUser = require('../models/User');
const ModelCompany = require('../models/Company');
const ModelEmploye = require('../models/Employes');
const ModelPayment = require('../models/Payments');

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

indexControllers.renderUsers = (req, res) => {
   res.render('users');
};

indexControllers.allUsers = async (req, res) => {
   let allUsers;

   try {
      allUsers = await ModelUser
         .find({
            _id: {
               $not: {
                  $eq: req.user.id
               }
            }
         })
         .select({
            cedula: 1,
            apellidos: 1,
            nombres: 1,
            fechaNacimiento: 1,
            genero: 1,
            direccion: 1,
            telefono: 1,
            email: 1
         })
         .lean()
         .exec();
         
      res.send(allUsers);
   } catch (e) {
      console.log(e);
   }
};

indexControllers.registerUser = async (req, res) => {
   const { 
      cedula,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email
   } = req.body;

   let cedulaN = cedula.trim(),
      apellidosN = apellidos.trim(),
      nombresN = nombres.trim(),
      fechaNacimientoN = fechaNacimiento.trim(),
      generoN = genero.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase();

   if (
      cedulaN === '' ||
      apellidosN === '' ||
      nombresN === '' ||
      fechaNacimientoN === '' ||
      generoN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
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
               password: cedulaN
            });
            
            newUser.password = await newUser
               .encryptPass(cedulaN);
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

indexControllers.deleteUser = async (req, res) => {
   const { 
      ID
   } = req.body;

   let id = ID.trim();

   if (
      id === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const verifyExist = await ModelUser
            .findOne({
               _id: id
            });
         
         if (!verifyExist) {
            res.json({
               tittle: 'Usuario no existente',
               description: 'El usuario ha eliminar no se encuentra registrado!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelUser
               .deleteOne({
                  _id: id
               });
   
            if (resp.deletedCount > 0) {
               res.json({
                  tittle: 'Usuario eliminado',
                  description: 'Se ha eliminado el usuario con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'Usuario no eliminado',
                  description: 'No se ha podido eliminar al usuario!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.renderCompanies = (req, res) => {
   res.render('companies');
};

indexControllers.allCompanies = async (req, res) => {
   let allCompanies;

   try {
      allCompanies = await ModelCompany
         .find()
         .select({
            ruc: 1,
            nomEmpresa: 1,
            direccion: 1,
            telefono: 1,
            email: 1
         })
         .lean()
         .exec();
         
      res.send(allCompanies);
   } catch (e) {
      console.log(e);
   }
};

indexControllers.registerCompany = async (req, res) => {
   const { 
      ruc,
      nomEmpresa,
      direccion,
      telefono,
      email
   } = req.body;

   let rucN = ruc.trim(),
      nomEmpresaN = nomEmpresa.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase();

   if (
      rucN === '' ||
      nomEmpresaN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const RucCompany = await ModelCompany
            .findOne({
               ruc: ruc
            });
         
         if (RucCompany) {
            res.json({
               tittle: 'Compañía existente',
               description: 'La compañía ya se encuentra registrada!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const newCompany = new ModelCompany({
               ruc: rucN,
               nomEmpresa: nomEmpresaN,
               direccion: direccionN,
               telefono: telefonoN,
               email: emailN
            });
            
            const resp = await newCompany
               .save();
   
            if (resp) {
               res.json({
                  tittle: 'Registro Existoso',
                  description: 'Se ha registrado con éxito la compaññia!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'No registrado',
                  description: 'No se ha podido registrar la compañía!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.deleteCompany = async (req, res) => {
   const { 
      ID
   } = req.body;

   let id = ID.trim();

   if (
      id === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const verifyExist = await ModelCompany
            .findOne({
               _id: id
            });
         
         if (!verifyExist) {
            res.json({
               tittle: 'Compañía no existente',
               description: 'La compañía ha eliminar no se encuentra registrada!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelCompany
               .deleteOne({
                  _id: id
               });
   
            if (resp.deletedCount > 0) {
               res.json({
                  tittle: 'Compañía eliminada',
                  description: 'Se ha eliminado la compañía con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'Compañía no eliminada',
                  description: 'No se ha podido eliminar la compañía!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.updateCompany = async (req, res) => {
   const {
      id,
      ruc,
      nomEmpresa,
      direccion,
      telefono,
      email
   } = req.body;

   let idN = id.trim(),
      rucN = ruc.trim(),
      nomEmpresaN = nomEmpresa.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase();

   if (
      idN === '' ||
      rucN === '' ||
      nomEmpresaN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const RucCompany = await ModelCompany
            .findOne({
               _id: idN,
               ruc: rucN
            });
         
         if (!RucCompany) {
            res.json({
               tittle: 'Compañía no existente',
               description: 'La compañía no se encuentra registrada!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelCompany
               .updateOne({
                  _id: idN,
                  ruc: rucN
               }, {
                  $set: {
                     nomEmpresa: nomEmpresaN,
                     direccion: direccionN,
                     telefono: telefonoN,
                     email: emailN
                  }
               });
   
            if (resp.modifiedCount > 0) {
               res.json({
                  tittle: 'Registro Actualizado',
                  description: 'Se ha actualizado el registro con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'No actualizado',
                  description: 'No se ha podido actualizar el registro!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.renderEmployes = (req, res) => {
   res.render('employes');
};

indexControllers.allEmployes = async (req, res) => {
   let allEmployes;

   try {
      allEmployes = await ModelEmploye
         .find()
         .select({
            cedula: 1,
            apellidos: 1,
            nombres: 1,
            fechaNacimiento: 1,
            genero: 1,
            direccion: 1,
            telefono: 1,
            email: 1,
            _idCompany: 1
         })
         .populate({
            path: '_idCompany',
            select: 'nomEmpresa'
         })
         .lean()
         .exec();
         
      res.send(allEmployes);
   } catch (e) {
      console.log(e);
   }
};

indexControllers.registerEmploye = async (req, res) => {
   const { 
      cedula,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email,
      idCompany
   } = req.body;

   let cedulaN = cedula.trim(),
      apellidosN = apellidos.trim(),
      nombresN = nombres.trim(),
      fechaNacimientoN = fechaNacimiento.trim(),
      generoN = genero.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase(),
      idCompanyN = idCompany.trim();

   if (
      cedulaN === '' ||
      apellidosN === '' ||
      nombresN === '' ||
      fechaNacimientoN === '' ||
      generoN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === '' ||
      idCompanyN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const cedulaEmploye = await ModelEmploye
            .findOne({
               cedula: cedula
            });
         
         if (cedulaEmploye) {
            res.json({
               tittle: 'Empleado existente',
               description: 'El empleado ya se encuentra registrado!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const newEmploye = new ModelEmploye({
               cedula: cedulaN,
               apellidos: apellidosN,
               nombres: nombresN,
               fechaNacimiento: fechaNacimientoN,
               genero: generoN,
               direccion: direccionN,
               telefono: telefonoN,
               email: emailN,
               _idCompany: idCompanyN
            });
            
            const resp = await newEmploye
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
                  description: 'No se ha podido registrar los datos!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.deleteEmploye = async (req, res) => {
   const { 
      ID
   } = req.body;

   let id = ID.trim();

   if (
      id === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const verifyExist = await ModelEmploye
            .findOne({
               _id: id
            });
         
         if (!verifyExist) {
            res.json({
               tittle: 'Empleado no existente',
               description: 'El empleado ha eliminar no se encuentra registrado!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelEmploye
               .deleteOne({
                  _id: id
               });
   
            if (resp.deletedCount > 0) {
               res.json({
                  tittle: 'Empleado eliminado',
                  description: 'Se ha eliminado el empleado con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'Empleado no eliminado',
                  description: 'No se ha podido eliminar al empleado!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.updateEmploye = async (req, res) => {
   const {
      id,
      cedula,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email,
      idCompany
   } = req.body;

   let idN = id.trim(),
      cedulaN = cedula.trim(),
      apellidosN = apellidos.trim(),
      nombresN = nombres.trim(),
      fechaNacimientoN = fechaNacimiento.trim(),
      generoN = genero.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim().toLowerCase(),
      idCompanyN = idCompany.trim();

   if (
      idN === '' ||
      cedulaN === '' ||
      apellidosN === '' ||
      nombresN === '' ||
      fechaNacimientoN === '' ||
      generoN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === '' ||
      idCompanyN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const cedulaEmploye = await ModelEmploye
            .findOne({
               _id: idN,
               cedula: cedulaN
            });
         
         if (!cedulaEmploye) {
            res.json({
               tittle: 'Empleado no existente',
               description: 'El empleado no se encuentra registrado!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelEmploye
               .updateOne({
                  _id: idN,
                  cedula: cedulaN
               }, {
                  $set: {
                     apellidos: apellidosN,
                     nombres: nombresN,
                     fechaNacimiento: fechaNacimientoN,
                     genero: generoN,
                     direccion: direccionN,
                     telefono: telefonoN,
                     email: emailN,
                     _idCompany: idCompanyN
                  }
               });
   
            if (resp.modifiedCount > 0) {
               res.json({
                  tittle: 'Registro Actualizado',
                  description: 'Se ha actualizado el registro con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'No actualizado',
                  description: 'No se ha podido actualizar el registro!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.renderPayments = (req, res) => {
   res.render('payments');
};

indexControllers.allPayments = async (req, res) => {
   let allPayments;

   try {
      allPayments = await ModelPayment
         .find()
         .select({
            _idEmpleado: 1,
            _idCompany: 1,
            salarioPercibir: 1,
            impuesto: 1,
            iess: 1,
            numHijos: 1,
            bonoHijos: 1,
            discapacidad: 1,
            bonoDis: 1,
            sueldoNeto: 1
         })
         .lean()
         .populate({
            path: '_idEmpleado',
            select: 'apellidos nombres'
         })
         .populate({
            path: '_idCompany',
            select: 'nomEmpresa'
         });
         
      res.send(allPayments);
   } catch (e) {
      console.log(e);
   }
};

indexControllers.registerPayment = async (req, res) => {
   const { 
      idEmpleado,
      idCompany,
      salarioPercibir,
      discapacidad,
      bonoDis,
      numHijos,
      bonoHijos,
      impuesto,
      iess,
      sueldoNeto
   } = req.body;

   let idEmpleadoN = idEmpleado.trim(),
      idCompanyN = idCompany.trim(),
      salarioPercibirN = salarioPercibir.trim(),
      discapacidadN = discapacidad.trim(),
      bonoDisN = bonoDis.trim(),
      numHijosN = numHijos.trim(),
      bonoHijosN = bonoHijos.trim(),
      impuestoN = impuesto.trim(),
      iessN = iess.trim().toLowerCase(),
      sueldoNetoN = sueldoNeto.trim();

   if (
      idEmpleadoN === '' ||
      idCompanyN === '' ||
      salarioPercibirN === '' ||
      discapacidadN === '' ||
      bonoDisN === '' ||
      numHijosN === '' ||
      bonoHijosN === '' ||
      impuestoN === '' ||
      iessN === '' ||
      sueldoNetoN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const newPayment = new ModelPayment({
            _idEmpleado: idEmpleadoN,
            _idCompany: idCompanyN,
            salarioPercibir: salarioPercibirN,
            impuesto: impuestoN,
            iess: iessN,
            numHijos: numHijosN,
            bonoHijos: bonoHijosN,
            discapacidad: discapacidadN,
            bonoDis: bonoDisN,
            sueldoNeto: sueldoNetoN
         });
         
         const resp = await newPayment
            .save();

         if (resp) {
            res.json({
               tittle: 'Registro Existoso',
               description: 'Se ha registrado con éxito el pago!!!',
               icon: 'success',
               res: 'true'
            });
         } else {
            res.json({
               tittle: 'No registrado',
               description: 'No se ha podido registrar el pago!!!',
               icon: 'error',
               res: 'false'
            });
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

indexControllers.deletePayment = async (req, res) => {
   const { 
      ID
   } = req.body;

   let id = ID.trim();

   if (
      id === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         res: 'false'
      });
   } else {
      try {
         const verifyExist = await ModelPayment
            .findOne({
               _id: id
            });
         
         if (!verifyExist) {
            res.json({
               tittle: 'Pago no existente',
               description: 'El pago ha eliminar no ha sido registrado!!!',
               icon: 'warning',
               res: 'false'
            });
         } else {
            const resp = await ModelPayment
               .deleteOne({
                  _id: id
               });
   
            if (resp.deletedCount > 0) {
               res.json({
                  tittle: 'Pago eliminado',
                  description: 'Se ha eliminado el pago del empleado con éxito!!!',
                  icon: 'success',
                  res: 'true'
               });
            } else {
               res.json({
                  tittle: 'Pago no eliminado',
                  description: 'No se ha podido eliminar el pago del empleado!!!',
                  icon: 'error',
                  res: 'false'
               });
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

indexControllers.logout = (req, res, next) => {
   req.logout(req.user, err => {
      if(err) return next(err);
      req.flash('warning_msg', 'Sesión cerrada. Vuelva pronto...');
      res.redirect('/');
   });
};

module.exports = indexControllers;