// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    speed: 5,
    jumpForce: -12,
    wallJumpForce: -10,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    isWallSliding: false,
    wallSlideSpeed: 2,
    wallJumpDirection: 0, // -1 for left wall, 1 for right wall
    canWallJump: false,
    wallJumpTimer: 0,
    wallJumpDelay: 100, // milliseconds to allow wall jump after leaving wall
    color: '#FF5722',
    isInvulnerable: false
};

// Level designs
const levels = [
    // Level 1 - Basic introduction
    {
        platforms: [
            { x: 0, y: 350, width: 800, height: 50, color: '#4CAF50' },    // Ground
            { x: 300, y: 250, width: 200, height: 20, color: '#4CAF50' },  // Platform 1
            { x: 100, y: 150, width: 200, height: 20, color: '#4CAF50' },  // Platform 2
            { x: 500, y: 150, width: 200, height: 20, color: '#4CAF50' }   // Platform 3
        ],
        coins: [
            { x: 350, y: 200, width: 15, height: 15, collected: false },
            { x: 150, y: 100, width: 15, height: 15, collected: false },
            { x: 550, y: 100, width: 15, height: 15, collected: false }
        ],
        enemies: [
            { x: 350, y: 220, width: 30, height: 30, speed: 2, color: '#FF0000', 
              platformIndex: 1, direction: 1, isAlive: true }, // Platform 1 enemy
            { x: 150, y: 120, width: 30, height: 30, speed: 2, color: '#FF0000',
              platformIndex: 2, direction: 1, isAlive: true }  // Platform 2 enemy
        ]
    },
    // Level 2 - More challenging jumps
    {
        platforms: [
            { x: 0, y: 350, width: 800, height: 50, color: '#4CAF50' },    // Ground
            { x: 200, y: 250, width: 100, height: 20, color: '#4CAF50' },  
            { x: 400, y: 200, width: 100, height: 20, color: '#4CAF50' },  
            { x: 600, y: 150, width: 100, height: 20, color: '#4CAF50' },
            { x: 100, y: 100, width: 100, height: 20, color: '#4CAF50' }   
        ],
        coins: [
            { x: 220, y: 200, width: 15, height: 15, collected: false },
            { x: 420, y: 150, width: 15, height: 15, collected: false },
            { x: 620, y: 100, width: 15, height: 15, collected: false },
            { x: 120, y: 50, width: 15, height: 15, collected: false }
        ],
        enemies: [
            { x: 220, y: 220, width: 30, height: 30, speed: 3, color: '#FF0000',
              platformIndex: 1, direction: 1, isAlive: true },
            { x: 420, y: 170, width: 30, height: 30, speed: 3, color: '#FF0000',
              platformIndex: 2, direction: 1, isAlive: true },
            { x: 620, y: 120, width: 30, height: 30, speed: 3, color: '#FF0000',
              platformIndex: 3, direction: 1, isAlive: true }
        ]
    },
    // Level 3 - Expert challenge
    {
        platforms: [
            { x: 0, y: 350, width: 800, height: 50, color: '#4CAF50' },    // Ground
            { x: 150, y: 280, width: 80, height: 20, color: '#4CAF50' },
            { x: 300, y: 220, width: 80, height: 20, color: '#4CAF50' },
            { x: 450, y: 160, width: 80, height: 20, color: '#4CAF50' },
            { x: 600, y: 100, width: 80, height: 20, color: '#4CAF50' },
            { x: 700, y: 180, width: 80, height: 20, color: '#4CAF50' }
        ],
        coins: [
            { x: 170, y: 230, width: 15, height: 15, collected: false },
            { x: 320, y: 170, width: 15, height: 15, collected: false },
            { x: 470, y: 110, width: 15, height: 15, collected: false },
            { x: 620, y: 50, width: 15, height: 15, collected: false },
            { x: 720, y: 130, width: 15, height: 15, collected: false }
        ],
        enemies: [
            { x: 170, y: 250, width: 30, height: 30, speed: 4, color: '#FF0000',
              platformIndex: 1, direction: 1, isAlive: true },
            { x: 320, y: 190, width: 30, height: 30, speed: 4, color: '#FF0000',
              platformIndex: 2, direction: 1, isAlive: true },
            { x: 470, y: 130, width: 30, height: 30, speed: 4, color: '#FF0000',
              platformIndex: 3, direction: 1, isAlive: true },
            { x: 720, y: 150, width: 30, height: 30, speed: 4, color: '#FF0000',
              platformIndex: 5, direction: 1, isAlive: true }
        ]
    }
];

// Game state
let currentLevel = 0;
let score = 0;
let platforms = levels[currentLevel].platforms;
let coins = JSON.parse(JSON.stringify(levels[currentLevel].coins));
let enemies = JSON.parse(JSON.stringify(levels[currentLevel].enemies));
let gameState = 'playing'; // 'playing', 'dying', 'dead', 'levelComplete', 'transitioning'
let deathAnimationTime = 0;
let deathAnimationDuration = 2000;
let transitionTime = 0;
let transitionDuration = 2000; // 2 seconds for level transition
let completedLevel = false;

// Physics
const gravity = 0.5;
const friction = 0.8;

// Controls
const keys = {
    left: false,
    right: false,
    up: false
};

// Event listeners for controls
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            keys.left = true;
            break;
        case 'arrowright':
        case 'd':
            keys.right = true;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            keys.up = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            keys.left = false;
            break;
        case 'arrowright':
        case 'd':
            keys.right = false;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            keys.up = false;
            break;
    }
});

// Check collision between two rectangles
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Reset level
function resetLevel() {
    player.x = 50;
    player.y = 200;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isJumping = false;
    player.isInvulnerable = false;
    
    // Reset enemies and coins
    coins = JSON.parse(JSON.stringify(levels[currentLevel].coins));
    enemies = JSON.parse(JSON.stringify(levels[currentLevel].enemies));
}

// Load next level
function loadNextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        // Game completed!
        alert('Congratulations! You completed all levels! Play again?');
        currentLevel = 0;
    }
    resetLevel();
    platforms = levels[currentLevel].platforms;
}

// Make player temporarily invulnerable
function makeInvulnerable() {
    player.isInvulnerable = true;
    player.color = '#FFA07A'; // Light salmon color to show invulnerability
    setTimeout(() => {
        player.isInvulnerable = false;
        player.color = '#FF5722';
    }, 1000); // 1 second of invulnerability
}

// Check if level is complete
function checkLevelComplete() {
    return coins.every(coin => coin.collected);
}

// Particle system
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.gravity = 0.1;
        this.life = 1.0; // Full opacity
        this.decay = Math.random() * 0.02 + 0.02; // Random decay rate
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Particle systems array
let particleSystems = [];

// Create explosion effect
function createExplosion(x, y, color) {
    const particles = [];
    const numParticles = 20;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y, color));
    }
    particleSystems.push(particles);
}

// Update and draw particles
function updateParticles() {
    for (let i = particleSystems.length - 1; i >= 0; i--) {
        const particles = particleSystems[i];
        
        // Update and draw each particle
        for (let j = particles.length - 1; j >= 0; j--) {
            const particle = particles[j];
            particle.update();
            particle.draw(ctx);
            
            // Remove dead particles
            if (particle.life <= 0) {
                particles.splice(j, 1);
            }
        }
        
        // Remove empty particle systems
        if (particles.length === 0) {
            particleSystems.splice(i, 1);
        }
    }
}

// Trail system
class TrailSegment {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alpha = 0.7;
        this.decay = 0.05;
    }

    update() {
        this.alpha -= this.decay;
        return this.alpha > 0;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Trail array
const trail = [];
const maxTrailLength = 10;
let lastTrailPos = { x: 0, y: 0 };
const trailSpawnDistance = 5; // Minimum distance to spawn new trail

// Function to get trail color based on player state
function getTrailColor() {
    if (player.isInvulnerable) {
        return '255, 160, 122'; // Light salmon for invulnerable
    } else if (player.isWallSliding) {
        return '255, 140, 0'; // Dark orange for wall sliding
    } else if (Math.abs(player.velocityX) > 3 || Math.abs(player.velocityY) > 3) {
        return '255, 87, 34'; // Bright orange for fast movement
    } else {
        return '255, 87, 34, 0.5'; // Semi-transparent orange for normal movement
    }
}

// Function to update trail
function updateTrail() {
    // Calculate distance from last trail position
    const dx = player.x - lastTrailPos.x;
    const dy = player.y - lastTrailPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Add new trail segment if moved enough
    if (distance > trailSpawnDistance) {
        trail.push(new TrailSegment(
            player.x,
            player.y,
            player.width,
            player.height,
            getTrailColor()
        ));
        lastTrailPos = { x: player.x, y: player.y };

        // Limit trail length
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
    }

    // Update existing trail segments
    for (let i = trail.length - 1; i >= 0; i--) {
        if (!trail[i].update()) {
            trail.splice(i, 1);
        }
    }
}

// Update enemy positions
function updateEnemies() {
    enemies.forEach(enemy => {
        if (!enemy.isAlive) return;

        const platform = platforms[enemy.platformIndex];
        enemy.x += enemy.speed * enemy.direction;

        // Change direction if enemy reaches platform edges
        if (enemy.x <= platform.x || 
            enemy.x + enemy.width >= platform.x + platform.width) {
            enemy.direction *= -1;
        }

        // Check collision with player
        if (checkCollision(player, enemy)) {
            // Player jumps on enemy
            if (player.velocityY > 0 && 
                player.y + player.height - player.velocityY <= enemy.y) {
                enemy.isAlive = false;
                player.velocityY = player.jumpForce * 0.8; // Bounce off enemy
                score += 50; // Bonus points for defeating enemy
                
                // Creates explosion effect when enemy is defeated
                createExplosion(
                    enemy.x + enemy.width/2, 
                    enemy.y + enemy.height/2, 
                    '255, 0, 0' // Red color for enemy explosion
                );
            } 
            // Enemy hits player
            else if (!player.isInvulnerable) {
                killPlayer();
            }
        }
    });
}

// Create death explosion effect
function createDeathExplosion(x, y) {
    // Create multiple particle systems with different colors
    const colors = [
        '255, 87, 34',  // Orange (player color)
        '255, 0, 0',    // Red
        '255, 255, 255' // White
    ];
    
    colors.forEach(color => {
        const particles = [];
        const numParticles = 30; // More particles for death
        for (let i = 0; i < numParticles; i++) {
            const particle = new Particle(x, y, color);
            particle.speedX = Math.random() * 12 - 6; // Faster particles
            particle.speedY = Math.random() * 12 - 6;
            particle.size = Math.random() * 8 + 4; // Bigger particles
            particle.decay = Math.random() * 0.01 + 0.01; // Slower decay
            particles.push(particle);
        }
        particleSystems.push(particles);
    });
}

// Handle player death
function killPlayer() {
    if (gameState === 'playing') {
        gameState = 'dying';
        deathAnimationTime = Date.now();
        createDeathExplosion(
            player.x + player.width/2,
            player.y + player.height/2
        );
        // Clear the trail
        trail.length = 0;
    }
}

// Draw death screen
function drawDeathScreen() {
    // Fade in black background
    const timeSinceDeath = Date.now() - deathAnimationTime;
    const alpha = Math.min(0.7, timeSinceDeath / 1000); // Max 0.7 opacity
    
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw "YOU DIED" text
    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
    ctx.font = '60px "Pixelify Sans"';
    ctx.textAlign = 'center';
    const textY = canvas.height / 2;
    ctx.fillText('YOU DIED', canvas.width / 2, textY);

    // Draw score lost
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.font = '30px "Pixelify Sans"';
    ctx.fillText('-50 POINTS', canvas.width / 2, textY + 50);

    // Draw restart message
    if (timeSinceDeath > 1000) { // Show after 1 second
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(Date.now() / 500) * 0.3 + 0.7})`; // Pulsing effect
        ctx.font = '25px "Pixelify Sans"';
        ctx.fillText('Press SPACE to restart', canvas.width / 2, textY + 100);
    }

    // Reset text alignment for other text
    ctx.textAlign = 'left';
}

// Create level complete effect
function createLevelCompleteEffect() {
    // Create celebratory particles
    const colors = [
        '255, 215, 0',  // Gold
        '255, 255, 255', // White
        '76, 175, 80'    // Green
    ];
    
    // Create particles from multiple points across the top of the screen
    for (let x = 0; x < canvas.width; x += canvas.width / 5) {
        colors.forEach(color => {
            const particles = [];
            const numParticles = 15;
            for (let i = 0; i < numParticles; i++) {
                const particle = new Particle(x, 0, color);
                particle.speedX = Math.random() * 4 - 2;
                particle.speedY = Math.random() * 2 + 3;
                particle.size = Math.random() * 6 + 3;
                particle.decay = Math.random() * 0.01 + 0.005; // Slower decay
                particles.push(particle);
            }
            particleSystems.push(particles);
        });
    }
}

// Load next level with transition
function startLevelTransition() {
    if (gameState === 'playing') {
        gameState = 'levelComplete';
        transitionTime = Date.now();
        createLevelCompleteEffect();
        completedLevel = true;
    }
}

// Draw level complete screen
function drawLevelComplete() {
    const timeSinceComplete = Date.now() - transitionTime;
    let alpha;
    
    if (timeSinceComplete < transitionDuration / 2) {
        // Fade in
        alpha = Math.min(0.7, timeSinceComplete / (transitionDuration / 2));
    } else {
        // Fade out
        alpha = Math.max(0, 0.7 - (timeSinceComplete - transitionDuration / 2) / (transitionDuration / 2));
    }
    
    // Draw background overlay
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw level complete text
    ctx.textAlign = 'center';
    
    // "Level Complete!" text
    ctx.fillStyle = `rgba(76, 175, 80, ${alpha * 1.4})`; // Brighter green
    ctx.font = '60px "Pixelify Sans"';
    const textY = canvas.height / 2 - 40;
    ctx.fillText('Level Complete!', canvas.width / 2, textY);

    // Show score gained
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha * 1.4})`; // Gold color
    ctx.font = '30px "Pixelify Sans"';
    ctx.fillText('+100 POINTS', canvas.width / 2, textY + 50);

    // Show next level message
    if (timeSinceComplete > transitionDuration / 4) {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.4})`;
        ctx.font = '25px "Pixelify Sans"';
        if (currentLevel + 1 >= levels.length) {
            ctx.fillText('Congratulations! Game Complete!', canvas.width / 2, textY + 100);
        } else {
            ctx.fillText('Get Ready for Level ' + (currentLevel + 2) + '!', canvas.width / 2, textY + 100);
        }
    }

    // Reset text alignment
    ctx.textAlign = 'left';

    // Check if transition is complete
    if (timeSinceComplete >= transitionDuration) {
        currentLevel++;
        if (currentLevel >= levels.length) {
            currentLevel = 0;
        }
        resetLevel();
        platforms = levels[currentLevel].platforms;
        score += 100; // Bonus for completing level
        gameState = 'playing';
        completedLevel = false;
    }
}

// Update game logic
function update() {
    if (gameState === 'dying') {
        // Check if death animation is complete
        if (Date.now() - deathAnimationTime > deathAnimationDuration) {
            gameState = 'dead';
        }
    } else if (gameState === 'dead') {
        // Wait for space key to restart
        if (keys.up) {
            gameState = 'playing';
            resetLevel();
            score = Math.max(0, score - 50); // Penalty for dying
        }
        return;
    } else if (gameState === 'levelComplete') {
        return; // Don't update game during level transition
    }

    // Update trail
    updateTrail();

    // Wall slide check
    player.isWallSliding = false;
    player.canWallJump = false;

    // Check for wall collision
    platforms.forEach(platform => {
        // Left wall check
        if (player.x <= platform.x + 1 && 
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height) {
            if (keys.right) { // Only wall slide if pushing towards wall
                player.isWallSliding = true;
                player.wallJumpDirection = -1;
                player.canWallJump = true;
                player.wallJumpTimer = Date.now();
            }
        }
        // Right wall check
        else if (player.x + player.width >= platform.x + platform.width - 1 &&
                 player.x < platform.x + platform.width &&
                 player.y + player.height > platform.y &&
                 player.y < platform.y + platform.height) {
            if (keys.left) { // Only wall slide if pushing towards wall
                player.isWallSliding = true;
                player.wallJumpDirection = 1;
                player.canWallJump = true;
                player.wallJumpTimer = Date.now();
            }
        }
    });

    // Allow wall jump for a brief moment after leaving wall
    if (!player.isWallSliding && 
        Date.now() - player.wallJumpTimer < player.wallJumpDelay) {
        player.canWallJump = true;
    }

    // Horizontal movement with smooth acceleration
    if (keys.left) {
        player.velocityX = Math.max(player.velocityX - 1, -player.speed);
    } else if (keys.right) {
        player.velocityX = Math.min(player.velocityX + 1, player.speed);
    } else {
        player.velocityX *= friction;
    }

    // Apply wall slide
    if (player.isWallSliding && player.velocityY > 0) {
        player.velocityY = player.wallSlideSpeed;
    }

    // Wall jump
    if (keys.up && player.canWallJump) {
        player.velocityY = player.wallJumpForce;
        player.velocityX = player.wallJumpDirection * player.speed * 1.5;
        player.isJumping = true;
        player.canWallJump = false;
        
        // Create wall jump effect
        createExplosion(
            player.x + player.width/2,
            player.y + player.height/2,
            '255, 255, 255' // White particles for wall jump
        );
    }

    player.x += player.velocityX;

    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Update enemies
    updateEnemies();

    // Check platform collisions
    let onPlatform = false;
    platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            // Collision from above
            if (player.velocityY > 0 && 
                player.y + player.height - player.velocityY <= platform.y) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
                onPlatform = true;
            }
            // Collision from below
            else if (player.velocityY < 0 && 
                     player.y >= platform.y + platform.height) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
            // Side collisions
            else {
                if (player.x < platform.x) {
                    player.x = platform.x - player.width;
                    player.velocityX = 0;
                } else {
                    player.x = platform.x + platform.width;
                    player.velocityX = 0;
                }
            }
        }
    });

    // Check coin collisions
    coins.forEach(coin => {
        if (!coin.collected && checkCollision(player, coin)) {
            coin.collected = true;
            score += 10;
            
            // Check if level is complete
            if (!completedLevel && checkLevelComplete()) {
                startLevelTransition();
            }
        }
    });

    // Jumping
    if (keys.up && !player.isJumping && onPlatform) {
        player.velocityY = player.jumpForce;
        player.isJumping = true;
    }

    // Keep player in bounds
    if (player.x < 0) {
        player.x = 0;
        player.velocityX = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
        player.velocityX = 0;
    }
    if (player.y < 0) {
        player.y = 0;
        player.velocityY = 0;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw trail
    trail.forEach(segment => segment.draw(ctx));

    // Draw enemies
    enemies.forEach(enemy => {
        if (enemy.isAlive) {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });

    // Draw coins
    coins.forEach(coin => {
        if (!coin.collected) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Update and draw particles
    updateParticles();

    // Only draw player if not dead
    if (gameState === 'playing' || gameState === 'levelComplete') {
        ctx.fillStyle = player.isWallSliding ? '#FF8C00' : player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Draw score and level
    ctx.fillStyle = '#000000';
    ctx.font = '20px "Pixelify Sans"';
    ctx.fillText('Score: ' + score, 20, 30);
    ctx.fillText('Level: ' + (currentLevel + 1), 20, 60);

    // Draw death screen if dying or dead
    if (gameState === 'dying' || gameState === 'dead') {
        drawDeathScreen();
    }

    // Draw level complete screen if transitioning
    if (gameState === 'levelComplete') {
        drawLevelComplete();
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop(); 