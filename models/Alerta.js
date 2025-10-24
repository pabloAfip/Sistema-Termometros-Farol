const mongoose = require("mongoose");

const AlertaSchema = new mongoose.Schema({
    internal_id: { type: String, required: true },
    data_hora: { type: Date, required: true },
    temperatura: { type: Number, required: true },
    descricao: { type: String, required: true }
});

module.exports = mongoose.model("Alerta", AlertaSchema);