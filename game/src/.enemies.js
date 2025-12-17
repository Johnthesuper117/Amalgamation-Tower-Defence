export const ENEMIES = {
    basic: { hp: 20, speed: 2, color: "#a8b5c2", reward: 5, damage: 1, radius: 8, name: "Drone", shape: "circle", resistance: "none" },
    swarm: { hp: 5, speed: 5, color: "#ff00ff", reward: 2, damage: 1, radius: 5, name: "Nano-Swarm", shape: "triangle_small", resistance: "none" },
    fast: { hp: 15, speed: 3.5, color: "#00f3ff", reward: 8, damage: 2, radius: 7, name: "Glitch-Runner", shape: "arrow", resistance: "none" },
    tank: { hp: 120, speed: 1, color: "#6e7681", reward: 25, damage: 5, radius: 14, name: "Heavy Mech", shape: "square", resistance: "physical" }, 
    diamond: { hp: 500, speed: 1.2, color: "#00ffff", reward: 80, damage: 10, radius: 14, name: "Diamond Construct", shape: "diamond_solid", resistance: "physical" },
    dark_matter: { hp: 400, speed: 3.0, color: "#111111", reward: 100, damage: 15, radius: 12, name: "Dark Matter Wisp", shape: "star_dark", resistance: "energy" },
    elite: { hp: 600, speed: 1.5, color: "#DC143C", reward: 75, damage: 20, radius: 12, name: "Praetorian", shape: "diamond", resistance: "none" },
    regen: { hp: 200, speed: 1.8, color: "#32CD32", reward: 35, damage: 5, radius: 10, name: "Regenerator", shape: "cross", resistance: "none" },
    phase: { hp: 100, speed: 2.5, color: "#8A2BE2", reward: 45, damage: 5, radius: 9, name: "Phase-Shifter", shape: "star_4", resistance: "none" },
    centurion: { hp: 1000, speed: 1.2, color: "#FF8C00", reward: 150, damage: 25, radius: 18, name: "Flux Centurion", shape: "star_6", resistance: "physical" }, 
    boss: { hp: 3000, speed: 0.6, color: "#bd00ff", reward: 500, damage: 50, radius: 25, name: "Void Titan", shape: "skull", resistance: "none" }, 
    titan_mk2: { hp: 10000, speed: 0.4, color: "#fff", reward: 2000, damage: 100, radius: 35, name: "Omega Titan", shape: "omega", resistance: "all" },
    flyer: { hp: 80, speed: 3.0, color: "#FF4500", reward: 25, damage: 3, radius: 9, name: "Wrinkling", shape: "wing", resistance: "none", fly: true },
    shield: { hp: 140, speed: 1.5, color: "#C0C0C0", reward: 35, damage: 4, radius: 15, name: "Shielded Mech", shape: "square", resistance: "energy" }
};

export class Enemy {
constructor(typeKey) {
    let type = ENEMIES[typeKey];
    if (!type) { console.warn("Invalid enemy type detected: " + typeKey + ". Defaulting to 'basic'."); type = ENEMIES['basic']; }
    let diffMod = MAPS[gameState.mapIndex].difficultyMod;
    if (gameState.wave > 20) { diffMod += (gameState.wave - 20) * 0.1 * diffMod; }
    this.hp = Math.floor(type.hp * diffMod); this.maxHp = this.hp; this.speed = type.speed; this.damage = type.damage || 1;
    this.color = type.color; this.reward = type.reward; this.radius = type.radius;
    this.name = type.name; this.shape = type.shape; this.resistance = type.resistance; this.fly = type.fly || false;
    
    if (this.fly) {
        this.start = pathPoints[0]; this.end = pathPoints[pathPoints.length-1];
        this.x = this.start.x; this.y = this.start.y; this.totalDist = Math.hypot(this.end.x - this.start.x, this.end.y - this.start.y); this.currentDist = 0;
    } else {
        this.pathIndex = 0; this.x = pathPoints[0].x; this.y = pathPoints[0].y;
    }
    this.distanceTravelled = 0; this.slowTimer = 0; this.stunTimer = 0; this.dotTimer = 0; this.regenTimer = 0;
}
update() {
    if (gameState.freezeTimer > 0) return; 
    let currentSpeed = this.speed;
    if (this.stunTimer > 0) { currentSpeed = 0; this.stunTimer--; }
    else if (this.slowTimer > 0) { currentSpeed = this.speed * 0.5; this.slowTimer--; }
    if (this.dotTimer > 0) { if (this.dotTimer % 60 === 0) this.takeDamage(5); this.dotTimer--; }
    if (this.name === "Regenerator") { this.regenTimer++; if (this.regenTimer > 60) { if (this.hp < this.maxHp) this.hp += 10; this.regenTimer = 0; } }
    if (this.name === "Phase-Shifter" && Math.random() < 0.005) { this.x += (Math.random() - 0.5) * 40; this.y += (Math.random() - 0.5) * 40; particles.push(new Particle(this.x, this.y, this.color, 4, 15)); }
    if (currentSpeed <= 0) return;

    if (this.fly) {
        this.currentDist += currentSpeed;
        let progress = this.currentDist / this.totalDist;
        if (progress >= 1) { this.reachEnd(); return; }
        this.x = this.start.x + (this.end.x - this.start.x) * progress;
        this.y = this.start.y + (this.end.y - this.start.y) * progress;
        this.distanceTravelled = this.currentDist;
    } else {
        const target = pathPoints[this.pathIndex + 1]; if (!target) return;
        const dx = target.x - this.x; const dy = target.y - this.y; const dist = Math.hypot(dx, dy);
        if (dist <= currentSpeed) { this.x = target.x; this.y = target.y; this.pathIndex++; if (this.pathIndex >= pathPoints.length - 1) this.reachEnd(); }
        else { this.x += (dx / dist) * currentSpeed; this.y += (dy / dist) * currentSpeed; }
        this.distanceTravelled += currentSpeed;
    }
}
takeDamage(amount, sourceTower) {
    let actualDamage = amount;
    if (sourceTower && sourceTower.type !== 'none' && sourceTower.type !== 'hybrid') {
        if (this.resistance === 'all') actualDamage *= 0.8;
        if (this.resistance === 'physical' && sourceTower.type === 'physical') { actualDamage *= 0.25; particles.push(new Particle(this.x, this.y, '#888', 2, 10)); }
        if (this.resistance === 'energy' && sourceTower.type === 'energy') { actualDamage *= 0.25; particles.push(new Particle(this.x, this.y, '#000', 2, 10)); }
    }
    if (sourceTower) sourceTower.totalDamage += actualDamage; 
    this.hp -= actualDamage;
    if (Math.random() < 0.3) particles.push(new Particle(this.x, this.y, this.color, 2, 10));
    if (this.hp <= 0) this.die(sourceTower);
}
die(sourceTower) {
    let reward = this.reward;
    if (sourceTower && sourceTower.type === 'mortar' && sourceTower.path === 2 && sourceTower.level >= 2) reward = Math.floor(reward * 1.5);
    if (sourceTower && sourceTower.type === 'miner' && sourceTower.path === 2 && sourceTower.level >= 5) reward += 5;
    towers.forEach(t => { if(t.type === 'miner' && t.path === 2 && t.level >= 1) { if (Math.hypot(t.x - this.x, t.y - this.y) < 150) reward += 1; } });
    if (sourceTower && sourceTower.type === 'lance' && sourceTower.path === 2 && sourceTower.level >= 2) { if (Math.random() < 0.1) gameState.lives++; }
    if (sourceTower && sourceTower.type === 'prism' && sourceTower.path === 2 && sourceTower.level >= 4) { if (Math.random() < 0.05) gameState.lives++; }
    gameState.money += reward;
    for(let i=0; i<5; i++) particles.push(new Particle(this.x, this.y, this.color, 4, 30)); 
    const idx = enemies.indexOf(this); if (idx > -1) enemies.splice(idx, 1);
    Sound.play('explosion');
}
reachEnd() {
    // UPDATED: Use the specific damage value of the enemy type, default to 1 if missing
    const dmg = this.damage || 1; 
    gameState.lives -= dmg;
    
    // Visual feedback for losing lives
    document.getElementById('lives-display').style.color = 'red';
    setTimeout(() => document.getElementById('lives-display').style.color = '#fff', 200);

    const idx = enemies.indexOf(this); 
    if (idx > -1) enemies.splice(idx, 1);
    
    if (gameState.lives <= 0 && !gameState.gameOver) endGame();
}
// Inside class Enemy
draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // Health Bar (Cleaner)
    const hpPct = this.hp / this.maxHp;
    ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
    ctx.fillRect(-10, -20, 20, 4);
    ctx.fillStyle = "#0f0";
    ctx.fillRect(-10, -20, 20 * hpPct, 4);

    // Dynamic Wobble for Hover effect
    const hover = Math.sin(gameState.frames * 0.1) * 2;
    ctx.translate(0, hover);

    // Glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;

    // Detailed Shapes
    ctx.beginPath();
    if (this.shape === 'circle') {
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2); ctx.fill();
        // "Eye"
        ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(0, 0, this.radius/2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "red"; ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI*2); ctx.fill();
    } 
    else if (this.shape === 'square') {
        ctx.fillRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
        // "Armor Plates"
        ctx.strokeStyle = "#000"; ctx.lineWidth = 2; ctx.strokeRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
        ctx.beginPath(); ctx.moveTo(-this.radius, -this.radius); ctx.lineTo(this.radius, this.radius); ctx.stroke();
    }
    else if (this.shape === 'diamond' || this.shape === 'diamond_solid') {
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
        ctx.fillStyle = "#fff"; ctx.fillRect(-3,-3,6,6); // Core
    }
    else {
        // Fallback / other shapes
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2); ctx.fill();
    }
    
    // Frost/Stun Indicators
    if (this.slowTimer > 0) {
        ctx.strokeStyle = "#00ffff"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0,0, this.radius + 4, 0, Math.PI*2); ctx.stroke();
    }
    
    ctx.restore();
}
};

