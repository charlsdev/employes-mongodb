const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserModel = new Schema({
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
   password: {
      type: String,
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

UserModel.methods.encryptPass = async password => {
   return await bcrypt.hash(password, await bcrypt.genSalt(10)); 
};

UserModel.methods.verifyPass = async function(password) {
   return await bcrypt.compare(password, this.password);
};

module.exports = model('Usuarios', UserModel);