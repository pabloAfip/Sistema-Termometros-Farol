require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: "Token não informado!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token inválido ou expirado!" });
        req.user = user; // disponibiliza os dados do usuário na requisição
        next();
    });
}

module.exports = autenticarToken;