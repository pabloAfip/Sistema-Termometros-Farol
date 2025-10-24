const Acao = require("../models/Acao");

// body:
// {
//     internal_id: "AFIP-123",
//     alert_id: "23472df247234f234",
//     alert_data_hora: 2023-10-10T10:00:00Z,
//     data_hora: 2023-10-10T10:05:00Z,
//     descricao: "Descrição da ação"
// }

async function getAcoes(req, res) {
    try {
        const acoes = await Acao.find();
        res.status(200).json(acoes);
    } catch (error) {
        console.error("Erro em getAcoes:", error);
        res.status(500).json({ error: "Erro ao buscar ações" });
    }
}

async function getAcoesByInternalId(req, res) {
    const internal_id = req.params.id;
    if (!internal_id) {
        return res.status(400).json({ error: "ID interno é obrigatório" });
    }
    try {
        const acoes = await Acao.find({ internal_id }).sort({ data_hora: -1 }).limit(1000);
        res.status(200).json(acoes);
    } catch (error) {
        console.error("Erro em getAcoesByInternalId:", error);
        res.status(500).json({ error: "Erro ao buscar ações" });
    }
}

async function getAcoesById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }
    try {
        const acoes = await Acao.findById(id);
        if (!acoes) {
            return res.status(404).json({ error: "Ação não encontrada" });
        }
        res.status(200).json(acoes);
    } catch (error) {
        console.error("Erro em getAcoesById:", error);
        res.status(500).json({ error: "Erro ao buscar ações" });
    }
}

async function createAcao(req, res) {
    const { internal_id, alert_id, alert_data_hora, data_hora, descricao } = req.body;
    if (!internal_id || !alert_id || !alert_data_hora || !data_hora || !descricao) {
        return res.status(400).json({ error: "Dados da ação incompletos" });
    }
    try {
        const newAcao = new Acao({ internal_id, alert_id, alert_data_hora: new Date(alert_data_hora), data_hora: new Date(data_hora), descricao: descricao.toString() });
        await newAcao.save();
        res.status(201).json(newAcao);
    } catch (error) {
        console.error("Erro em createAcao:", error);
        res.status(500).json({ error: "Erro ao criar ação" });
    }
}

async function deleteAcao(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "ID da ação é obrigatório" });
    }
    try {
        const result = await Acao.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Ação não encontrada" });
        } else {
            res.status(200).json({ message: "Ação deletada com sucesso" });
        }
    } catch (error) {
        console.error("Erro em deleteAcao:", error);
        res.status(500).json({ error: "Erro ao deletar ação" });
    }
}

async function updateAcao(req, res) {
    const id = req.params.id;
    const { data_hora, descricao } = req.body;
    if (!id || !data_hora || !descricao) {
        return res.status(400).json({ error: "Dados da ação incompletos" });
    }
    try {
        // permite mudar apenas data_hora e descricao
        const updatedAcao = await Acao.findByIdAndUpdate(
            id,
            { data_hora: new Date(data_hora), descricao: descricao.toString() },
            { new: true }
        );
        if (!updatedAcao) {
            return res.status(404).json({ error: "Ação não encontrada" });
        }
        res.status(200).json({ message: "Ação atualizada com sucesso", updatedAcao });
    } catch (error) {
        console.error("Erro em updateAcao:", error);
        res.status(500).json({ error: "Erro ao atualizar ação" });
    }
}

module.exports = { getAcoes, getAcoesById, getAcoesByInternalId, createAcao, deleteAcao, updateAcao };