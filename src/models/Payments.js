const { Schema, model } = require('mongoose');

const CompanyModel = new Schema({
   _idEmpleado: {
      type: Schema.Types.ObjectId,
      ref: 'Empleados'
   },
   _idCompany: {
      type: Schema.Types.ObjectId,
      ref: 'Compania'
   },
   impuesto: {
      type: String,
      required: true
   },
   iess: {
      type: String,
      required: true
   },
   numHijos: {
      type: String,
      required: true
   },
   bonoHijos: {
      type: String,
      required: true
   },
   discapacidad: {
      type: String,
      required: true
   },
   bonoDis: {
      type: String,
      required: true
   },
   sueldoNetovlc: {
      type: String,
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

module.exports = model('Compania', CompanyModel);