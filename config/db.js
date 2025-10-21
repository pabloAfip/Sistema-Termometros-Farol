require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar no MongoDB:", err);
    }
}

module.exports = connectDB;