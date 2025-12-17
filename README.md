# Amalgamation-Apocolypse-Tower-Defence

Techno-Arcane Defense

A hybrid Tower Defense game blending Science Fiction technology with Fantasy Magic.

🎮 Core Gameplay

Currency: Players earn $\Psi$-Credits (Psi) by defeating enemies and clearing waves.

Lives: Players start with 100 Lives. Leaking enemies reduces lives; reaching 0 ends the game.

Wave System: Waves scale infinitely. Enemy count increases exponentially ($Wave^{1.4}$). After completing a map, players can enter Endless Mode for continued play with escalating difficulty.

Map System: 4 Selectable Campaigns with varying difficulty multipliers and wave limits:

- Sector Alpha (Normal, x1.0, 50 waves)
- The Canyon (Hard, x1.2, 75 waves)
- Void Spiral (Expert, x1.5, 100 waves)
- Zig-Zag Zone (Chaos, x1.8, 125 waves)

🏰 Towers (Constructs)

There are 10 unique towers. Each has 2 Upgrade Paths (Science/Tech vs. Arcane/Magic) with 5 Levels per path.

| Tower Name | Type | Damage Type | Description |
|------------|------|-------------|-------------|
| Data-Mine | Support | None | Passive income generator. Upgrades allow interest generation or kill-bounties. |
| Quantum Sentry | Offense | Physical | Rapid-fire kinetic damage. Upgrades to Railgun or Multi-shot magic bolts. |
| Flux Vent | Offense | Energy | Short-range AoE cone (Flamethrower style). Upgrades to Plasma or Cursed Fumes. |
| Chrono-Pylon | Support | None | Buffs nearby towers' attack speed. Upgrades to Global Buffs or Enemy Slow/Stun auras. |
| Aether Prism | Offense | Energy | Continuous beam laser. Upgrades to Global Orbital Cannon or Life-Stealing Void Ray. |
| Tesla Coil | Offense | Energy | Multi-target chain lightning. Upgrades to Infinite Chains or Stun Lightning. |
| Void Lance | Offense | Physical | Long-range sniper. Upgrades to Map-Nuke or Boss Slayer (Execute). |
| Fabricator | Trap | Physical | Places mines on the track. Upgrades to Nuclear Mines or Dimensional Rifts. |
| Gravity Mortar | Offense | Physical | Long-range splash damage. Upgrades to Black Holes or Meteor Swarms. |
| Nullifier | Offense | Hybrid | Strips immunities and debuffs enemies. Upgrades to True Damage or Black Hole effects. |

👾 Enemy Bestiary

Enemies have distinct shapes, colors, and behaviors.

| Enemy Class | Name | Shape | Resistance | Special Traits |
|-------------|------|-------|------------|---------------|
| Basic | Drone | Circle | None | Standard fodder. |
| Swarm | Nano-Swarm | Small Triangle | None | Very fast, low HP, spawns in groups. |
| Fast | Glitch-Runner | Arrow | None | High speed. |
| Tank | Heavy Mech | Square | Physical (25%) | High HP, slow speed. |
| Special | Diamond Construct | Solid Diamond | Physical (75%) | Highly resistant to Sentry, Lance, Mortar. |
| Special | Dark Matter Wisp | Dark Star | Energy (75%) | Highly resistant to Prism, Coil, Vent. |
| Special | Regenerator | Cross | None | Regenerates HP over time. |
| Special | Phase-Shifter | 4-Point Star | None | Teleports forward randomly. |
| Special | Flyer | Wrinkling | Wing | None | Flying: Ignores path, flies straight to exit. |
| Elite | Praetorian | Diamond | None | High stats elite unit. |
| Mini-Boss | Flux Centurion | 6-Point Star | Physical | Spawns every 5 waves. |
| Boss | Void Titan | Skull | None | Spawns every 10 waves. Massive HP. |
| Monarch | Omega Titan | Omega Symbol | All (20%) | Spawns every 20 waves. Extreme HP. |

⚙️ Mechanics & Controls

- Targeting Priority: Toggles per tower (First, Last, Closest, Farthest, Strongest, Flying).
- Game Speed: Toggle between 1x, 2x, and 4x speed.
- Auto-Start: Toggle to automatically start the next wave.
- DPS Tracking: Displays total damage dealt by selected towers.
- Drop-Down Shop: Collapsible build menu to save screen space.
- Hotkeys: 1-9 for towers, 0 for Nullifier, Q/E for upgrades, Z/X for abilities, Space for start wave.
- Upgrade System: Towers upgrade along two paths with visual indicators and cost discounts from buffs.

Active Abilities:
- Orbital Laser: High damage AoE (30s Cooldown).
- Time Freeze: Stops all enemies for 5 seconds (60s Cooldown).

🎨 Visuals & Audio

- Synthesized Audio: No external assets; sound effects (lasers, explosions, pings) are generated via Web Audio API.
- Particle Engine: Explosions, hit sparks, and death effects with physics/friction.
- Visual Effects: Persistent rendering for Lightning chains, Flame cones, and Laser beams.
- Dynamic Background: Animated grid and dual-path visuals (ground trench and flying spiral).
- Tower Aesthetics: Detailed shapes, glows, and tech/magic overlays based on upgrades.
