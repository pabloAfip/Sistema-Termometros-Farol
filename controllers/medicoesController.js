const Medicao = require("../models/Medicao");

// body:
// {
//     internal_id: "AFIP-123",
//     data_hora: 2023-10-10T10:00:00Z,
//     temperatura: 22.5,
//     temp_maxima: 24,
//     temp_minima: 12
// }

async function getMedicoes(req, res) {
    try {
        const medicoes = await Medicao.find().sort({ data_hora: -1 });
        res.status(200).json(medicoes);
    } catch (error) {
        console.error("Erro em getMedicoes:", error);
        res.status(500).json({ error: "Erro ao buscar medições" });
    }
}

async function getMedicoesByInternalId(req, res) {
    const internal_id = req.params.id?.trim().toUpperCase();
    if (!internal_id) {
        return res.status(400).json({ error: "ID interno é obrigatório" });
    }

    // para coletar dados de um range de data especifico
    const { from, to } = req.query;
    const filtro = { internal_id };

    if (from || to) {
        filtro.data_hora = {};
        if (from) filtro.data_hora.$gte = new Date(from);
        if (to) filtro.data_hora.$lte = new Date(to);
    }

    try {
        const medicoes = await Medicao.find(filtro).sort({ data_hora: -1 }).limit(1000);
        res.status(200).json(medicoes);
    } catch (error) {
        console.error("Erro em getMedicoesByInternalId:", error);
        res.status(500).json({ error: "Erro ao buscar medições" });
    }
}

async function getMedicoesById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }
    try {
        const medicoes = await Medicao.findById(id);
        if (!medicoes) {
            return res.status(404).json({ error: "Medição não encontrada" });
        }
        res.status(200).json(medicoes);
    } catch (error) {
        console.error("Erro em getMedicoesById:", error);
        res.status(500).json({ error: "Erro ao buscar medições" });
    }
}

async function createMedicao(req, res) {
    const { internal_id, data_hora, temperatura, temp_maxima, temp_minima } = req.body;
    if (!internal_id || !data_hora || temperatura === undefined || temp_maxima === undefined || temp_minima === undefined) {
        return res.status(400).json({ error: "Dados da medição incompletos" });
    }
    try {
        const newMedicao = new Medicao({ internal_id, data_hora: new Date(data_hora), temperatura, temp_maxima, temp_minima });
        await newMedicao.save();
        res.status(201).json(newMedicao);
    } catch (error) {
        console.error("Erro em createMedicao:", error);
        res.status(500).json({ error: "Erro ao criar medição" });
    }
}

async function deleteMedicao(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID da medição é obrigatório" });
    }
    try {
        const result = await Medicao.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Medição não encontrada" });
        }
        res.status(200).json({ message: "Medição deletada com sucesso" });
    } catch (error) {
        console.error("Erro em deleteMedicao:", error);
        res.status(500).json({ error: "Erro ao deletar medição" });
    }
}

module.exports = { getMedicoes, getMedicoesById, getMedicoesByInternalId, createMedicao, deleteMedicao };