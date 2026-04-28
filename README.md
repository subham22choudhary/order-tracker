# Mini Order Status (Mos) Tracker
A real-time order tracking system with a Rider Panel and Customer Panel.

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev        # starts on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

### Run Tests
```bash
cd backend
npm test
```

## Hardcoded Token
`rider-secret-token-123` — pre-filled in the Rider Panel.

## Assumptions
- In-memory store resets on server restart (no DB)
- Orders must start at `pending`
- Status transitions are strictly linear: `pending → picked_up → out_for_delivery → delivered`


## What I'd Improve With More Time
- Replace polling with WebSockets (Socket.io) for true real-time
- Persist orders to Redis or a DB
- Add JWT-based auth instead of hardcoded token
- Add more unit/integration tests
- Deploy via Docker Compose
