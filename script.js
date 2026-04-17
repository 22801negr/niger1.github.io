// JavaScript для интерактивности сайта Декстер

// Функция для эффекта крови в custom-блоке
function toggleBloodEffect() {
    const bloodEffect = document.getElementById('bloodEffect');
    const btn = document.querySelector('.custom-btn');
    
    if (bloodEffect.classList.contains('active')) {
        bloodEffect.classList.remove('active');
        btn.textContent = 'Показать кровь';
    } else {
        bloodEffect.classList.add('active');
        btn.textContent = 'Скрыть кровь';
        
        // Автоматически скрыть через 3 секунды
        setTimeout(() => {
            bloodEffect.classList.remove('active');
            btn.textContent = 'Показать кровь';
        }, 3000);
    }
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Обработка формы
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Простая валидация
        if (!name || !email) {
            alert('Пожалуйста, заполните обязательные поля (Имя и Email)');
            return;
        }
        
        // Имитация отправки формы
        alert(`Спасибо, ${name}! Ваша заявка успешно отправлена. Мы свяжемся с вами по адресу ${email} в ближайшее время.`);
        
        // Очистка формы
        this.reset();
    });
}

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию ко всем карточкам и элементам
document.querySelectorAll('.advantage-card, .character-card, .gallery-item, .timeline-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Изменение шапки при скролле
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.98), rgba(15, 15, 15, 0.98))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--secondary-color), var(--bg-dark))';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// Добавление эффекта параллакса для главного экрана
const hero = document.querySelector('.hero');
const heroOverlay = document.querySelector('.hero-overlay');

if (hero && heroOverlay) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < hero.offsetHeight) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Счётчик статистики с анимацией
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Запуск анимации счётчиков когда они появляются на экране
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(number)) {
                const suffix = text.replace(/\d/g, '');
                entry.target.dataset.suffix = suffix;
                animateValue(entry.target, 0, number, 2000);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Эффект при наведении на кнопки соцсетей
document.querySelectorAll('.social-btn, .social-link, .footer-social a').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Консольное сообщение для разработчиков
console.log('%c DEXTER FAN SITE ', 'background: #8B0000; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Создано с любовью для фанатов сериала ', 'color: #8B0000; font-size: 14px;');
console.log('%c Today\'s going to be a bloody day! ', 'color: #ff0000; font-size: 16px; font-weight: bold;');

// Готовность документа
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт полностью загружен и готов к работе!');
    
    // Добавляем класс loaded для body
    document.body.classList.add('loaded');
});
