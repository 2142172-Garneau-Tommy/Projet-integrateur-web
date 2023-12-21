import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import './App.css'

interface Reservation {
  _id: string;
  numeroVol: string;
  destinationDepart: string;
  destinationArrive: string;
  prix: number;
}


function App() {
  const [count, setCount] = useState(0)

  const [listeReservations, setListeReservations] = useState<Reservation[]>([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/reservations')
      .then((response) => {
        setListeReservations(response.data.reservations);
      });
  }, []);

  const supprimerReservation = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/reservations/${id}`);
      // Rafraîchir la liste après la suppression
      const updatedReservations = listeReservations.filter(reservation => reservation._id !== id);
      setListeReservations(updatedReservations);
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation :', error);
    }
  };

  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Réservations
            </Typography>
          </Toolbar>
        </AppBar>
        <h1>Liste des réservations</h1>
        <ul>
          {listeReservations.map((reservation) => (
            <li key={reservation._id}>
              {`Numéro de vol : ${reservation.numeroVol}, Destination : ${reservation.destinationArrive}, Prix : ${reservation.prix}`}
              <button onClick={() => supprimerReservation(reservation._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
        {/*
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
        */}
      </div>
    </>
  )
}

export default App
