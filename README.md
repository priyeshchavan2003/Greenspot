# GreenSpot
# EV Charging Station Reservation System

This project is a web application that allows users to view the list of electric vehicle (EV) chargers, check their statuses, and reserve a charger for a specific time. The application is built using **React.js** for the frontend and **Node.js**, **Express.js**, and **PostgreSQL** for the backend.

---

## Features

1. **Main Page**:
   - Displays a list of all available chargers.
   - Shows the status of each charger (Free or Reserved).

2. **Reservation System**:
   - Users can reserve a charger for a specific time.
   - Reserved chargers cannot be booked by other users during the reservation period.

3. **Backend API**:
   - Fetches charger data from a PostgreSQL database.
   - Allows users to reserve chargers.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Styling**: Basic CSS (can be extended with frameworks like Bootstrap or Tailwind)

---

## Project Structure

### Backend (`Backend`)
- `server.js`: Contains API endpoints to handle requests for fetching and reserving chargers.

### Frontend (`ev-charging-frontend`)
- `App.js`: Main component that interacts with the backend and displays the chargers.

---

## Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm (Node Package Manager)

---

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ev-charging-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database (e.g., `ev_charging_db`).
   - Run the following SQL script to create the `chargers` table:
     ```sql
     CREATE TABLE chargers (
       id SERIAL PRIMARY KEY,
       status VARCHAR(10) DEFAULT 'free',
       reserved_by VARCHAR(255),
       reservation_time TIMESTAMP
     );
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ev-charging-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

1. **GET /api/chargers**:
   - Fetches the list of chargers and their statuses.

2. **POST /api/chargers/reserve**:
   - Reserves a charger for a specific time.
   - Request body format:
     ```json
     {
       "chargerId": 1,
       "userName": "User1",
       "reservationTime": "2024-11-15T10:00:00Z"
     }
     ```

---

## Future Improvements

- Add user authentication for personalized reservations.
- Implement real-time updates using WebSockets.
- Enhance the UI with advanced styling.
- Add validation for overlapping reservations.

---

## Developer

- Priyesh chavan - developed the basic structure of the project and working on future improvement.
