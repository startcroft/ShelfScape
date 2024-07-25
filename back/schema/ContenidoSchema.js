const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContenidoSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String },
  date: { type: String }
});

module.exports = ContenidoSchema;
