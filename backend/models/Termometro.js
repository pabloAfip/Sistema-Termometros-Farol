const mongoose = require("mongoose");

const TermometroSchema = new mongoose.Schema({
    internal_id: { type: String, required: true, unique: true },
    range: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }
});

module.exports = mongoose.model("Termometro", TermometroSchema);