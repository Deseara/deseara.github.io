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

function staggerReveal(selector, { baseDelay = 300, step = 90 } = {}) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, baseDelay + (index * step));
    });
}

staggerReveal('.link-button');
staggerReveal('.project-card', { baseDelay: 450, step: 120 });

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

