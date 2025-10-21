const express = require("express");
const router = express.Router();
const autenticarToken = require("../middleware/authMiddleware");

// status da API
router.get("/status", (req, res) => { res.json({ status: "API está rodando" }); });

// endpoints de termometro
const { getTermometros, getTermometroByInternalId, createTermometro, deleteTermometro } = require("../controllers/termometroController");
router.get('/termometros', autenticarToken, getTermometros);
router.get('/termometros/:id', autenticarToken, getTermometroByInternalId);
router.post('/termometros', autenticarToken, createTermometro);
router.delete('/termometros/:id', autenticarToken, deleteTermometro);

// endpoints de ações
const { getAcoes, getAcoesById, getAcoesByInternalId, createAcao, deleteAcao, updateAcao } = require('../controllers/acoesController');
router.get('/acoes', autenticarToken, getAcoes);
router.get('/acoes/:id', autenticarToken, getAcoesById);
router.get('/acoes/internal/:id', autenticarToken, getAcoesByInternalId);
router.post('/acoes', autenticarToken, createAcao);
router.delete('/acoes/:id', autenticarToken, deleteAcao);
router.put('/acoes/:id', autenticarToken, updateAcao);

// endpoints de medições
const { getMedicoes, getMedicoesById, getMedicoesByInternalId, createMedicao, deleteMedicao } = require("../controllers/medicoesController");
router.get('/medicoes', autenticarToken, getMedicoes);
router.get('/medicoes/:id', autenticarToken, getMedicoesById);
router.get('/medicoes/internal/:id', autenticarToken, getMedicoesByInternalId);
router.post('/medicoes', autenticarToken, createMedicao);
router.delete('/medicoes/:id', autenticarToken, deleteMedicao);

// endpoints de alertas
const { getAlertas, getAlertasById, getAlertasByInternalId, createAlerta, deleteAlerta } = require("../controllers/alertasController");
router.get('/alertas', autenticarToken, getAlertas);
router.get('/alertas/:id', autenticarToken, getAlertasById);
router.get('/alertas/internal/:id', autenticarToken, getAlertasByInternalId);
router.post('/alertas', autenticarToken, createAlerta);
router.delete('/alertas/:id', autenticarToken, deleteAlerta);

module.exports = router;