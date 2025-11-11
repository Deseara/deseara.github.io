window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

const avatar = document.getElementById('avatar');
avatar.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
});

avatar.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
});

avatar.addEventListener('click', function() {
    createConfetti();
});
const links = document.querySelectorAll('.link-button');
links.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        link.style.transition = 'all 0.5s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
    }, 300 + (index * 100));
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let letterIndex = 0;
const letterSequence = ['Z','V'];

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createFallingLetter() {
    const colors = [
        '#ffffff', 
        '#0039a6', 
        '#d52b1e'  
    ];
    
    const letter = document.createElement('div');
    letter.textContent = letterSequence[letterIndex];
    letterIndex = (letterIndex + 1) % letterSequence.length; 
    letter.style.position = 'fixed';
    letter.style.fontSize = (18 + Math.random() * 12) + 'px';
    letter.style.color = colors[Math.floor(Math.random() * colors.length)];
    letter.style.fontWeight = 'bold';
    letter.style.fontFamily = 'monospace';
    letter.style.pointerEvents = 'none';
    letter.style.left = (mouseX + (Math.random() - 0.5) * 40) + 'px';
    letter.style.top = (mouseY + (Math.random() - 0.5) * 20) + 'px';
    letter.style.zIndex = '9998';
    letter.style.opacity = '0.8';
    letter.style.textShadow = '0 0 8px rgba(0, 0, 0, 0.7)';
    
    document.body.appendChild(letter);
    
    const duration = 2000 + Math.random() * 1500;
    const rotation = (Math.random() - 0.5) * 360;
    const drift = (Math.random() - 0.5) * 100;
    
    const animation = letter.animate([
        { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)', 
            opacity: 0.8 
        },
        { 
            transform: `translateY(${window.innerHeight - mouseY + 100}px) translateX(${drift}px) rotate(${rotation}deg)`, 
            opacity: 0 
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => letter.remove();
}

setInterval(createFallingLetter, 100);
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#ffffff', '#0039a6', '#d52b1e'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4a9eff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
});

let keySequence = '';
const targetSequence = 'zov';

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'z' || key === 'o' || key === 'v') {
        keySequence += key;
        if (keySequence.slice(-3) === targetSequence) {
            createConfetti();
            keySequence = '';
        }
    }
});

function createConfetti() {
    const confettiCount = 50;
    const letters = ['Z', 'O', 'V'];
    const colors = ['#ffffff', '#0039a6', '#d52b1e'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = letters[Math.floor(Math.random() * letters.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (20 + Math.random() * 20) + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontWeight = 'bold';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '99999';
            confetti.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
            
            document.body.appendChild(confetti);
            
            const duration = 2000 + Math.random() * 1000;
            const rotation = Math.random() * 720 - 360;
            const drift = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) translateX(${drift}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }, i * 30);
    }
}

const gameModal = document.getElementById('gameModal');
const gameToggle = document.getElementById('gameToggle');
const gameClose = document.getElementById('gameClose');
const restartGame = document.getElementById('restartGame');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;
let gameRunning = false;

gameToggle.addEventListener('click', () => {
    gameModal.style.display = 'block';
    if (!gameRunning) {
        startGame();
    }
});

gameClose.addEventListener('click', () => {
    gameModal.style.display = 'none';
    stopGame();
});

restartGame.addEventListener('click', () => {
    stopGame();
    startGame();
});

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

const virtualKeyboard = document.querySelectorAll('.virtual-keyboard button');
virtualKeyboard.forEach(button => {
    button.addEventListener('click', () => {
        if (!gameRunning) return;
        
        const key = button.getAttribute('data-key');
        switch(key) {
            case 'up':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'down':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'left':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'right':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    });
});

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameRunning = true;
    draw();
    gameLoop = setInterval(updateGame, 100);
}

function stopGame() {
    gameRunning = false;
    clearInterval(gameLoop);
}

function updateGame() {
    if (!gameRunning) return;
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }
    draw();
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4a9eff';
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        if (index === 0) {
            ctx.fillStyle = '#2a7edf';
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            ctx.fillStyle = '#4a9eff';
        }
    });
    ctx.fillStyle = '#d52b1e';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

function gameOver() {
    stopGame();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4a9eff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText(`Счет: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
}
