VOID RNG 3.3 – AURA AWAKENING

UPDATE YOUR EXISTING RENDER WEBSITE
1. Extract this ZIP. Open your GitHub repository and enter the folder that Render actually uses as Root Directory (last configured: VOID_RNG_3.2_Streaming).
2. Upload the individual files INSIDE this ZIP directly into that folder. Replace the old files, not the folder. Commit changes.
3. Render > Manual Deploy > Deploy latest commit. Confirm the new commit and refresh the same website with Ctrl+F5. Header must say AURA AWAKENING · 3.3. No new repo or Render service required.
4. Keep Node runtime, npm install, npm start. Same website origin is required to keep browser saves.

PLAYTEST
- LAB: choose any of the 40 auras and PREVIEW REVEAL. This does not award anything or broadcast a rare roll. SKIP or Escape exits.
- 1k–9,999: brief toast. 10k–99,999: 2.8s cinematic. 100k–249,999: 4.8s. 250k+: 7.2s. Reduced motion: 1.2s. Rarity is base odds. Audio is not included.
- Solo world pauses during a cinematic; multiplayer sends the local player inactive while friends continue. Luck boost timers run normally. Shared room data remains temporary.
- Local progress saves automatically (rolls, counts, crystals, equipped aura, upgrades, lifetime kills, deaths and settings). LAB > EXPORT BACKUP for a JSON copy; restore replaces your current profile, so leave your room and finish rolling first. Different browsers/devices need manual backup transfer. Old session-only 3.2 progress is not recoverable automatically. Use one playing tab per browser profile. Browser data can be cleared or lost.
- Graphics quality: Low default; Medium/High and reduced-motion options in LAB. The 40 aura visual identities are procedural vector designs; cinematics share the tier framework. Bespoke scene choreography and audio remain future work.

LOCAL PLAYTEST
Node 20+: npm start, then http://localhost:3000. Open separate browser profiles to test co-op. No new npm dependencies. Existing 3.2 streaming networking is retained. The server trusts client rolls/upgrades: this is casual, unranked multiplayer, NOT anti-cheat or a cloud inventory system.

TEST STATUS
Node syntax checks passed. Chromium inline document tests (mocked localStorage) exercised all 40 previews, a roll, save/restore and verified preview did not award a roll. Direct browser navigation to localhost/file URLs is restricted in the development environment, so full browser networking, real origin storage persistence and live Render performance still require playtesting. No public deployment was performed.
