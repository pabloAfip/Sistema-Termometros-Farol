const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // para hash de senha

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

// Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para comparar senha
userSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('User', userSchema);