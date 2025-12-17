export const TOWER_TYPES = {
miner: { name: "Data-Mine", cost: 150, range: 0, damage: 0, cooldown: 0, color: "#4CAF50", shape: "square", type: "none", desc: "Generates Ψ 15 per wave.", upgrades: { path1: [{ name: "Overclock", cost: 100, desc: "+10 Cash" }, { name: "Crypto Farm", cost: 300, desc: "+25 Cash" }, { name: "Blockchain AI", cost: 800, desc: "+10% Interest" }, { name: "Server Farm", cost: 2000, desc: "+150 Cash" }, { name: "Quantum Market", cost: 5000, desc: "+20% Interest" }], path2: [{ name: "Alchemy", cost: 150, desc: "Kill Cash +1" }, { name: "Transmute", cost: 400, desc: "+40 Cash" }, { name: "Philosopher Stone", cost: 1000, desc: "+100 Cash" }, { name: "Golden Age", cost: 2500, desc: "Base Gen x2" }, { name: "Midas Curse", cost: 6000, desc: "Kill Cash +5" }] } },
sentry: { name: "Quantum Sentry", cost: 250, range: 120, damage: 10, cooldown: 30, color: "#00a8f3", shape: "square", projectileSpeed: 8, type: "physical", desc: "Rapid fire kinetic.", upgrades: { path1: [{ name: "Accelerator", cost: 150, desc: "Faster Fire" }, { name: "Pierce", cost: 400, desc: "Hits 2 targets" }, { name: "Railgun", cost: 1200, desc: "Fast & High Dmg" }, { name: "Gatling", cost: 2500, desc: "Insane Fire Rate" }, { name: "Death Ray", cost: 6000, desc: "Instant Hit Beam" }], path2: [{ name: "Rune Carving", cost: 150, desc: "+5 Damage" }, { name: "Seeking", cost: 350, desc: "Auto-aim" }, { name: "Multi-Shot", cost: 1000, desc: "Fires 3 bolts" }, { name: "Spell Weaver", cost: 2200, desc: "Double Projectiles" }, { name: "Eldritch Blast", cost: 5500, desc: "Explosive Magic" }] } },
vent: { name: "Flux Vent", cost: 300, range: 80, damage: 1, cooldown: 6, color: "#FF4500", shape: "triangle", projectileSpeed: 0, type: "energy", desc: "Short range AoE spray.", upgrades: { path1: [{ name: "High Pressure", cost: 200, desc: "+Range" }, { name: "Plasma Fire", cost: 450, desc: "+Damage" }, { name: "Blue Flame", cost: 1100, desc: "Melts Armor" }, { name: "Fusion Core", cost: 2400, desc: "Massive Cone" }, { name: "Solar Wind", cost: 5000, desc: "Global DoT Aura" }], path2: [{ name: "Cursed Fumes", cost: 250, desc: "Slows enemies" }, { name: "Hex Cloud", cost: 500, desc: "Reduces Dmg Dealt" }, { name: "Soul Burn", cost: 1200, desc: "% Max HP Dmg" }, { name: "Terror", cost: 2600, desc: "Stuns briefly" }, { name: "Nether Rift", cost: 5500, desc: "Insta-kill low HP" }] } },
coil: { name: "Tesla Coil", cost: 450, range: 130, damage: 15, cooldown: 45, color: "#00FFFF", shape: "circle", projectileSpeed: 0, type: "energy", desc: "Chains lightning.", upgrades: { path1: [{ name: "High Voltage", cost: 250, desc: "+Damage" }, { name: "Capacitor", cost: 550, desc: "More Chains" }, { name: "Overload", cost: 1400, desc: "Fast Fire Rate" }, { name: "Arc Reactor", cost: 3000, desc: "Chains Unlimited" }, { name: "Thunder God", cost: 7000, desc: "Screen Wipe Zap" }], path2: [{ name: "Static", cost: 300, desc: "Slows targets" }, { name: "Shock", cost: 600, desc: "Stuns targets" }, { name: "Chain Reaction", cost: 1500, desc: "Explodes on death" }, { name: "Storm Caller", cost: 3200, desc: "Strikes randoms" }, { name: "Zeus's Wrath", cost: 7500, desc: "Massive AoE Stun" }] } },
fabricator: { name: "Fabricator", cost: 550, range: 100, damage: 40, cooldown: 100, color: "#808080", shape: "square", projectileSpeed: 0, type: "physical", desc: "Places mines on track.", upgrades: { path1: [{ name: "Proximity", cost: 300, desc: "Wider Trigger" }, { name: "Cluster Mine", cost: 600, desc: "Spawns 3 mines" }, { name: "High Explosive", cost: 1500, desc: "Huge Damage" }, { name: "Smart Mines", cost: 3500, desc: "Seek enemies" }, { name: "Nuke Layer", cost: 8000, desc: "Nuclear Mines" }], path2: [{ name: "Rune Trap", cost: 350, desc: "Magic Dmg" }, { name: "Frost Glyph", cost: 700, desc: "Freezes enemies" }, { name: "Gravity Sigil", cost: 1600, desc: "Sucks enemies in" }, { name: "Void Gate", cost: 3800, desc: "Teleports enemy back" }, { name: "Dimensional Rift", cost: 8500, desc: "Removes enemy" }] } },
pylon: { name: "Chrono-Pylon", cost: 350, range: 100, damage: 0, cooldown: 0, color: "#ffffff", shape: "circle", type: "none", desc: "Buffs towers.", upgrades: { path1: [{ name: "Network Hub", cost: 200, desc: "+Range" }, { name: "Signal Boost", cost: 400, desc: "Stronger Buff" }, { name: "Global Uplink", cost: 1500, desc: "Global Buff" }, { name: "Overclock", cost: 3000, desc: "+Dmg Buff" }, { name: "Command Center", cost: 6000, desc: "Double Buff" }], path2: [{ name: "Time Field", cost: 250, desc: "Slow aura" }, { name: "Stasis Trap", cost: 500, desc: "Stuns" }, { name: "Temporal Rift", cost: 1200, desc: "Massive Slow" }, { name: "Time Warp", cost: 2800, desc: "Reverses enemies" }, { name: "Chronosphere", cost: 6500, desc: "Freezes Time" }] } },
prism: { name: "Aether Prism", cost: 400, range: 180, damage: 1, cooldown: 0, color: "#bd00ff", shape: "triangle", type: "energy", desc: "Continuous beam.", upgrades: { path1: [{ name: "Focused Lens", cost: 250, desc: "x2 Damage" }, { name: "Gamma Burst", cost: 600, desc: "Armor Strip" }, { name: "Orbital Cannon", cost: 1500, desc: "Global Range" }, { name: "Plasma Cutter", cost: 3500, desc: "Melts HP" }, { name: "Death Star", cost: 8000, desc: "Obliterate" }], path2: [{ name: "Frost Runes", cost: 300, desc: "Slows" }, { name: "Entropy Field", cost: 650, desc: "Chains 2" }, { name: "Time Dilation", cost: 1400, desc: "Stops movement" }, { name: "Soul Drain", cost: 3000, desc: "Heals Lives" }, { name: "Void Ray", cost: 7500, desc: "Erases enemies" }] } },
lance: { name: "Void Lance", cost: 500, range: 300, damage: 50, cooldown: 90, color: "#551A8B", shape: "triangle", projectileSpeed: 15, type: "physical", desc: "Sniper. Upgrades increase pierce.", upgrades: { path1: [{ name: "Targeting", cost: 250, desc: "+Range/Speed" }, { name: "Thermal", cost: 600, desc: "Explosive" }, { name: "Anti-Matter", cost: 1500, desc: "Insta-kill" }, { name: "Rail-Gun", cost: 3500, desc: "Pierce All" }, { name: "Orbital Strike", cost: 9000, desc: "Nuke Map" }], path2: [{ name: "Shadow Bind", cost: 300, desc: "Roots" }, { name: "Soul Siphon", cost: 700, desc: "Gain Life" }, { name: "Abyssal Gaze", cost: 2000, desc: "% HP Dmg" }, { name: "Executioner", cost: 4000, desc: "Kill <50% HP" }, { name: "Reaper", cost: 9500, desc: "Boss Slayer" }] } },
mortar: { name: "Gravity Mortar", cost: 600, range: 250, damage: 30, cooldown: 120, color: "#ffaa00", shape: "circle", projectileSpeed: 4, type: "physical", desc: "Splash damage.", upgrades: { path1: [{ name: "Dark Matter", cost: 350, desc: "+Radius" }, { name: "Singularity", cost: 800, desc: "Pulls enemies" }, { name: "Anti-Matter", cost: 2000, desc: "Massive Dmg" }, { name: "Napalm", cost: 4500, desc: "Fire Area" }, { name: "Nuclear Winter", cost: 9000, desc: "Rad Zone" }], path2: [{ name: "Acid", cost: 300, desc: "Acid Pool" }, { name: "Midas Touch", cost: 750, desc: "+Gold" }, { name: "Meteor Swarm", cost: 1800, desc: "Rain Fire" }, { name: "Plague", cost: 4000, desc: "Spreading DoT" }, { name: "Armageddon", cost: 9500, desc: "Screen Nuke" }] } },
nullifier: { name: "Nullifier", cost: 700, range: 150, damage: 5, cooldown: 60, color: "#fff", shape: "orb", projectileSpeed: 10, type: "hybrid", desc: "Strips immunities.", upgrades: { path1: [{name:"Nanites", cost:300, desc:"AoE Cloud"}, {name:"Shredder", cost:600, desc:"Resist Strip"}, {name:"True Dmg", cost:1500, desc:"Ignore Armor"}, {name:"Destabilizer", cost:4000, desc:"Explode on Death"}, {name:"Grey Goo", cost:9000, desc:"Map Eater"}], path2: [{name:"Weakness", cost:300, desc:"+Damage Taken"}, {name:"Soul Sap", cost:600, desc:"Heal on hit"}, {name:"Doom", cost:1500, desc:"Dmg after time"}, {name:"Silence", cost:3500, desc:"Stop Abilities"}, {name:"Void Collapse", cost:9500, desc:"Black Hole"}]} }
};

export class Tower {
constructor(x, y, typeKey) {
    const type = TOWER_TYPES[typeKey];
    this.x = x; this.y = y; this.type = typeKey; this.name = type.name;
    this.range = type.range; this.damage = type.damage; this.cooldownMax = type.cooldown;
    this.cooldown = 0; this.color = type.color; this.shape = type.shape;
    this.projectileSpeed = type.projectileSpeed || 0;
    this.path = 0; this.level = 0; this.angle = 0; this.buffSpeedMultiplier = 1.0;
    this.buffDamageMultiplier = 1.0; this.buffRangeMultiplier = 1.0; this.buffCostMultiplier = 1.0;
    this.priority = 'first'; 
    this.currentTarget = null;
    this.totalDamage = 0; 
}
update() { 
    this.buffSpeedMultiplier = 1.0; 
    this.buffDamageMultiplier = 1.0;
    this.buffRangeMultiplier = 1.0;
    this.buffCostMultiplier = 1.0;

    // UPDATED: If frozen, cooldown recovers at half speed (0.5). Otherwise full speed (1).
    let decrement = (gameState.freezeTimer > 0) ? 0.5 : 1;
    if (this.cooldown > 0) this.cooldown -= decrement; 
}

getTarget(candidates) {
    if (candidates.length === 0) return null;
    return candidates.sort((a, b) => {
        if (this.priority === 'first') return b.distanceTravelled - a.distanceTravelled;
        if (this.priority === 'last') return a.distanceTravelled - b.distanceTravelled;
        if (this.priority === 'closest') return Math.hypot(a.x - this.x, a.y - this.y) - Math.hypot(b.x - this.x, b.y - this.y);
        if (this.priority === 'farthest') return Math.hypot(b.x - this.x, b.y - this.y) - Math.hypot(a.x - this.x, a.y - this.y);
        if (this.priority === 'strongest') return b.hp - a.hp;
        if (this.priority === 'flying') {
            if (a.fly !== b.fly) return b.fly ? 1 : -1;
            return b.distanceTravelled - a.distanceTravelled;
        }
        return b.distanceTravelled - a.distanceTravelled;
    })[0];
}

act() {

    let cd = this.cooldownMax / this.buffSpeedMultiplier;
    this.currentTarget = null;

    if (this.type === 'pylon') {
        let buffRange = this.range;
        if (this.path === 1 && this.level >= 1) buffRange += 50; if (this.path === 1 && this.level >= 3) buffRange = 2000;
        
        // Apply buffs to neighbors
        towers.forEach(t => { 
            if (t === this) return; 
            if (Math.hypot(t.x - this.x, t.y - this.y) <= buffRange) { 
                // Base: +20% Damage
                t.buffDamageMultiplier = Math.max(t.buffDamageMultiplier, 1.2);
                
                // Path 1 Lvl 2: +20% Range
                if (this.path === 1 && this.level >= 2) t.buffRangeMultiplier = Math.max(t.buffRangeMultiplier, 1.2);
                
                // Path 1 Lvl 4: 10% Discount
                if (this.path === 1 && this.level >= 4) t.buffCostMultiplier = Math.min(t.buffCostMultiplier, 0.9);
                
                // Path 1 Lvl 5: 25% Discount and +50% Damage
                if (this.path === 1 && this.level >= 5) {
                    t.buffCostMultiplier = Math.min(t.buffCostMultiplier, 0.75);
                    t.buffDamageMultiplier = Math.max(t.buffDamageMultiplier, 1.5);
                }
            } 
        });
        if (this.path === 2) { enemies.forEach(e => { if (Math.hypot(e.x - this.x, e.y - this.y) <= this.range) { if (this.level >= 1) e.slowTimer = 5; if (this.level >= 5) e.stunTimer = 1; } }); }
        return; 
    }
    if (this.type === 'miner') return;
    
    let effectiveRange = this.range * this.buffRangeMultiplier;
    let effectiveDamage = this.damage * this.buffDamageMultiplier;

    if (this.type === 'fabricator') {
        if (this.cooldown <= 0) {
            // Calculate spawn position on path
            let validPoints = [];
            for(let i=0; i<pathPoints.length-1; i++) {
                // Check if segment is close
                let p1 = pathPoints[i];
                let p2 = pathPoints[i+1];
                if (Math.hypot(p1.x - this.x, p1.y - this.y) < effectiveRange) validPoints.push(p1);
                if (Math.hypot(p2.x - this.x, p2.y - this.y) < effectiveRange) validPoints.push(p2);
            }
            
            if(validPoints.length > 0) {
                let p = validPoints[Math.floor(Math.random()*validPoints.length)];
                mines.push({ x: p.x + (Math.random()-0.5)*10, y: p.y + (Math.random()-0.5)*10, damage: effectiveDamage * (1 + this.level), radius: 20, life: 600, type: (this.path===2)?'rune':'tech', source: this });
                this.cooldown = cd;
            }
        }
        return;
    }
    if (this.type === 'vent') {
        let target = null; let minD = Infinity;
        enemies.forEach(e => { let d = Math.hypot(e.x - this.x, e.y - this.y); if (d <= effectiveRange && d < minD) { minD = d; target = e; } });
        if (target) {
            this.angle = Math.atan2(target.y - this.y, target.x - this.x);
            if (this.cooldown <= 0) {
                enemies.forEach(e => {
                    let d = Math.hypot(e.x - this.x, e.y - this.y);
                    if (d <= effectiveRange) {
                        let angleToEnemy = Math.atan2(e.y - this.y, e.x - this.x);
                        let diff = angleToEnemy - this.angle;
                        while (diff < -Math.PI) diff += Math.PI * 2; while (diff > Math.PI) diff -= Math.PI * 2;
                        if (Math.abs(diff) < 0.5) {
                            e.takeDamage(effectiveDamage + (this.level * 2), this);
                            if(this.path === 2 && this.level >= 1) e.slowTimer = 10;
                            if(this.path === 1 && this.level >= 3) e.takeDamage(1, this);
                        }
                    }
                });
                visualEffects.push(new VisualEffect('cone', this.x, this.y, { angle: this.angle, radius: effectiveRange, color: this.path === 2 ? '#8A2BE2' : '#FF4500', life: 7 }));
                Sound.play(this.path===2?'shoot_magic':'shoot_tech');
                this.cooldown = 6; 
            }
        }
        return;
    }
    
    let validTargets = [];
    if (this.type === 'lance' && this.path === 1 && this.level >= 1) effectiveRange += 100;
    if (this.type === 'prism' && this.path === 1 && this.level >= 3) effectiveRange = 2000;

    for (const enemy of enemies) {
        let dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
        if (dist <= effectiveRange) validTargets.push(enemy);
    }

    let target = this.getTarget(validTargets);

    if (target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.currentTarget = target; 
        if (this.cooldown <= 0) { this.shoot(target, effectiveDamage); this.cooldown = cd; }
    }
}
shoot(target, dmg) {
    Sound.play((this.type==='prism' || this.path===2) ? 'shoot_magic' : 'shoot_tech');
    if (this.type === 'prism') {
        let d = dmg * (1 + this.level);
        if (this.path === 1 && this.level >= 1) d *= 2; if (this.path === 1 && this.level >= 5) d *= 5; 
        target.takeDamage(d, this);
        if (this.path === 2 && this.level >= 1) target.slowTimer = 5; 
        if (this.path === 2 && this.level >= 5) target.hp = 0; 
        if (this.path === 2 && this.level >= 2) this.chainLightning(target, 2, d); 
        return;
    }
    if (this.type === 'coil') {
        this.chainLightning(target, 2 + this.level, dmg); 
        let pts = [{x:this.x, y:this.y}];
        let steps = 5;
        for(let i=1; i<steps; i++){
            let t = i/steps;
            pts.push({ x: this.x + (target.x - this.x)*t + (Math.random()-0.5)*20, y: this.y + (target.y - this.y)*t + (Math.random()-0.5)*20 });
        }
        pts.push({x:target.x, y:target.y});
        visualEffects.push(new VisualEffect('lightning', this.x, this.y, { points: pts, color: '#00FFFF', life: 5, width: 2 }));
        return;
    }
    
    let dx = target.x - this.x;
    let dy = target.y - this.y;
    let dist = Math.hypot(dx, dy);
    
    if (this.type === 'lance') {
        // Linear Shot for Lance
        let speed = this.projectileSpeed;
        let vx = (dx / dist) * speed;
        let vy = (dy / dist) * speed;
        let p = new Projectile(this.x, this.y, null, this.type, dmg, speed, this);
        p.vx = vx; p.vy = vy;
        
        // Pierce Logic
        p.pierce = 1 + this.level; // Base 1, +1 per level
        if(this.path === 1 && this.level >= 3) p.pierce += 100; // Railgun pierces all
        if(this.path === 1 && this.level >= 2) p.isExplosive = true;
        
        projectiles.push(p);
        return;
    }

    if (this.type === 'nullifier') {
        let p = new Projectile(this.x, this.y, target, this.type, dmg + (this.level*5), this.projectileSpeed, this);
        if (this.path === 1 && this.level >= 1) p.explosionRadius = 40; 
        projectiles.push(p);
        return;
    }

    let p = new Projectile(this.x, this.y, target, this.type, dmg, this.projectileSpeed, this);
    if (this.type === 'sentry') {
        if (this.path === 1 && this.level >= 2) p.pierce = 1;
        if (this.path === 1 && this.level >= 5) p.damage *= 10; 
        if (this.path === 2 && this.level >= 2) p.seeking = true;
        if (this.path === 2 && this.level >= 3) { setTimeout(() => projectiles.push(new Projectile(this.x, this.y, target, this.type, dmg, this.projectileSpeed, this)), 5); setTimeout(() => projectiles.push(new Projectile(this.x, this.y, target, this.type, dmg, this.projectileSpeed, this)), 10); }
    }
    if (this.type === 'mortar') {
        if (this.path === 1 && this.level >= 1) p.explosionRadius *= 1.5;
        if (this.path === 1 && this.level >= 3) p.damage *= 5; 
        if (this.path === 2 && this.level >= 5) p.explosionRadius = 1000; 
    }
    projectiles.push(p);
}
onWaveEnd() {
    if (this.type === 'miner') {
        let gain = 15; gain += this.level * 10; 
        if (this.path === 1 && this.level >= 1) gain += 10; if (this.path === 1 && this.level >= 4) gain += 150;
        if (this.path === 2 && this.level >= 2) gain += 40; if (this.path === 2 && this.level >= 3) gain += 100; if (this.path === 2 && this.level >= 4) gain *= 2; 
        if (this.path === 1 && this.level >= 3) gain += Math.floor(gameState.money * 0.1);
        if (this.path === 1 && this.level >= 5) gain += Math.floor(gameState.money * 0.2); 
        gameState.money += gain;
        particles.push(new Particle(this.x, this.y, '#ffd700', 5, 40));
    }
}
chainLightning(target, bounces, dmg) {
    if (bounces <= 0) return;
    let nextTarget = null; let minD = 200; 
    for (const e of enemies) {
        if (e === target) continue;
        const d = Math.hypot(e.x - target.x, e.y - target.y);
        if (d < minD) { minD = d; nextTarget = e; }
    }
    if (nextTarget) {
        let pts = [{x:target.x, y:target.y}];
        let steps = 5;
        for(let i=1; i<steps; i++){
            let t = i/steps;
            pts.push({
                x: target.x + (nextTarget.x - target.x)*t + (Math.random()-0.5)*20,
                y: target.y + (nextTarget.y - target.y)*t + (Math.random()-0.5)*20
            });
        }
        pts.push({x:nextTarget.x, y:nextTarget.y});
        visualEffects.push(new VisualEffect('lightning', 0, 0, {
            points: pts, color: '#00FFFF', life: 5, width: 1.5
        }));
        nextTarget.takeDamage(dmg, this);
        if (this.path === 2 && this.level >= 2) nextTarget.stunTimer = 10;
        this.chainLightning(nextTarget, bounces - 1, dmg);
    }
}

// Inside class Tower
// Inside class Tower
draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // 1. Draw Range Bubble (Only if selected or Pylon)
    if (this === selectedTower || this.type === 'pylon') {
        let r = this.range * (this.buffRangeMultiplier || 1);
        
        // Pylon special range logic
        if (this.type === 'pylon') {
            if (this.path === 1 && this.level >= 1) r += 50;
            if (this.path === 1 && this.level >= 3) r = 2000; 
        }

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        
        if (this === selectedTower) {
            ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
            ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
            ctx.setLineDash([5, 5]); 
        } else {
            ctx.fillStyle = "rgba(255, 215, 0, 0.03)";
            ctx.strokeStyle = "rgba(255, 215, 0, 0.1)";
            ctx.setLineDash([]);
        }
        ctx.fill(); ctx.stroke(); ctx.setLineDash([]); 
    }

    // 2. Base Pedestal
    let grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 16);
    grad.addColorStop(0, "#444");
    grad.addColorStop(1, "#111");
    ctx.fillStyle = grad;
    
    ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#444"; ctx.lineWidth = 2; ctx.stroke();
    
    // Bolts
    ctx.fillStyle = "#666";
    for(let i=0; i<4; i++) {
        ctx.beginPath(); ctx.arc(10 * Math.cos(i*Math.PI/2 + Math.PI/4), 10 * Math.sin(i*Math.PI/2 + Math.PI/4), 2, 0, Math.PI*2); ctx.fill();
    }

    // 3. Rotate Turret (if applicable)
    if (!['pylon','miner','fabricator','nullifier'].includes(this.type)) ctx.rotate(this.angle);

    // 4. Main Body (Crash fix: Simplified Gradient)
    ctx.shadowBlur = 10; ctx.shadowColor = this.color;
    ctx.fillStyle = this.color; // Fallback
    
    // Create a safe gradient using transparent overlays instead of math
    let bodyGrad = ctx.createLinearGradient(-10, -10, 10, 10);
    bodyGrad.addColorStop(0, this.color);
    bodyGrad.addColorStop(1, this.color);
    ctx.fillStyle = bodyGrad;

    // Draw Shapes
    if (this.shape === 'square') { 
        ctx.fillRect(-10, -10, 20, 20); 
        ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(-10, -10, 10, 20); // Shading
        ctx.fillStyle = "#222"; ctx.fillRect(10, -3, 8, 6); // Barrel
    } 
    else if (this.shape === 'triangle') { 
        ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-8, 10); ctx.lineTo(-8, -10); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(0,0,3,0,Math.PI*2); ctx.fill();
    } 
    else if (this.shape === 'circle') { 
        ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.stroke();
    }
    else {
        ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 0;

    // 5. Tech/Magic Overlays (Scaled Down)
    if (this.path > 0 && this.level > 0) {
        ctx.save();
        ctx.scale(0.6, 0.6); // Keep them small
        ctx.lineWidth = 3;
        
        if (this.path === 1) { // TECH
            ctx.strokeStyle = "#00f3ff"; ctx.shadowColor = "#00f3ff"; ctx.shadowBlur = 5;
            ctx.beginPath();
            if (this.level >= 1) ctx.strokeRect(-12, -12, 24, 24);
            if (this.level >= 3) { ctx.moveTo(-12, 0); ctx.lineTo(12, 0); ctx.moveTo(0, -12); ctx.lineTo(0, 12); }
            if (this.level >= 5) { ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); }
            ctx.stroke();
        } 
        else if (this.path === 2) { // MAGIC
            ctx.strokeStyle = "#bd00ff"; ctx.shadowColor = "#bd00ff"; ctx.shadowBlur = 5;
            ctx.beginPath();
            if (this.level >= 1) { ctx.moveTo(0, -15); ctx.lineTo(10, 5); ctx.lineTo(-10, 5); ctx.closePath(); } 
            if (this.level >= 3) { ctx.arc(0, 0, 16, 0, Math.PI*2); }
            ctx.stroke();
        }
        ctx.restore();
    }
    
    // Level Dots
    ctx.fillStyle = "#fff";
    const dotStart = -((this.level-1) * 3);
    for(let i=0; i<this.level; i++) {
        ctx.beginPath(); ctx.arc(dotStart + (i*6), 18, 1.5, 0, Math.PI*2); ctx.fill();
    }

    ctx.restore();
}
};