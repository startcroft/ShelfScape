const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContenidoSchema = require('./ContenidoSchema');

const InteresSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  imagenURL: { type: String },
  userId: { type: String, required: true},
  contenidos: [ContenidoSchema]
});

const Interes = mongoose.model('InteresSchema', InteresSchema);

module.exports = Interes;
