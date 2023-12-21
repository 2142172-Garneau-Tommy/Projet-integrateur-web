import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    numeroVol: '',
    destinationDepart: '',
    destinationArrive: '',
    nombrePassager: '',
    prix: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/reservations', reservation);

      console.log('Réservation ajoutée avec succès', response.data);

      setReservation({
        numeroVol: '',
        destinationDepart: '',
        destinationArrive: '',
        nombrePassager: '',
        prix: '',
      });
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de l\'ajout de la réservation', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Numéro de vol:
        <input
          type="text"
          name="numeroVol"
          value={reservation.numeroVol}
          onChange={handleChange}
        />
      </label>

      <label>
        Destination de départ:
        <input
          type="text"
          name="destinationDepart"
          value={reservation.destinationDepart}
          onChange={handleChange}
        />
      </label>

      <label>
        Destination d'arrivée:
        <input
          type="text"
          name="destinationArrive"
          value={reservation.destinationArrive}
          onChange={handleChange}
        />
      </label>

      <label>
        Nombre de passagers:
        <input
          type="number"
          name="nombrePassager"
          value={reservation.nombrePassager}
          onChange={handleChange}
        />
      </label>

      <label>
        Prix:
        <input
          type="number"
          name="prix"
          value={reservation.prix}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ReservationForm;
