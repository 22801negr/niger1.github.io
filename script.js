document.addEventListener('DOMContentLoaded', () => {
    // === BLOOD CANVAS EFFECT ===
    const bloodBtn = document.getElementById('bloodToggle');
    const canvas = document.getElementById('bloodCanvas');
    const ctx = canvas.getContext('2d');
    let isBloodActive = false;
    let drops = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class BloodDrop {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = Math.random() * 3 + 2;
            this.size = Math.random() * 3 + 1;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 20) {
                this.trail.shift();
            }
            this.y += this.speed;
            
            // Спленшер при ударе о низ
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
                this.trail = [];
            }
        }

        draw() {
            ctx.fillStyle = '#8B0000';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Рисуем след
            for (let i = 0; i < this.trail.length; i++) {
                const point = this.trail[i];
                const alpha = i / this.trail.length;
                ctx.fillStyle = `rgba(139, 0, 0, ${alpha})`;
                ctx.beginPath();
                ctx.arc(point.x, point.y, this.size * alpha, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function animateBlood() {
        if (!isBloodActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        requestAnimationFrame(animateBlood);
    }

    bloodBtn.addEventListener('click', () => {
        isBloodActive = !isBloodActive;
        canvas.classList.toggle('active');
        
        if (isBloodActive) {
            drops = [];
            for (let i = 0; i < 100; i++) {
                drops.push(new BloodDrop());
            }
            animateBlood();
            bloodBtn.innerHTML = '<span class="btn-text">STOP BLOOD</span><div class="btn-drip"></div>';
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bloodBtn.innerHTML = '<span class="btn-text">RELEASE BLOOD</span><div class="btn-drip"></div>';
        }
    });

    // === COUNTER ANIMATION ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer для счетчиков
    const statsSection = document.querySelector('.stats-container');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // === FADE IN ON SCROLL ===
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // === MODAL FOR VIDEO ===
    const galleryItems = document.querySelectorAll('.gallery-item[data-video]');
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.getAttribute('data-video');
            if (videoUrl) {
                videoFrame.src = videoUrl;
                modal.classList.add('active');
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        videoFrame.src = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            videoFrame.src = '';
        }
    });

    // === SMOOTH SCROLL FOR NAV LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === FORM SUBMISSION ===
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Ваши "улики" отправлены. Декстер скоро свяжется с вами...');
            contactForm.reset();
        });
    }

    // === PARALLAX EFFECT FOR HERO ===
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
});
