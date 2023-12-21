import HttpStatusCodes from '../constants/HttpStatusCodes';

import ReservationService from '../services/ReservationService';
import { IReservation } from '../models/Reservation';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Lire tous les réservations.
 */
async function getAll(_: IReq, res: IRes) {
  const reservations = await ReservationService.getAll();
  return res.status(HttpStatusCodes.OK).json({ reservations });
}

/**
 * Lit une réservation par son numéro.
 */
async function getByNumero(req: IReq, res: IRes) {
  const numeroFacture = +req.params.numeroFacture;
  const reservations = await ReservationService.getByNumero(numeroFacture);
  return res.status(HttpStatusCodes.OK).json({ reservations });
}

/**
 * Lit une réservation par son nom de service.
 */
async function getByNomService(req: IReq, res: IRes) {
  const nomService = req.params.nomService;
  const reservations = await ReservationService.getByNomService(nomService);
  return res.status(HttpStatusCodes.OK).json({ reservations });
}

/**
 * Ajoute une réservation.
 */
async function add(req: IReq<{ reservation: IReservation }>, res: IRes) {
  let { reservation } = req.body;
  reservation = await ReservationService.addOne(reservation);
  return res.status(HttpStatusCodes.CREATED).json({ reservation });
}

/**
 * Mise à jour d'une réservation.
 */
async function update(req: IReq<{ reservation: IReservation }>, res: IRes) {
  let { reservation } = req.body;
  reservation = await ReservationService.updateOne(reservation);
  return res.status(HttpStatusCodes.OK).json({ reservation });
}

/**
 * Lit la moyenne des réservations.
 */
async function getMoyenne(req: IReq, res: IRes) {
    const coutTotal = +req.params.numeroFacture;
    const reservations = await ReservationService.getMoyenne(coutTotal);
    return res.status(HttpStatusCodes.OK).json({ reservations });
  }

// **** Export default **** //

export default {
  getAll,
  getByNumero,
  getByNomService,
  add,
  update,
  getMoyenne
} as const;
