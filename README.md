# Tic-Tac-Flow: The Dynamic Strategy Game

Tic-Tac-Flow is an advanced reimagining of the classic Tic-Tac-Toe concept, engineered for competitive and strategic depth. By introducing a First-In-First-Out (FIFO) mechanics, the game board remains a constantly evolving state-space, forcing players to account for the chronological persistence of their pieces.

## Core Gameplay Mechanics
The fundamental constraint of Tic-Tac-Flow is the limited spatial capacity of the board:
*   **Capacity Limit:** The board can hold a maximum of 6 pieces simultaneously.
*   **The FIFO Flow:** Upon placing a 7th piece, the oldest piece currently on the board is automatically removed. This ensures that the game board is never fully static and encourages high-level predictive gameplay.

## Game Modes
The application supports multiple engagement vectors:

### Solo Mode
*   **AI Engine:** Players compete against a dedicated backend-side AI.
*   **Difficulty Levels:** Three tiered difficulty settings, governed by the backend engine.

### Duel Mode
*   **Local PvP:** Hot-seat multiplayer on a single device.
*   **Online PvP:** Real-time multiplayer facilitated by a WebSocket server.
*   **Lobby System:** Includes Create/Join Room functionality for private matches.

## System Architecture and Tech Stack
The project follows a decoupled architecture, separating UI rendering from game state logic and AI computation.

| Layer | Technologies | Role |
| :--- | :--- | :--- |
| **Frontend** | [React], [Vite], [Framer Motion] | Responsive UI, client-side state management |
| **Backend** | [FastAPI], [Python], [WebSockets] | Game server, rule validation, AI processing |
| **Communication** | [WebSockets] | Low-latency state synchronization |

## Detailed Folder Structure
```text
Tic-Tac-Flow/
├── frontend/                    
│   ├── src/
│   │   ├── components/           # UI Modularization (Board, Disc, Layout, Menu)
│   │   ├── hooks/                # Custom React hooks (Game State, Networking)
│   │   └── logic/                # Frontend-side game rules validation
│   └── package.json              # Frontend dependencies
├── backend/                      
│   ├── app/
│   │   ├── main.py               # Application entry point
│   │   ├── sockets.py            # WebSocket event handling
│   │   └── game_engine.py        # Authoritative game logic and AI
│   └── requirements.txt          # Backend dependencies
└── ...
```

## Setup & Deployment
1.  **Backend**: Navigate to `backend/`, install requirements via `pip`, and run the FastAPI server (e.g., `uvicorn app.main:app`).
2.  **Frontend**: Navigate to `frontend/`, install dependencies via `npm install`, and execute `npm run dev`.

*Built for portfolio purposes.*
