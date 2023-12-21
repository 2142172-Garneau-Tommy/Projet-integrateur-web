import { Router, NextFunction, Request, Response } from 'express';

import Paths from '../constants/Paths';
import ReservationRoutes from './ReservationRoutes';
import { IReservation, Reservation } from '../models/Reservation'
import HttpStatusCodes from '../constants/HttpStatusCodes';


// **** Variables **** //
const apiRouter = Router();

// Cette fonction a été inspirée du site web de Étienne Rivard
// https://web3.kerzo.ca/projet_complet_mongoose/

// ** Validation d'une facture ** //
function validateReservation(req: Request, res: Response, next: NextFunction) {
    const nouvelleReservation = new Reservation(req.body.reservation);
    const error = nouvelleReservation.validateSync();
    if (error !== null && error !== undefined) {
      res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    } else {
      next();
    }
  }


// ** ajoute factureRouter ** //

const reservationRouter = Router();

// Lire toutes les factures
reservationRouter.get(
  Paths.Reservations.Get,
  ReservationRoutes.getAll,
);

// Lire une facture par son numéro
reservationRouter.get(
    Paths.Reservations.GetOne,
    ReservationRoutes.getByNumero,
);

// Lire une facture par son nom de service
reservationRouter.get(
    Paths.Services.Get,
    ReservationRoutes.getByNomService,
);

// Ajouter une nouvelle facture
reservationRouter.post(
  Paths.Reservations.Add,
  validateReservation,
  ReservationRoutes.add,
);

// Mettre à jour une facture
reservationRouter.put(
  Paths.Reservations.Update,
  validateReservation,
  ReservationRoutes.update,
);

// Lit la moyenne d'une facture
reservationRouter.get(
    Paths.Stats.Moyenne,
    validateReservation,
    ReservationRoutes.getMoyenne,
  );

// ajoute factureRouter
apiRouter.use(Paths.Reservations.Base, reservationRouter);


// **** Export default **** //

export default apiRouter;

