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