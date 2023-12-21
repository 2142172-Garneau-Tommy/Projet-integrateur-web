import { IReservation, Reservation } from '../models/Reservation'

// **** Functions **** //

/**
 * Lire une réservation par son numéro.
 */
async function getByNumero(numeroReservation: number): Promise<IReservation[]> {
  return await Reservation.find({ numeroReservation });
}

/**
 * Lire une réservation par son nom de service
 */
async function getByNomService(nomService: string): Promise<IReservation[]> {
    const nomServices = await Reservation.find({ nomService });
    console.log(nomServices);

    return nomServices
  }

/**
 * Vérifie si la réservation existe.
 */
async function persists(id: string): Promise<boolean> {
  const reservation = Reservation.findById(id);

  return reservation !== null;
}

/**
 * Lire toutes les réservations.
 */
async function getAll(): Promise<IReservation[]> {
  const reservations = Reservation.find();
  console.log(reservations);
  
  return reservations;
}

/**
 * Ajoute une réservation valide.
 */
async function add(reservation: IReservation): Promise<IReservation> {
  const nouvelleReservation = new Reservation(reservation);
  await nouvelleReservation.save();
  return nouvelleReservation;
}

/**
 * Mets à jour une réservation a partir de son id.
 */
async function update(reservation: IReservation): Promise<IReservation> {
  const reservationToUpdate = await Reservation.findById(reservation._id);
  if (reservationToUpdate === null) {
    throw new Error('Reservation non trouvé');
  }
  reservationToUpdate.numeroVol = reservation.numeroVol;
  reservationToUpdate.destinationDepart = reservation.destinationDepart;
  reservationToUpdate.destinationArrive = reservation.destinationArrive;
  reservationToUpdate.nombrePassager = reservation.nombrePassager;
  reservationToUpdate.prix = reservation.prix;
  await reservationToUpdate.save();
  return reservationToUpdate;
}

/**
 * Lire une réservation par son nom de service
 */
async function getMoyenne(prixService: number): Promise<number> {
    const coutTotal = await Reservation.count({prixService});
    return coutTotal;
}

// **** Export default **** //

export default {
  getByNumero,
  getByNomService,
  persists,
  getAll,
  add,
  update,
  getMoyenne,
} as const;
