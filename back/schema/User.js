const mongoose = require('mongoose');
const { Schema } = mongoose;
const InteresSchema = require('../schema/InteresSchema');

const UsuarioSchema = new Schema({
  username: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Usuario = mongoose.model('User', UsuarioSchema);

module.exports = Usuario;