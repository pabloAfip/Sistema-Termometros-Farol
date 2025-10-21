const Alerta = require('../models/Alerta');

// body:
// {
//     internal_id: "AFIP-123",
//     data_hora: 2023-10-10T10:00:00Z,
//     temperatura: 22.5
// }

async function getAlertas(req, res) {
    try {
        const alertas = await Alerta.find();
        res.status(200).json(alertas);
    } catch (error) {
        console.error("Erro em getAlertas:", error);
        res.status(500).json({ error: "Erro ao buscar alertas" });
    }
}

async function getAlertasByInternalId(req, res) {
    const internal_id = req.params.id;
    if (!internal_id) {
        return res.status(400).json({ error: "ID interno é obrigatório" });
    }
    try {
        const alertas = await Alerta.find({ internal_id }).sort({ data_hora: -1 }).limit(1000);
        res.status(200).json(alertas);
    } catch (error) {
        console.error("Erro em getAlertasByInternalId:", error);
        res.status(500).json({ error: "Erro ao buscar alertas" });
    }
}

async function getAlertasById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }
    try {
        const alertas = await Alerta.findById(id);
        if (!alertas) {
            return res.status(404).json({ error: "Alerta não encontrado" });
        }
        res.status(200).json(alertas);
    } catch (error) {
        console.error("Erro em getAlertasById:", error);
        res.status(500).json({ error: "Erro ao buscar alertas" });
    }
}

async function createAlerta(req, res) {
    const { internal_id, data_hora, temperatura } = req.body;
    if (!internal_id || !data_hora || temperatura === undefined) {
        return res.status(400).json({ error: "Dados do alerta incompletos" });
    }
    try {
        const newAlerta = new Alerta({ internal_id, data_hora: new Date(data_hora), temperatura });
        await newAlerta.save();
        res.status(201).json(newAlerta);
    } catch (error) {
        console.error("Erro em createAlerta:", error);
        res.status(500).json({ error: "Erro ao criar alerta" });
    }
}

async function deleteAlerta(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID do alerta é obrigatório" });
    }
    try {
        const result = await Alerta.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Alerta não encontrado" });
        }
        res.status(200).json({ message: "Alerta deletado com sucesso" });
    } catch (error) {
        console.error("Erro em deleteAlerta:", error);
        res.status(500).json({ error: "Erro ao deletar alerta" });
    }
}

module.exports = { getAlertas, getAlertasById, getAlertasByInternalId, createAlerta, deleteAlerta };