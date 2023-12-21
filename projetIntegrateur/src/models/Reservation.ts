import mongoose, { Schema, model } from 'mongoose';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' +
    'object with the appropriate user keys.';

// **** Types **** //



/**
 * L'interface d'une réservation
 */
export interface IReservation {
    _id: string;
    numeroVol: string;
    destinationDepart: string;
    destinationArrive: string;
    nombrePassager: number;
    prix: number;
    promotion: boolean;
    dateReservation: {
        depart: Date;
        retour: Date;
    };
    informationPersonne: [{
        nom: string;
        prenom: string
        email: string;
        telephone: string;
    }];
    membre_vol: string[];
}

/**
 * Le schéma d'une réservation d'avion
 */
const ReservationSchema = new Schema<IReservation>({
    _id: { type: String, required: true },
    numeroVol: { type: String, required: true },
    destinationDepart: { type: String, required: true },
    destinationArrive: { type: String, required: true },
    nombrePassager: { type: Number, required: true },
    prix: { type: Number, required: true },
    promotion: { type: Boolean, required: true },
    dateReservation: {
        depart: { type: Date, required: false },
        retour: { type: Date, required: false },
    },
    informationPersonne: [{
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: String, required: true },
    }],
    membre_vol: [{ type: String, required: true }],
});


mongoose.pluralize(null);
export const Reservation = model<IReservation>('Reservations', ReservationSchema);