require('dotenv').config({ quiet: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// body register:
// {
//     nome: "Pablo Ornelas Pimentel",
//     email: "pablo.pimentel@afip.com.br",
//     senha: "senha1234",
//     role: "user" // ou admin
// }

// body login:
// {
//     email: "pablo.pimentel@afip.com.br",
//     senha: "senha1234"
// }

// cadastro
async function register(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Dados incompletos" });
    }

    try {
        // verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        const user = new User({ nome, email, senha });
        await user.save();

        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
        console.error("Erro em register:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
}

// login
async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // compara senha com hash
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // cria token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            // { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error("Erro em login:", error);
        res.status(500).json({ error: "Erro no login" });
    }
}


module.exports = { login, register };
