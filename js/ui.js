const heroSec = document.getElementById('hero-section');
const authSec = document.getElementById('auth-section');
const dashSec = document.getElementById('dashboard-section');

export const showSection = (sectionId) => {
    // Ukrywamy wszystko
    heroSec.style.display = 'none';
    authSec.style.display = 'none';
    dashSec.style.display = 'none';

    // Pokazujemy wybraną sekcję
    if(sectionId === 'hero') {
        heroSec.style.display = 'flex';
        heroSec.classList.add('active');
    }
    if(sectionId === 'auth') {
        authSec.style.display = 'flex';
        authSec.classList.add('active');
    }
    if(sectionId === 'dash') {
        dashSec.style.display = 'flex'; // Flex dla dashboardu (sidebar + main)
        dashSec.classList.add('active');
    }
};

export const updateNick = (email) => {
    // Formatujemy nick: wycinamy @wirtualnysystemrp.pl i robimy duże litery
    const nick = email.split('@')[0].toUpperCase();
    document.getElementById('display-nick').innerText = nick;
};

// Dodajemy obsługę kliknięć w menu boczne
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.classList.contains('logout')) return;
        
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Tutaj można dodać logikę zmiany treści w .dash-content-area
        console.log("Zmiana kategorii na: " + this.dataset.target);
    });
});
