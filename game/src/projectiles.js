export class Projectile {
constructor(x, y, target, type, damage, speed, sourceTower) {
    this.x = x; this.y = y; this.target = target;
    this.type = type; this.damage = damage; this.speed = speed;
    this.sourceTower = sourceTower;
    this.active = true; this.pierce = 0; this.seeking = false;
    this.explosionRadius = 0; this.isExplosive = false;
    this.hitList = []; // Track who we hit (for linear shots)

    if (target) {
        this.targetX = target.x; this.targetY = target.y;
    } else {
        // For linear shots without target obj (e.g. Lance initial shot)
        this.targetX = x; this.targetY = y; 
    }
    
    if (type === 'mortar' || (type === 'nullifier' && sourceTower.path === 1 && sourceTower.level >= 1)) { 
        this.explosionRadius = 40; 
    }
    
    // Linear movement vars
    this.vx = 0; this.vy = 0;
}

update() {
    if (!this.active) return;
    
    // Linear Movement (Lance)
    if (this.type === 'lance') {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounds check
        if(this.x < 0 || this.x > CANVAS_WIDTH || this.y < 0 || this.y > CANVAS_HEIGHT) {
            this.active = false;
        }
        
        // Collision Check with ALL enemies
        for(const e of enemies) {
            if (!this.hitList.includes(e) && Math.hypot(this.x - e.x, this.y - e.y) < e.radius + 5) {
                this.hitList.push(e);
                this.hit(e);
                if (!this.active) break;
            }
        }
        return;
    }

    // Homing / Standard
    let tx = this.targetX; let ty = this.targetY;
    if (this.type !== 'mortar' && this.type !== 'nullifier' && this.target && enemies.includes(this.target)) { tx = this.target.x; ty = this.target.y; }
    else if (this.seeking && this.target && enemies.includes(this.target)) { tx = this.target.x; ty = this.target.y; }
    
    const dx = tx - this.x; const dy = ty - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist <= this.speed) this.hit(this.target);
    else { this.x += (dx / dist) * this.speed; this.y += (dy / dist) * this.speed; }
}

hit(targetEnemy) {
    // Lance pierce logic
    if (this.type === 'lance') {
        if (targetEnemy) {
            targetEnemy.takeDamage(this.damage, this.sourceTower);
            if (this.isExplosive) {
                visualEffects.push(new VisualEffect('explosion', this.x, this.y, { radius: 20, color: '#ff4444', life: 10 }));
                // Splash damage? Let's keep it simple for now, explosive just visual or small splash
            }
        }
        if (this.pierce > 0) {
            this.pierce--;
            if(this.pierce <= 0) this.active = false;
        } else {
            this.active = false;
        }
        return;
    }

    this.active = false;
    if (this.type === 'mortar' || this.isExplosive || (this.type === 'nullifier' && this.explosionRadius > 0)) {
        let rad = this.explosionRadius || 30;
        Sound.play('explosion');
        visualEffects.push(new VisualEffect('explosion', this.x, this.y, { radius: rad, color: this.type==='nullifier'?'#fff':'#ffaa00', life: 15 }));
        if (this.type !== 'nullifier') for(let i=0; i<10; i++) particles.push(new Particle(this.x, this.y, '#ffaa00', 4, 25));
        
        enemies.forEach(e => {
            if (Math.hypot(e.x - this.x, e.y - this.y) <= rad) {
                if (this.type === 'nullifier') {
                    e.resistance = 'none'; 
                    e.takeDamage(this.damage, this.sourceTower);
                    if (this.sourceTower.path === 2 && this.sourceTower.level >= 1) e.takeDamage(e.hp * 0.1, this.sourceTower); 
                } else {
                    e.takeDamage(this.damage, this.sourceTower);
                }
            }
        });
    } else {
        // Standard hit
        let t = targetEnemy || (this.target && enemies.includes(this.target) ? this.target : null);
        if (t) {
            if (this.type === 'nullifier') {
                t.resistance = 'none';
                t.takeDamage(this.damage, this.sourceTower);
            } else {
                t.takeDamage(this.damage, this.sourceTower);
            }
            if (this.pierce > 0) { 
                this.pierce--; 
                this.active = true; 
                // For homing projectiles, pierce is tricky. Usually implies finding a new target behind.
                // Simplified: It stays active but needs to find a new target? 
                // Current logic just lets it linger at same spot, which isn't great.
                // For now, let's keep pierce behavior mainly for Lance and Sentry (if linear)
            } else {
                this.active = false;
            }
        }
    }
}
draw() {
    ctx.beginPath();
    if (this.type === 'mortar') { ctx.fillStyle = "#ffaa00"; ctx.arc(this.x, this.y, 6, 0, Math.PI * 2); }
    else if (this.type === 'nullifier') { ctx.fillStyle = "#fff"; ctx.arc(this.x, this.y, 4, 0, Math.PI * 2); }
    else if (this.type === 'lance') { 
        ctx.fillStyle = "#A020F0"; 
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(Math.atan2(this.vy, this.vx)); 
        ctx.fillRect(-6, -1, 12, 2); ctx.restore();
    }
    else { ctx.fillStyle = "#00f3ff"; ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); }
    ctx.fill();
}
};