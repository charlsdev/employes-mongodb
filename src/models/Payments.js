const { Schema, model } = require('mongoose');

const PaymentModel = new Schema({
   _idEmpleado: {
      type: Schema.Types.ObjectId,
      ref: 'Empleados'
   },
   _idCompany: {
      type: Schema.Types.ObjectId,
      ref: 'Companias'
   },
   salarioPercibir: {
      type: String,
      required: true
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
   sueldoNeto: {
      type: String,
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

module.exports = model('Pagos', PaymentModel);