const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContenidoSchema = new Schema({
  contenidoID: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
  tipo: { type: String, required: true },
  url: { type: String, required: true },
  descripcion: { type: String }
});

module.exports = ContenidoSchema;
