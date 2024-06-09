const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContenidoSchema = require('./ContenidoSchema');

const InteresSchema = new Schema({
  interesID: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  imagenURL: { type: String },
  contenidos: [ContenidoSchema]
});

module.exports = InteresSchema;
