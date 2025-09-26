// Menu mobile toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Smooth scrolling pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des barres de compétences
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current);
        }, 16);
    });
}

// Observer pour les animations au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animer les compétences lorsque la section est visible
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            
            // Animer les statistiques lorsque la section est visible
            if (entry.target.id === 'about') {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observer les sections pour les animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animation des éléments avec délai
function animateWithDelay(elements, animationClass, delay) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Appliquer les animations avec délai
document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments de compétences avec délai
    const skillCategories = document.querySelectorAll('.skill-category');
    animateWithDelay(skillCategories, 'animate-slide-up', 200);
    
    // Animation des éléments de timeline avec délai
    const timelineItems = document.querySelectorAll('.timeline-content');
    animateWithDelay(timelineItems, 'animate-fade-in', 300);
    
    // Animation des éléments de contact avec délai
    const contactItems = document.querySelectorAll('.contact-item');
    animateWithDelay(contactItems, 'animate-bounce-in', 150);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Formulaire de contact avec boîte de dialogue stylisée
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulation d'envoi (remplacer par un vrai traitement)
    console.log('Formulaire soumis:', { name, email, subject, message });
    
    // Afficher la boîte de dialogue de confirmation stylisée
    showConfirmationDialog();
    
    // Réinitialiser le formulaire
    this.reset();
});

// Fonction pour afficher la boîte de dialogue de confirmation
function showConfirmationDialog() {
    // Créer l'élément de la boîte de dialogue
    const dialog = document.createElement('div');
    dialog.id = 'confirmation-dialog';
    dialog.innerHTML = `
        <div class="dialog-overlay"></div>
        <div class="dialog-content">
            <div class="dialog-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Nachricht gesendet!</h3>
            <p>Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.</p>
            <button class="dialog-close-btn">OK</button>
        </div>
    `;
    
    // Ajouter la boîte de dialogue au body
    document.body.appendChild(dialog);
    
    // Animation d'apparition
    setTimeout(() => {
        dialog.classList.add('active');
    }, 10);
    
    // Fermer la boîte de dialogue en cliquant sur le bouton
    const closeBtn = dialog.querySelector('.dialog-close-btn');
    closeBtn.addEventListener('click', () => {
        closeDialog(dialog);
    });
    
    // Fermer la boîte de dialogue en cliquant sur l'overlay
    const overlay = dialog.querySelector('.dialog-overlay');
    overlay.addEventListener('click', () => {
        closeDialog(dialog);
    });
    
    // Fermer avec la touche Echap
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeDialog(dialog);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Fonction pour fermer la boîte de dialogue
function closeDialog(dialog) {
    dialog.classList.remove('active');
    setTimeout(() => {
        if (dialog.parentNode) {
            dialog.parentNode.removeChild(dialog);
        }
    }, 300);
}


// Effet de parallaxe pour la section hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Animation au chargement de la page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animation d'entrée pour le contenu principal
    setTimeout(() => {
        document.querySelector('.hero-text h1').classList.add('animate-fade-in');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.hero-text h2').classList.add('animate-slide-up');
        document.querySelector('.hero-text p').classList.add('animate-slide-up');
    }, 600);
    
    setTimeout(() => {
        document.querySelector('.hero-buttons').classList.add('animate-slide-up');
    }, 900);
});

// Animation de la photo de profil au hover
const profileImage = document.querySelector('.profile-hero-img');
if (profileImage) {
    profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
    });
}

// Animation des cartes de compétences
const skillCards = document.querySelectorAll('.skill-category');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Changement de couleur active de la navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});