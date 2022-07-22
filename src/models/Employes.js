const { Schema, model } = require('mongoose');

const EmployeModel = new Schema({
   cedula: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10
   },
   apellidos: {
      type: String,
      required: true
   },
   nombres: {
      type: String,
      required: true
   },
   fechaNacimiento: {
      type: String,
      required: true
   },
   genero: {
      type: String,
      required: true
   },
   direccion: {
      type: String,
      required: true
   },
   telefono: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   _idCompany: {
      type: Schema.Types.ObjectId,
      ref: 'Companias',
      required: true
   },
}, {
   timestamps: true,
   versionKey: false
});

module.exports = model('Empleados', EmployeModel);