import { TOWER_TYPES, Tower } from './towers.js';
import { ENEMIES, Enemy } from './enemies.js';
import { Projectile } from './projectiles.js';
import { MAPS } from './maps.js';
import { Sound } from './sound.js';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const GRID_SIZE = 40;

const C_PATH = "#262c36";
const C_PATH_BORDER = "#30363d";
const C_RANGE = "rgba(255, 255, 255, 0.1)";
const C_RANGE_BORDER = "rgba(255, 255, 255, 0.3)";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameState = {
money: 300, lives: 100, wave: 1, isPlaying: false, gameOver: false, frames: 0, gameSpeed: 1, autoStart: false,
mapIndex: 0, freezeTimer: 0,
endless: false, 
abilities: { laser: { cd: 0, maxCd: 1800 }, freeze: { cd: 0, maxCd: 3600 } },
activeAbility: null,
unlockedMaps: parseInt(localStorage.getItem('tad_unlocked')) || 1
};

let towers = [];
let enemies = [];
let projectiles = [];
let particles = [];
let mines = [];
let visualEffects = []; 
let buildMode = null; 
let selectedTower = null; 
let mousePos = { x: 0, y: 0 }; 
let pathPoints = []; 

function updateMousePos(e) {
const rect = canvas.getBoundingClientRect();
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;
mousePos.x = (e.clientX - rect.left) * scaleX;
mousePos.y = (e.clientY - rect.top) * scaleY;
}

canvas.addEventListener('mousemove', updateMousePos);

// --- Hotkeys ---
document.addEventListener('keydown', (e) => {
if (gameState.gameOver || pathPoints.length === 0) return;

const key = e.key.toLowerCase();

// Tower Selection (1-9, 0)
const keyMap = {
    '1': 'miner', '2': 'sentry', '3': 'vent', '4': 'pylon', '5': 'prism',
    '6': 'coil', '7': 'lance', '8': 'fabricator', '9': 'mortar', '0': 'nullifier'
};

if (keyMap[key]) {
    selectTowerToBuild(keyMap[key]);
}

// Upgrades (Q, E)
if (selectedTower) {
    if (key === 'q') buyUpgrade(1);
    if (key === 'e') buyUpgrade(2);
}

// Abilities (Z, X)
if (key === 'z') activateAbility('laser');
if (key === 'x') activateAbility('freeze');

// Start Wave (Space)
if (e.code === 'Space' && !gameState.isPlaying && !gameState.activeAbility && !buildMode) {
    startNextWave();
}
});

// --- Global Functions ---

function toggleSpeed() {
if (gameState.gameSpeed === 1) gameState.gameSpeed = 2;
else if (gameState.gameSpeed === 2) gameState.gameSpeed = 4;
else gameState.gameSpeed = 1;
document.getElementById('speed-btn').innerText = gameState.gameSpeed + "x";
}

function toggleAutoStart() {
gameState.autoStart = !gameState.autoStart;
const btn = document.getElementById('auto-btn');
btn.innerText = "Auto: " + (gameState.autoStart ? "ON" : "OFF");
btn.classList.toggle('auto-on');
}

function selectTowerToBuild(type, el) {
document.querySelectorAll('.tower-card').forEach(c => c.classList.remove('selected'));

if (buildMode === type) { 
    buildMode = null; 
    canvas.style.cursor = 'default'; 
} else { 
    buildMode = type; 
    // Logic to highlight the card if selected via hotkey
    if (!el) {
        const cardId = 'card-' + type;
        const card = document.getElementById(cardId);
        if (card) card.classList.add('selected');
    } else {
        el.classList.add('selected'); 
    }
    
    canvas.style.cursor = 'crosshair'; 
    selectedTower = null; 
    updateUpgradeMenu(); 
}

if (gameState.activeAbility) {
    gameState.activeAbility = null;
    canvas.style.cursor = 'default';
}
}

function activateAbility(type) {
if (gameState.abilities[type].cd > 0) return;

if (type === 'laser') {
    gameState.activeAbility = 'laser';
    canvas.style.cursor = 'crosshair';
    buildMode = null; 
    document.querySelectorAll('.tower-card').forEach(c => c.classList.remove('selected'));
} else if (type === 'freeze') {
    gameState.freezeTimer = 300; 
    gameState.abilities.freeze.cd = gameState.abilities.freeze.maxCd;
    Sound.play('freeze');
    visualEffects.push(new VisualEffect('explosion', CANVAS_WIDTH/2, CANVAS_HEIGHT/2, { radius: 1000, color: '#00ffff', life: 30 }));
}
}

function useActiveAbility(x, y) {
if (gameState.activeAbility === 'laser') {
    visualEffects.push(new VisualEffect('laser_orbit', x, y, { life: 30 }));
    Sound.play('explosion');
    enemies.forEach(e => {
        if (Math.hypot(e.x - x, e.y - y) < 60) {
            e.takeDamage(e.maxHp * 0.1, null);
        }
    });
    gameState.abilities.laser.cd = gameState.abilities.laser.maxCd;
    gameState.activeAbility = null;
    canvas.style.cursor = 'default';
}
}

function cyclePriority() {
if (!selectedTower) return;
const p = selectedTower.priority;
if (p === 'first') selectedTower.priority = 'last';
else if (p === 'last') selectedTower.priority = 'closest';
else if (p === 'closest') selectedTower.priority = 'farthest';
else if (p === 'farthest') selectedTower.priority = 'strongest';
else if (p === 'strongest') selectedTower.priority = 'flying';
else selectedTower.priority = 'first';
const btn = document.getElementById('priority-btn');
btn.innerText = "Target: " + selectedTower.priority.charAt(0).toUpperCase() + selectedTower.priority.slice(1);
}

function refreshShopAffordability() {
for(const key in TOWER_TYPES) {
    const t = TOWER_TYPES[key];
    const card = document.getElementById('card-' + key);
    if (card) {
        if (gameState.money < t.cost) card.classList.add('too-expensive'); else card.classList.remove('too-expensive');
    }
}
}

function updateUI() {
    document.getElementById('money-display').innerText = gameState.money;
    document.getElementById('lives-display').innerText = gameState.lives;
    
    const waveText = document.getElementById('wave-display');
    waveText.innerText = gameState.wave;
    if (gameState.endless) waveText.classList.add('endless');
    else waveText.classList.remove('endless');

    // Ability CDs
    const laserPct = Math.min(100, (gameState.abilities.laser.cd / gameState.abilities.laser.maxCd) * 100);
    document.getElementById('cd-laser').style.height = laserPct + "%";

    const freezePct = Math.min(100, (gameState.abilities.freeze.cd / gameState.abilities.freeze.maxCd) * 100);
    document.getElementById('cd-freeze').style.height = freezePct + "%";

    refreshShopAffordability();

    // UPDATED: Check upgrade menu buttons every frame
    if (selectedTower) {
        const info = TOWER_TYPES[selectedTower.type];
        const discountMult = selectedTower.buffCostMultiplier || 1.0;
        
        // Check Path 1 Button
        const p1Btn = document.getElementById('btn-upgrade-1');
        if (selectedTower.path === 0 || selectedTower.path === 1) {
             // Safety check for max level
             if (selectedTower.level < 5) {
                const upg = info.upgrades.path1[selectedTower.level];
                const cost = Math.floor(upg.cost * discountMult);
                p1Btn.disabled = (gameState.money < cost); // Auto-disable if too expensive
             }
        }
        
        // Check Path 2 Button
        const p2Btn = document.getElementById('btn-upgrade-2');
        if (selectedTower.path === 0 || selectedTower.path === 2) {
             if (selectedTower.level < 5) {
                const upg = info.upgrades.path2[selectedTower.level];
                const cost = Math.floor(upg.cost * discountMult);
                p2Btn.disabled = (gameState.money < cost); // Auto-disable if too expensive
             }
        }
    }
}

function updateUpgradeMenu() {
    const menu = document.getElementById('upgrade-modal');
    
    // 1. Basic Hide/Show Logic
    if (!selectedTower) { 
        menu.style.display = "none"; 
        return; 
    }
    
    // IMPORTANT: We must display it first so the browser can calculate its width/height
    menu.style.display = "flex";

    // --- Content Update Logic (Same as before) ---
    document.getElementById('selected-tower-name').innerText = selectedTower.name;
    document.getElementById('dps-display').innerText = "Total Dmg: " + Math.floor(selectedTower.totalDamage);
    
    const info = TOWER_TYPES[selectedTower.type];
    let sellCost = info.cost * 0.7;
    document.getElementById('sell-value').innerText = Math.floor(sellCost);

    const btn = document.getElementById('priority-btn');
    if (['miner','pylon','fabricator','vent'].includes(selectedTower.type)) btn.style.display = 'none'; 
    else {
        btn.style.display = 'inline-block';
        btn.innerText = "Target: " + selectedTower.priority.charAt(0).toUpperCase() + selectedTower.priority.slice(1);
    }

    const nextLvl = selectedTower.level + 1;
    const p1Btn = document.getElementById('btn-upgrade-1');
    const p2Btn = document.getElementById('btn-upgrade-2');

    p1Btn.disabled = true; p2Btn.disabled = true;
    document.getElementById('path-1-desc').innerText = "Maxed"; document.getElementById('cost-1').innerText = "-";
    document.getElementById('path-2-desc').innerText = "Maxed"; document.getElementById('cost-2').innerText = "-";

    const discountMult = selectedTower.buffCostMultiplier || 1.0;

    // Check Path 1
    if ((selectedTower.path === 0 || selectedTower.path === 1) && selectedTower.level < 5) {
        const upg = info.upgrades.path1[selectedTower.level];
        const cost = Math.floor(upg.cost * discountMult);
        document.getElementById('path-1-desc').innerText = upg.name + ": " + upg.desc;
        document.getElementById('cost-1').innerText = cost;
        // Auto-disable if too expensive
        if (gameState.money >= cost) p1Btn.disabled = false;
    } else if (selectedTower.path === 2) {
        document.getElementById('path-1-desc').innerText = "Path Locked";
    }

    // Check Path 2
    if ((selectedTower.path === 0 || selectedTower.path === 2) && selectedTower.level < 5) {
        const upg = info.upgrades.path2[selectedTower.level];
        const cost = Math.floor(upg.cost * discountMult);
        document.getElementById('path-2-desc').innerText = upg.name + ": " + upg.desc;
        document.getElementById('cost-2').innerText = cost;
        // Auto-disable if too expensive
        if (gameState.money >= cost) p2Btn.disabled = false;
    } else if (selectedTower.path === 1) {
        document.getElementById('path-2-desc').innerText = "Path Locked";
    }

    // --- NEW: Dynamic Positioning Logic ---
    
    const towerX = selectedTower.x;
    const towerY = selectedTower.y;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    
    // Vertical Spacing (Tower Radius + Buffer)
    const spacing = 40; 
    
    // 1. Calculate Horizontal Position (Center it)
    let left = towerX - (menuWidth / 2);
    
    // Clamp to edges (Don't let it go off screen left or right)
    // padding of 10px from edge
    if (left < 10) left = 10;
    if (left + menuWidth > CANVAS_WIDTH - 10) left = CANVAS_WIDTH - menuWidth - 10;

    // 2. Calculate Vertical Position
    // Default: Place UNDER the tower
    let top = towerY + spacing;

    // Check if it hits the bottom of the screen
    if (top + menuHeight > CANVAS_HEIGHT - 10) {
        // FLIP IT: Place ABOVE the tower
        top = towerY - spacing - menuHeight;
    }

    // Apply coordinates
    menu.style.left = left + "px";
    menu.style.top = top + "px";
}

function buyUpgrade(pathIdx) {
if (!selectedTower) return;
const info = TOWER_TYPES[selectedTower.type];
const upgradeList = pathIdx === 1 ? info.upgrades.path1 : info.upgrades.path2;
const upgrade = upgradeList[selectedTower.level]; 
const discountMult = selectedTower.buffCostMultiplier || 1.0;
const finalCost = Math.floor(upgrade.cost * discountMult);

if (gameState.money >= finalCost) {
    gameState.money -= finalCost;
    selectedTower.path = pathIdx;
    selectedTower.level++;
    if (selectedTower.type === 'sentry' && pathIdx === 1) selectedTower.cooldownMax *= 0.8;
    if (selectedTower.type === 'sentry' && pathIdx === 2) selectedTower.damage += 10;
    updateUI(); updateUpgradeMenu();
}
}

function sellSelectedTower() {
if (!selectedTower) return;
gameState.money += Math.floor(TOWER_TYPES[selectedTower.type].cost * 0.7); 
const idx = towers.indexOf(selectedTower);
if (idx > -1) towers.splice(idx, 1);
selectedTower = null; updateUI(); updateUpgradeMenu();
}

function closeUpgradeMenu() { selectedTower = null; updateUpgradeMenu(); }
function endGame() { gameState.gameOver = true; document.getElementById('game-over').style.display = "flex"; }

function selectMap(index) {
if (index >= gameState.unlockedMaps) return; 
Sound.init(); 
gameState.mapIndex = index;
pathPoints = MAPS[index].points;
document.getElementById('map-screen').style.display = 'none';

gameState.money = 300;
gameState.lives = 100;
gameState.wave = 1;
gameState.isPlaying = false;
gameState.gameOver = false;
gameState.endless = false;
towers = []; enemies = []; projectiles = []; particles = []; mines = []; visualEffects = [];
updateUI();
}

function renderMapSelection() {
const container = document.getElementById('map-grid-container');
container.innerHTML = '';
MAPS.forEach((map, idx) => {
    const isLocked = idx >= gameState.unlockedMaps;
    const card = document.createElement('div');
    card.className = 'map-card' + (isLocked ? ' locked' : '');
    card.onclick = () => selectMap(idx);
    
    let html = `<div class="map-name">${map.name}</div>
                <div class="map-diff">${map.diffName} (Limit: ${map.waveLimit})</div>`;
    
    if (isLocked) {
        html += `<div class="lock-icon">🔒</div>`;
    } else {
        html += `<div class="map-preview" style="${map.previewStyle}"></div>`;
    }
    card.innerHTML = html;
    container.appendChild(card);
});
}

function completeLevel() {
document.getElementById('level-complete').style.display = 'flex';
if (gameState.mapIndex + 1 >= gameState.unlockedMaps && gameState.mapIndex + 1 < MAPS.length) {
    gameState.unlockedMaps = gameState.mapIndex + 2; 
    localStorage.setItem('tad_unlocked', gameState.unlockedMaps);
}
}

function returnToMenu() {
document.getElementById('level-complete').style.display = 'none';
document.getElementById('map-screen').style.display = 'flex';
renderMapSelection();
}

function continueEndless() {
document.getElementById('level-complete').style.display = 'none';
gameState.endless = true;
startNextWave();
}

canvas.addEventListener('mousemove', (e) => {
const rect = canvas.getBoundingClientRect(); mousePos.x = e.clientX - rect.left; mousePos.y = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', (e) => {
if (gameState.gameOver) return;
const rect = canvas.getBoundingClientRect();
const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top;

if (gameState.activeAbility) {
    useActiveAbility(mouseX, mouseY);
    return;
}

if (buildMode) {
    const typeInfo = TOWER_TYPES[buildMode];
    if (gameState.money >= typeInfo.cost) {
        if (!isNearPath(mouseX, mouseY) && !isNearTower(mouseX, mouseY)) {
            gameState.money -= typeInfo.cost;
            towers.push(new Tower(mouseX, mouseY, buildMode));
            particles.push(new Particle(mouseX, mouseY, "#fff", 10, 20));
            buildMode = null;
            document.querySelectorAll('.tower-card').forEach(c => c.classList.remove('selected'));
            canvas.style.cursor = 'default';
            updateUI(); refreshShopAffordability();
        }
    }
} else {
    selectedTower = null;
    for (const t of towers) { if (Math.hypot(t.x - mouseX, t.y - mouseY) < 20) { selectedTower = t; break; } }
    updateUpgradeMenu();
}
});

function isNearPath(x, y) {
for(let i=0; i<pathPoints.length-1; i++) {
    const p1 = pathPoints[i]; const p2 = pathPoints[i+1];
    const A = x - p1.x; const B = y - p1.y; const C = p2.x - p1.x; const D = p2.y - p1.y;
    const dot = A * C + B * D; const lenSq = C * C + D * D;
    let param = -1; if (lenSq != 0) param = dot / lenSq;
    let xx, yy;
    if (param < 0) { xx = p1.x; yy = p1.y; } else if (param > 1) { xx = p2.x; yy = p2.y; } else { xx = p1.x + param * C; yy = p1.y + param * D; }
    const dx = x - xx; const dy = y - yy;
    if (Math.hypot(dx, dy) < 30) return true; 
}
return false;
}

function isNearTower(x, y) {
for(const t of towers) { if(Math.hypot(t.x - x, t.y - y) < 40) return true; }
return false;
}

// --- Wave Logic ---
let enemiesToSpawn = [];
let spawnTimer = 0;
let waveInProgress = false;

function startNextWave() {
if (waveInProgress) return;
waveInProgress = true;
document.getElementById('start-wave-btn').disabled = true;
document.getElementById('start-wave-btn').style.opacity = 0.5;

const w = gameState.wave;
const count = Math.floor(5 + Math.pow(w, 1.4)); 
enemiesToSpawn = [];

let bossType = null;
if (w % 20 === 0) bossType = 'titan_mk2';
else if (w % 10 === 0) bossType = 'boss';
else if (w % 5 === 0) bossType = 'centurion';

for(let i=0; i<count; i++) {
    if (bossType && i === count - 1) { enemiesToSpawn.push(bossType); continue; }
    
    const rand = Math.random();
    let type = 'basic';
    
    if (w < 3) type = 'basic';
    else if (w < 10) {
        if (rand < 0.2) type = 'fast'; else if (rand < 0.25) type = 'swarm'; else type = 'basic';
    } else if (w < 20) {
        if (rand < 0.05) type = 'tank'; else if (rand < 0.1) type = 'regen'; else if (rand < 0.3) type = 'fast'; else type = 'basic';
    } else if (w < 40) {
        if (rand < 0.1) type = 'phase'; else if (rand < 0.2) type = 'shield'; else if (rand < 0.5) type = 'swarm'; else type = 'fast';
    } else {
        if (rand < 0.05) type = 'elite'; else if (rand < 0.1) type = 'diamond'; else if (rand < 0.15) type = 'dark_matter'; else if (rand < 0.3) type = 'shield'; else type = 'swarm'; 
    }
    
    if (w > 5 && Math.random() < 0.1) type = 'flyer';

    enemiesToSpawn.push(type);
}
}

function updateGameLogic() {
if (gameState.abilities.laser.cd > 0) gameState.abilities.laser.cd--;
if (gameState.abilities.freeze.cd > 0) gameState.abilities.freeze.cd--;
if (gameState.freezeTimer > 0) gameState.freezeTimer--;

if (waveInProgress) {
    spawnTimer++;
    let spawnRate = Math.max(10, 60 - (gameState.wave * 1.5));
    if (spawnTimer > spawnRate) { 
        if (enemiesToSpawn.length > 0) { enemies.push(new Enemy(enemiesToSpawn.shift())); spawnTimer = 0; }
        else if (enemies.length === 0) {
            waveInProgress = false;
            
            if (!gameState.endless && gameState.wave >= MAPS[gameState.mapIndex].waveLimit) {
                completeLevel();
                return;
            }

            const waveBonus = 100 + (gameState.wave * 10);
            gameState.money += waveBonus;
            towers.forEach(t => t.onWaveEnd());
            gameState.wave++;
            
            if (gameState.autoStart) {
                setTimeout(() => startNextWave(), 1000);
            } else {
                document.getElementById('start-wave-btn').disabled = false;
                document.getElementById('start-wave-btn').style.opacity = 1;
            }
            updateUI();
        }
    }
}
towers.forEach(t => { t.update(); t.act(); });
enemies.forEach(e => e.update());
projectiles.forEach(p => p.update());
particles.forEach(p => p.update());
for(let i=visualEffects.length-1; i>=0; i--) {
    visualEffects[i].update();
    if(visualEffects[i].life <= 0) visualEffects.splice(i, 1);
}
for (let i = mines.length - 1; i >= 0; i--) {
    let m = mines[i];
    m.life--;
    let hit = false;
    for (let e of enemies) {
        if (Math.hypot(e.x - m.x, e.y - m.y) < m.radius) {
            hit = true;
            e.takeDamage(m.damage, m.source);
            if (m.type === 'rune') e.slowTimer = 30;
            visualEffects.push(new VisualEffect('explosion', m.x, m.y, { radius: 15, color: m.type==='tech'?'#f00':'#0ff', life: 10 }));
            break; 
        }
    }
    if (hit || m.life <= 0) mines.splice(i, 1);
}
projectiles = projectiles.filter(p => p.active);
particles = particles.filter(p => p.life > 0);
}

function drawGame() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Vibrant Background
    ctx.fillStyle = "#050510"; 
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Moving Grid Background
    ctx.strokeStyle = "rgba(0, 243, 255, 0.05)";
    ctx.lineWidth = 1;
    const gridSize = 40;
    const offset = (gameState.frames * 0.5) % gridSize;
    ctx.beginPath();
    for(let x=0; x<=CANVAS_WIDTH; x+=gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); }
    for(let y=offset; y<=CANVAS_HEIGHT; y+=gridSize) { ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); }
    ctx.stroke();

    // 2. NORMAL PATH (Ground Units) - The Trench
    if (pathPoints.length > 0) {
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        
        // Outer Glow
        ctx.lineWidth = 20; ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; 
        ctx.beginPath();
        ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
        for(let i=1; i<pathPoints.length; i++) ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
        ctx.stroke();

        // Inner Line
        ctx.lineWidth = 4; ctx.strokeStyle = "#333";
        ctx.stroke();
        
        // Dashed Center
        ctx.lineWidth = 2; ctx.strokeStyle = "rgba(0, 243, 255, 0.2)";
        ctx.setLineDash([10, 20]); ctx.stroke(); ctx.setLineDash([]);
    }

    // 3. WORMHOLE PATH (Flying Units Only) - The Spiral
    // Only draw if there are flyers or strictly for visual effect
    if (pathPoints.length > 0) {
        const start = pathPoints[0];
        const end = pathPoints[pathPoints.length - 1];
        
        // Flyers go straight start -> end
        const dist = Math.hypot(end.x - start.x, end.y - start.y);
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const steps = Math.floor(dist / 4); 
        const time = gameState.frames * 0.15; // Animation speed
        const width = 12; // Spiral width

        // Draw this ONLY if we want the "Flyer visual" always visible, 
        // OR wrap in "if (enemies.some(e => e.fly))" if you only want it when flyers appear.
        // For now, I'll make it faint always, and bright when flyers exist.
        const hasFlyers = enemies.some(e => e.fly);
        const opacity = hasFlyers ? 1.0 : 0.15;

        for(let s=0; s<steps; s++) {
            let t = s/steps;
            let tNext = (s+1)/steps;

            // Coordinates on the straight line
            let bx = start.x + (end.x - start.x) * t;
            let by = start.y + (end.y - start.y) * t;
            let bxNext = start.x + (end.x - start.x) * tNext;
            let byNext = start.y + (end.y - start.y) * tNext;

            let spiralPhase = (t * 25) - time;
            let nextPhase = (tNext * 25) - time;

            // Wire 1 (Green)
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
            ctx.lineWidth = 2;
            let ox1 = Math.cos(angle + Math.PI/2) * Math.sin(spiralPhase) * width;
            let oy1 = Math.sin(angle + Math.PI/2) * Math.sin(spiralPhase) * width;
            let ox1n = Math.cos(angle + Math.PI/2) * Math.sin(nextPhase) * width;
            let oy1n = Math.sin(angle + Math.PI/2) * Math.sin(nextPhase) * width;
            ctx.moveTo(bx + ox1, by + oy1);
            ctx.lineTo(bxNext + ox1n, byNext + oy1n);
            ctx.stroke();

            // Wire 2 (Purple)
            ctx.beginPath();
            ctx.strokeStyle = `rgba(189, 0, 255, ${opacity})`;
            let ox2 = Math.cos(angle + Math.PI/2) * Math.sin(spiralPhase + Math.PI) * width;
            let oy2 = Math.sin(angle + Math.PI/2) * Math.sin(spiralPhase + Math.PI) * width;
            let ox2n = Math.cos(angle + Math.PI/2) * Math.sin(nextPhase + Math.PI) * width;
            let oy2n = Math.sin(angle + Math.PI/2) * Math.sin(nextPhase + Math.PI) * width;
            ctx.moveTo(bx + ox2, by + oy2);
            ctx.lineTo(bxNext + ox2n, byNext + oy2n);
            ctx.stroke();
        }
    }

    // 4. Render Entities
    mines.forEach(m => {
        ctx.fillStyle = (m.type === 'tech') ? '#ff4444' : '#00ffff';
        ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1;
        let pulse = (gameState.frames % 20) / 20 * 10;
        ctx.beginPath(); ctx.arc(m.x, m.y, 5 + pulse, 0, Math.PI*2); ctx.stroke();
        ctx.shadowBlur = 0;
    });

    towers.forEach(t => t.draw());
    enemies.forEach(e => e.draw());
    projectiles.forEach(p => p.draw());
    particles.forEach(p => p.draw(ctx));
    visualEffects.forEach(v => v.draw(ctx));

    // Time Stop Overlay
    if (gameState.freezeTimer > 0) {
        ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // Build Mode
    if (buildMode || gameState.activeAbility === 'laser') {
        ctx.save(); ctx.translate(mousePos.x, mousePos.y);
        
        if (gameState.activeAbility === 'laser') {
            ctx.beginPath(); ctx.arc(0,0,60,0,Math.PI*2);
            ctx.fillStyle = "rgba(255, 50, 50, 0.3)"; ctx.strokeStyle = "red";
            ctx.fill(); ctx.stroke();
        } else {
            const type = TOWER_TYPES[buildMode];
            const canAfford = gameState.money >= type.cost;
            let range = type.range;
            
            ctx.beginPath(); ctx.arc(0, 0, range, 0, Math.PI * 2);
            ctx.fillStyle = canAfford ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 0, 0, 0.2)";
            ctx.strokeStyle = canAfford ? "#fff" : "#f00";
            ctx.fill(); ctx.stroke();
            
            ctx.globalAlpha = 0.5; ctx.fillStyle = type.color;
            ctx.beginPath(); ctx.arc(0,0, 10, 0, Math.PI*2); ctx.fill();
        }
        ctx.restore();
    }
}

function gameLoop() {
if (gameState.gameOver) return;
if (pathPoints.length > 0) {
    for(let i=0; i<gameState.gameSpeed; i++) updateGameLogic();
    updateUI(); drawGame();
}
gameState.frames++;
requestAnimationFrame(gameLoop);
}

function init() {
renderMapSelection();
gameLoop();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
init();
} else {
window.addEventListener('load', init);
}