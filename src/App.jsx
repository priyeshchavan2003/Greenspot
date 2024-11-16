import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [chargers, setChargers] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [reservationTime, setReservationTime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/chargers')
      .then(response => setChargers(response.data))
      .catch(error => console.error('Error fetching chargers:', error));
  }, []);

  const handleReserve = (chargerId) => {
    axios.post('http://localhost:5000/api/chargers/reserve', {
      chargerId,
      userName: 'User1',
      reservationTime
    })
    .then(response => {
      alert('Charger reserved successfully');
      setChargers(prev => prev.map(charger =>
        charger.id === chargerId ? response.data.charger : charger
      ));
      setSelectedCharger(null);
      setReservationTime('');
    })
    .catch(error => alert(error.response.data.message || 'Failed to reserve charger'));
  };

  return (
    <div className='mainpage'>
      <h1>GreenSpot</h1>
      <ul>
        {chargers.map(charger => (
          <li key={charger.id}>
            <span>Charger {charger.id}</span>
            <span> {charger.status}</span>
            {charger.status === 'free' && (
              <button onClick={() => setSelectedCharger(charger.id)}>Reserve</button>
            )}
          </li>
        ))}
      </ul>
      
      {selectedCharger && (
        <div className='selector'>
          <h2>Reserve Charger {selectedCharger}</h2>
          <input
            type="datetime-local"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
          />
          <button onClick={() => handleReserve(selectedCharger)}>Confirm Reservation</button>
          <button onClick={() => setSelectedCharger(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;