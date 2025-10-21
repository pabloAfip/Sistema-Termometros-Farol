const mongoose = require("mongoose");

const AcaoSchema = new mongoose.Schema({
    internal_id: { type: String, required: true },
    alert_id: { type: String, required: true },
    alert_data_hora: { type: Date, required: true },
    data_hora: { type: Date, required: true },
    descricao: { type: String, required: true }
}, { collection: 'acoes' });

module.exports = mongoose.model("Acao", AcaoSchema);