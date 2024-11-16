const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ev_charging_station',
  password: '1973',
  port: 5432
});

app.get('/api/chargers', async (req, res) => {
  const result = await pool.query('SELECT * FROM chargers');
  res.json(result.rows);
});

app.post('/api/chargers/reserve', async (req, res) => {
  const { chargerId, userName, reservationTime } = req.body;
  const result = await pool.query(
    `UPDATE chargers 
     SET status = 'reserved', reserved_by = $1, reservation_time = $2 
     WHERE id = $3 AND status = 'free' RETURNING *`,
    [userName, reservationTime, chargerId]
  );

  if (result.rows.length > 0) {
    res.json({ success: true, charger: result.rows[0] });
  } else {
    res.status(400).json({ success: false, message: 'Charger already reserved' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));