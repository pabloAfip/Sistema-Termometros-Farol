// const Medicao = require("./models/Medicao");
// const Termometro = require("./models/Termometro");
// const Alerta = require("./models/Alerta");
// const Acao = require("./models/Acao");

// connectDB();

// (async () => {
//     // Exemplo: cria um termômetro
//     const t = new Termometro({
//         internal_id: "28-3c01d607b1a1",
//         range: { min: 2, max: 8 }
//     });
//     await t.save();

//     // Exemplo: grava uma medição
//     const m = new Medicao({
//         internal_id: "28-3c01d607b1a1",
//         data_hora: new Date(),
//         temperatura: 5.2,
//         temp_maxima: 8,
//         temp_minima: 2
//     });
//     await m.save();

//     console.log("Dados inseridos com sucesso!");

//     // const tFound = await Termometro.findOne({ internal_id: "28-3c01d607b1a1" });
//     const tFound = await Termometro.find();
//     console.log(tFound);
// })();

require("dotenv").config({ quiet: true });
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/api", apiRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});