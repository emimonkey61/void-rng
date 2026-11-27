VOID RNG 5.0.0 — THE FRACTURED REALITY (beta)
================================================
INSTALL: Back up the existing solo profile from LAB. Preserve the existing Render service, root directory, URL and DATABASE_URL. Upload the files in this ZIP directly into the configured root directory; do not create a nested folder. Deploy latest commit, then check /health for 5.0.0 and Ctrl+F5. The solo preview is separate and does not connect to multiplayer.

NEW PLAYABLE CONTENT
- 500 base auras (310 appended; the original 190 IDs remain intact). Base rarity reaches 1 in 100 billion. Procedurally varied mirrored motifs, existing four reveal tiers and 58 older custom premium storyboards; new reveals use the shared cinematic engine.
- ASCENSION: mastery kills, three awakening levels (mastery/crystals/relics), prestige (resets XP only, retains gear and auras), three skill paths, five new craftable equipment pieces, five boss relics, enchantments, exploration rewards, titles, favorites and duplicate salvage. Rolls can suppress reveals below a selected rarity. Inventory stays paginated.
- One world, existing ten biomes: village merchants, waystones, caches, regenerating material deposits and cave entrances. Approach a landmark and press F or INTERACT. First interaction at a merchant unlocks the waystone; subsequent interactions buy materials. Travel via ASCENSION. Five caches complete a hidden quest. The ten-biome map retains collision obstacles and fog-of-war.
- Elemental auto-attack modifiers and element-specific Pulse behavior, critical hits and resistances. Five additional bosses rotate every fifth world wave and award unique relics. Bosses share the existing bounded phased projectile AI with variations, rather than fully bespoke encounters.
- Dungeon mode selector: Normal, Hard, Weekly (weekly deterministic seed and one bonus per week), Endless Arena (repeat dungeon chambers with escalating difficulty), Guild Raid (online guild-only host/member check). Use Exit Dungeon to leave. Guild XP is earned from boss contributions. Arena is a repeated dungeon challenge, not a separate map.
- Friends (request/accept/remove), open guilds (create/join/leave), room chat, public quick-match rooms, PvE rankings and follow-first-active-player spectator mode. Online accounts and a room are required; chat is rate limited but lacks moderation tooling.
- Refreshed layout, mobile direction pad and larger controls, fullscreen HUD, remappable Q/E/R skills, synthesized ability audio, FPS/RTT/entity count/snapshot age. Existing camera prediction, nearby snapshots, cached terrain and aura sprites remain.

SAVE / DEPLOYMENT CAUTION
Additive schema-2 asc fields; keep original names and IDs and the same localStorage key. Solo and verified online accounts remain separate. Existing database configuration is essential: without a durable PostgreSQL DATABASE_URL (or durable SAVE_FILE storage), Render can wipe online progress on deployment. Never publish credentials or account save files. Test on a staging service or take a database backup first. Keep 4.0.3 as a rollback point; rolling back may drop 5.0-specific fields on the next save.

TESTS PERFORMED
npm test covers original regression suite plus 500-aura probabilities, legacy migration, mastery, awakening, skill points, prestige, gear crafting/enchantment, boss gear equip, salvage/favorite protection, world interaction distance validation, deposit cooldown after normalization, secret quest, exploration reward claims, elemental stats, friend requests, guild membership and restart persistence, chat, PvE rankings, spectator roll rejection, hard dungeon selection and public matchmaking. Isolated Chromium smoke tests exercised rolling, inventory search, Ascension panel, hard dungeon entry and exit, fullscreen exit and a new premium reveal. All 500 aura render paths produced nonempty images with zero mirrored alpha-channel differences at the tested frame. Direct file navigation was blocked in the test environment, so the browser used injected HTML content. No live Render or real PostgreSQL test, load benchmark, complete guild/weekly/arena boss clear, every ability/gear combination or real end-to-end browser-to-browser test was performed. Treat as beta.

SCOPE DECISIONS
Five extra dimensions omitted in favor of the user's later stated preference for one world with ten biomes. UI is a refresh of existing layout rather than a fully replaced interface. New aura visuals and premium scenes are generated using bounded shared renderers; not 310 individually hand-authored cinematics. No guarantee of live FPS or zero bugs. Guild and matchmaking systems are lightweight prototypes, not a production moderation or matchmaking platform.

--- EXISTING 4.0.3 GUIDE (historical, older version references) ---
VOID RNG 4.0.3 — DUNGEON EXIT HOTFIX (playtest release)
================================================
INSTALL / EXISTING RENDER WEBSITE
1. Export your current browser backup from LAB before updating.
2. Extract this ZIP. In GitHub, open the exact folder currently configured as Render Settings > Root Directory. Upload the extracted files into that folder, not a new nested folder. Commit.
3. In Render keep Runtime Node, Build Command npm install, Start Command npm start, and the same root directory and website URL. Deploy latest commit. /health should report version 4.0.3. Refresh with Ctrl+F5.
4. To play online, every player registers a username/password (minimum 8 characters, use a unique password for this test game), then creates/joins a room or uses the invite link. Account passwords are salted/scrypt-hashed. The account session lasts up to 24 hours, and a service restart requires signing in again.

DURABLE CLOUD SAVES — IMPORTANT
The server supports a PostgreSQL DATABASE_URL environment variable. Set it on your existing Render service BEFORE players start building verified online profiles. Use the same durable PostgreSQL database across deployments. The server creates the void_state table automatically. npm install installs the pg driver. Test signup, saving, and restart before inviting friends. Database setup/credentials are not included. The server is designed for ONE running instance, not horizontally scaled replicas. The state snapshot is periodically written (about 1.5 seconds; a crash may lose recent unsaved actions); LAB > SAVE NOW requests a write. There is no password reset or email recovery in this playtest.
Without DATABASE_URL, the server uses a local JSON file (SAVE_FILE optional). On Render's ephemeral filesystem this is NOT reliable across redeploys. A persistent disk or a durable DB is required. Do not switch to a blank DB after earning online progress unless you migrate the JSON data first. Do not upload data/profiles.json or credentials into GitHub.

SAVE COMPATIBILITY
Legacy 3.3 schema-1 browser saves migrate by original aura names into schema 2 and stay under the same localStorage key (void-rng.profile). All original 40 names/order, prior crystals, rolls and upgrades are retained in solo mode, provided the same browser/origin and readable save are used. The secure online profile is separate: previous browser data is client-editable and cannot be accepted as verified online currency or tradeable inventory. Joining a room temporarily loads the account profile; leaving restores the solo profile. Browser backup export remains the local/solo backup. Previously unsaved sessions cannot be reconstructed.

PLAY
WASD/arrows or touch-drag; Space rolls; Q Pulse, E Dash, R Ward (shared cooldown). Auto-roll is available. Enter a dungeon from WORLD (host only online); clear generated chambers and follow connected corridors. Find materials and temporary luck boosts in biomes. FORGE has five craftable gauntlets, three charms and three potions; QUESTS has daily and lifetime claims. MARKET supports fixed-price sales, private crystal offers, private aura swaps, five-minute auctions and global rankings. Online accounts and an active room are required for market/rankings. BASE supports themes, five upgrade levels, three aura pedestals, and visiting online museums. LAB previews all 190 aura reveals without granting rewards and controls graphics/audio.

REVEALS
1K–<10K: 1.1s micro hit, no pause. 10K–<100K: 2.8s. 100K–<250K: 4.8s. 250K+: 7.2s. Real cutscenes pause the player's own active combat/rolling (not everyone else). Skip/reduced motion supported. Server still enforces roll cooldowns. The 58 premium auras have different authored three-act sequences composed from shared vector drawing primitives. Original synthesized audio, not licensed music. 150 additional auras have biome/event/dungeon eligibility, distinct motif/formation combinations, and base odds up to 1B; rarity probability is normalized and capped under high luck. Mutations are extra cosmetic discoveries (Corrupted/Shattered/Ascended/Glitched), not extra base auras.

TESTED / LIMITS
npm test exercises catalog and probability invariants, old save migration, crafting and potion actions, authentication, 3-player rooms, server-authoritative rolls/cooldowns, forged input rejection, movement, private trades, barter, auction escrow/refunds, museum, leaderboard, dungeon layout, and account restart persistence using local JSON. An isolated Chromium test rendered all 190 aura paths and 58 premium sequences at multiple timeline points and checked solo UI, migration, search and dungeon opening without JS errors. Browser navigation to localhost was blocked, so live full multiplayer browser synchronization, PostgreSQL connectivity and real Render FPS/ping remain unverified. Auction expiry settlement, every boss/event outcome and large concurrent loads need additional live testing. Basic server-side validation is not a complete security audit. This is a playable prototype, not production-grade account/economy software. Keep the existing Render deployment as a rollback point. Do not promise permanent cloud saves without a durable configured DB.

4.0.1 EXPLORER PATCH
- All 190 equipped aura renderers are vertically mirrored and cached at 12/24 animation frames per second. Mutation indicators have matching left and right rune pairs. Cinematic background effects remain themed.
- FULLSCREEN enlarges just the WORLD pane; click EXIT FULLSCREEN or press Esc to return to the tabs. Native fullscreen where supported, viewport fallback otherwise.
- Minimap reveals one of 600 map tiles only when stepped into. Boost/boss/player markers in unexplored cells are hidden. Solo and online exploration are saved separately in existing schema-2 profiles, with old saves starting with empty exploration; dungeon exploration is temporary.
- Six collision obstacles per biome (60 total), roads and landmark plazas. Shared deterministic geometry is enforced for player movement and dash on server and client. Magical projectiles can pass through obstacles.
- EXIT DUNGEON returns a solo player or a sole online participant to the overworld. If other online players remain, the exiting player is transferred to a fresh overworld room with their existing account and inventory; the dungeon continues for the others. The invite code changes in this case. Uncollected dungeon loot is abandoned; there is no completion reward on abandonment. Chamber and enemy counts are displayed.
- Existing save schema, aura IDs, inventory, currency and upgrade data remain compatible. Keep the same database configuration to preserve online progress.
- Tested: node server regression suite, including 3-player dungeon exit and exploration persistence; Chromium solo fullscreen, movement, dungeon exit, save and 190 mirrored aura alpha pixel checks. No live Render performance or external PostgreSQL test was performed for this patch.

4.0.3 HOTFIX
- One-click dungeon exit (no native confirm). Dedicated request bypasses general action/roll locks and rate limit. Server returns a sequenced overworld snapshot immediately; older streamed frames are ignored. Retry is safe when already outside. Pending movement is cleared. No save schema changes.

4.0.3: 2-tile reveal radius (up to 13 cells), independent skill cooldowns, facing-based 192-unit dash, authoritative skill snapshots, pulse kills grant normal rewards, visual feedback. No save schema change.

VERSION 5.1.0 — VOID FX (experimental graphics patch)
=====================================================
Deploy all files together, including void-fx.js, into the existing Render root.
Keep the existing URL, database environment and save file settings. This patch
changes graphics preferences only, not gameplay, accounts or inventory schemas.
Choose LAB > Graphics quality > Photorealistic FX (or Ultra). Low is the default
for new profiles. The FX button in the game cycles quality. Optional controls:
adaptive resolution/fallback, 50/75/100% FX resolution, intensity, atmospheric
glow, and cinematic-only effects. Ultra limits shader resolution to 50%.
The WebGL overlay uses original procedural symmetric shaders for nine elemental
families. It is cinematic/stylized, not physically based photorealism; actual
scene lensing, volumetric 3D rendering and PvP are not included in this patch.
No additional multiplayer data is sent. The layer draws only nearby players
(max four, or two at reduced resolution), and uses 30 FPS effects at 50%.
Three consecutive sub-35 FPS samples reduce FX resolution; five more trigger
High fallback. Unsupported/lost GPU context also falls back. Re-select the
mode to retry. Graphics preferences are stored locally per browser.
Tests: existing Node multiplayer regression suite passed; GLSL vertex and
fragment shaders compiled/linked using offscreen GLES2 and all nine families
rendered nonempty, pixel-symmetric output at the sampled frame. Headless Chromium
could not create WebGL, but browser fallback, fullscreen, solo dungeon exit and
rolling passed. Actual browser GPU output, live Render performance, and full
multiplayer browser playtesting remain unverified. No PvP gameplay is included.

=== 5.2.0 SOUNDTRACK ===
Eight user-provided MP3 tracks are bundled unchanged in music/. The soundtrack player appears below the header, follows the world pane in fullscreen, and remains available when switching tabs. Start music with PLAY (or Start Exploring). Playlist, previous/next, shuffle, repeat, seek, mute, volume, and separate combat/reveal sound levels are available. Optional adaptive soundtrack switches to boss/dungeon tracks after a short delay and restores the exploration track; reveal cinematics duck the soundtrack rather than restarting it. Browser settings save separately under void-rng.music.v1. Existing game saves and database configuration are unchanged.
Deploy: replace files in the existing Render root folder, including music-player.js, music-tracks.json and all eight files under music/. Keep that folder structure. The server serves MP3s via byte-range streaming; no MP3 buffers are loaded at startup. For offline solo testing, open solo.html from the extracted directory with music/ beside it. No installation needed for offline solo; do not move solo.html out of the directory.
Audio rights: tracks are user-provided. Do not publish copyrighted tracks to public GitHub/Render unless you have appropriate rights or permission. For private local testing only until rights are verified. Browser playback may require a user click; some mobile browsers enforce their own volume controls.
