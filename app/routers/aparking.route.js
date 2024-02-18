import express from 'express';

const router = express.Router();

import { createEntradaCoche, createNuevoCoche, getBeneficioDia, getListaCoches, getPlazas, getPlazasById, getPlazasLibres, getTicketSinCerrar, getTickets, updateSalidaCoche } from '../controllers/aparkingController.js';

router.get('/', getPlazas);
router.get('/ticketsSinCerrar', getTicketSinCerrar);
router.get('/listaCoches', getListaCoches);
router.get('/plazasLibres', getPlazasLibres);
router.get('/buscarPlaza/:id', getPlazasById);
router.get('/listaTickets', getTickets);
router.get('/beneficioDia/:dia/:mes/:ano', getBeneficioDia);
router.post('/entradaCoche', createEntradaCoche);
router.post('/nuevoCoche', createNuevoCoche);
router.put('/updateSalidaCoche/:id/', updateSalidaCoche);

export default router;