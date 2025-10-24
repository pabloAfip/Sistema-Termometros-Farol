require('dotenv').config({ quiet: true });
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const axios = require('axios');

async function loginUser(username, password) {
    try {
        const response = await axios.post('http://localhost:3000' + '/auth/login', {
            email: username,
            senha: password
        });
        return response.data.token;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
        return null;
    }
}

const app = express();
const PORT = process.env.PORT || 4738;

// "Banco de dados" fake em memória
const users = [];

// Configuração
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hora em milissegundos
    }
}));
app.use(express.static('public'));

// Middleware de proteção
function checkAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Rotas
app.get('/', checkAuth, (req, res) => {
    const user = users.find(u => u.id === req.session.userId);
    res.render('home', { user });
});

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// Registrar usuário
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = users.length + 1;

    users.push({ id, username, password: hashedPassword });
    res.redirect('/login');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.redirect('/login?error=missingCredentials');

    const response = await loginUser(username, password);

    if (!response) return res.redirect('/login?error=loginFailed');

    req.session.userId = user.id;
    res.redirect('/');
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login');
    });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
