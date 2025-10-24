const mongoose = require("mongoose");

const MedicaoSchema = new mongoose.Schema({
    internal_id: { type: String, required: true },
    data_hora: { type: Date, required: true },
    temperatura: { type: Number, required: true },
    temp_maxima: { type: Number, required: true },
    temp_minima: { type: Number, required: true }
}, { collection: 'medicoes' });

module.exports = mongoose.model("Medicao", MedicaoSchema);