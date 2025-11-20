document.addEventListener('DOMContentLoaded', () => {
    const bg = document.querySelector('.background-image');
    const statusChip = document.querySelector('[data-rotator]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (bg && !prefersReducedMotion) {
        const updateTransform = (xRatio, yRatio) => {
            const x = (xRatio - 0.5) * 30;
            const y = (yRatio - 0.5) * 20;
            bg.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.12)`;
        };

        document.addEventListener('pointermove', (event) => {
            updateTransform(event.clientX / window.innerWidth, event.clientY / window.innerHeight);
        });

        document.addEventListener('pointerleave', () => {
            bg.style.transform = 'translate3d(0, 0, 0) scale(1.1)';
        });
    }

    if (statusChip) {
        const phrases = [
            'сейчас в онлайне · готов к новым пет-проектам',
            'ловлю идеи · пишу Python / Telegram API',
            'ночные прогулки · omori ost · coding mood'
        ];
        let index = 0;

        setInterval(() => {
            index = (index + 1) % phrases.length;
            statusChip.classList.add('fade-out');
            setTimeout(() => {
                statusChip.textContent = phrases[index];
                statusChip.classList.remove('fade-out');
            }, 200);
        }, 4200);
    }

    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('[data-target]');

    const showSection = (targetName) => {
        sections.forEach(section => {
            section.classList.toggle('is-active', section.dataset.section === targetName);
        });

        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.target === targetName);
        });

        if (history.replaceState) {
            history.replaceState(null, '', `#${targetName}`);
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetName = link.dataset.target;
            showSection(targetName);
        });
    });

    const initialSection = window.location.hash.replace('#', '') || 'home';
    showSection(initialSection);

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
