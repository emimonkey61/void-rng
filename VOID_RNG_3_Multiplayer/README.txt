VOID RNG 3.0 - MULTIPLAYER PLAYTEST

PUBLIC WEBSITE (Render)
1. Unzip this archive. Create a GitHub repository and upload the files inside the archive to its root.
2. Go to https://dashboard.render.com/ and select New > Web Service. Connect the repository.
3. Runtime: Node. Build: npm install. Start: npm start. Choose the Free plan if available. Deploy.
4. Open the generated onrender.com URL. Create Room, enter your nickname, and click Copy Invite. Send that link on Discord. Friends enter a nickname and click Join Room (the room code is prefilled).
Do not upload just index.html to static hosting: online rooms require server.js to run. Render's free service can sleep when inactive.

LOCAL PLAYTEST
Install Node.js 20 or newer, open a terminal in the extracted folder, run npm start, then visit http://localhost:3000 in two tabs. No extra dependencies. Opening index.html directly supports solo only.

ROOMS: 8 players, shared enemies, loot, bosses and movement. Separate rolls, upgrades and inventories. Collectibles go to the nearest eligible player. Rooms expire when all players leave or disconnect. Progress is session-only. This is a casual prototype: the server simulates the world, but local rolls and upgrades are trusted; not suitable for competitive play or real-money rewards. No persistent accounts. Browser integration has not been verified in this restricted environment; API checks passed.
