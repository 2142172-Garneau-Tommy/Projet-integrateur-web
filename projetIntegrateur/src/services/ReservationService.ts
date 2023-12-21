import ReservationRepo from '../repos/ReservationRepo';
import { IReservation } from '../models/Reservation';
import { RouteError } from '../other/classes';
import HttpStatusCodes from '../constants/HttpStatusCodes';

// **** Variables **** //

export const Reservation_NOT_FOUND_ERR = 'Réservation non trouvé';

// **** Functions **** //

/**
 * Lire tous les réservations.
 */
function getAll(): Promise<IReservation[]> {
    return ReservationRepo.getAll();
}

/**
 * Lire tous les réservations.
 */
function getByNumero(numeroFacture: number): Promise<IReservation[]> {
    return ReservationRepo.getByNumero(numeroFacture);
}

/**
 * Lire tous les réservations par leur nom de service.
 */
function getByNomService(nomService: string): Promise<IReservation[]> {
    return ReservationRepo.getByNomService(nomService);
}

/**
 * Ajouter une réservation.
 */
function addOne(reservation: IReservation): Promise<IReservation> {
    return ReservationRepo.add(reservation);
}

/**
 * Mise à jour d'une réservation.
 */
async function updateOne(reservation: IReservation): Promise<IReservation> {
    const persists = await ReservationRepo.persists(reservation._id!);
    if (!persists) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        Reservation_NOT_FOUND_ERR
      );
    }

    return ReservationRepo.update(reservation);
}

/**
 * Calcul la moyenne des réservations.
 */
function getMoyenne(prixService: number): Promise<number> {
    return ReservationRepo.getMoyenne(prixService);
}

// **** Export default **** //

export default {
    getAll,
    getByNumero,
    getByNomService,
    addOne,
    updateOne,
    getMoyenne,
} as const;
