const Termometro = require("../models/Termometro");

// body:
// {
//     "internal_id": "AFIP-123",
//     "range": {
//         "min": 13,
//         "max": 23
//     }
// }

// traz todos termometros cadastrados
async function getTermometros(req, res) {
    try {
        const termometros = await Termometro.find();
        res.status(200).json(termometros);
    } catch (error) {
        console.error("Erro em getTermometros:", error);
        res.status(500).json({ error: "Erro ao buscar termômetros" });
    }
}

// pega o internal id (id do genenis) e retorna o termometro correspondente
async function getTermometroByInternalId(req, res) {
    const internal_id = req.params.id;
    // valida se o id foi passado
    if (!internal_id) {
        return res.status(400).json({ error: "ID do termômetro é obrigatório" });
    }

    try {
        // encontra o termemômetro pelo internal_id
        const termometro = await Termometro.findOne({ internal_id });
        if (!termometro) {
            return res.status(404).json({ error: "Termômetro não encontrado" });
        }
        res.status(200).json(termometro);
    } catch (error) {
        console.error("Erro em getTermometroById:", error);
        res.status(500).json({ error: "Erro ao buscar termômetro" });
    }
}

async function createTermometro(req, res) {
    const { internal_id, range } = req.body;
    // valida se todas informações foram passadas
    if (!internal_id || !range || range.min === undefined || range.max === undefined) {
        return res.status(400).json({ error: "Dados do termômetro incompletos" });
    }

    if (range.min >= range.max) {
        return res.status(400).json({ error: "Range inválido: min deve ser menor que max" });
    }
    try {
        if (await Termometro.findOne({ internal_id })) {
            const termometro = await Termometro.findOneAndUpdate(
                { internal_id },
                { range },
                { new: true, upsert: true }
            );
            res.status(200).json({ message: "Termômetro atualizado com sucesso", termometro });
        } else {
            const newTermometro = new Termometro({ internal_id, range });
            await newTermometro.save();
            res.status(201).json(newTermometro);
        }
    } catch (error) {
        console.error("Erro em createTermometro:", error);
        res.status(500).json({ error: "Erro ao criar termômetro" });
    }
}

async function deleteTermometro(req, res) {
    const id = req.params.id;
    // valida se o id foi passado
    if (!id) {
        return res.status(400).json({ error: "ID do termômetro é obrigatório" });
    }
    try {
        const result = await Termometro.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Termômetro não encontrado" });
        } else {
            res.status(200).json({ message: "Termômetro deletado com sucesso" });
        }
    } catch (error) {
        console.error("Erro em deleteTermometro:", error);
        res.status(500).json({ error: "Erro ao deletar termômetro" });
    }
}

module.exports = { getTermometros, getTermometroByInternalId, createTermometro, deleteTermometro };