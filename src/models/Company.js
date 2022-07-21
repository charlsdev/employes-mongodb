const { Schema, model } = require('mongoose');

const CompanyModel = new Schema({
   ruc: {
      type: String,
      required: true,
      unique: true,
      maxlength: 13
   },
   nomEmpresa: {
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
   }
}, {
   timestamps: true,
   versionKey: false
});

module.exports = model('Compania', CompanyModel);