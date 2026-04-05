// Importy z CDN dla GitHub Pages
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJoJjugpKxRm-kfWm_BaSuDzdF2YyPQZE",
  authDomain: "primerp-login.firebaseapp.com",
  projectId: "primerp-login",
  storageBucket: "primerp-login.firebasestorage.app",
  messagingSenderId: "137742617587",
  appId: "1:137742617587:web:be0b0cd85411f555f4a086",
  measurementId: "G-S27SYQM1KM"
};

// Inicjalizacja
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementy interfejsu (UI)
const heroSec = document.getElementById('hero-section');
const authSec = document.getElementById('auth-section');
const dashSec = document.getElementById('dashboard-section');

// --- LOGIKA NAWIGACJI ---

// Przejście z wyboru do logowania
document.getElementById('trigger-login').onclick = () => {
    heroSec.classList.remove('active');
    authSec.classList.add('active');
};

// Powrót z logowania do wyboru
document.getElementById('back-to-hero').onclick = () => {
    authSec.classList.remove('active');
    heroSec.classList.add('active');
};

// --- LOGIKA FIREBASE ---

// Funkcja logowania
document.getElementById('login-execute').onclick = async () => {
    const emailField = document.getElementById('email').value;
    const passField = document.getElementById('password').value;
    
    // Jeśli gracz wpisuje tylko nick, automatycznie dodajemy domenę
    const fullEmail = emailField.includes('@') ? emailField : `${emailField.toLowerCase().trim()}@wirtualnysystemrp.pl`;

    try {
        await signInWithEmailAndPassword(auth, fullEmail, passField);
    } catch (err) {
        console.error(err);
        alert("Błąd: Nieprawidłowy login lub hasło.");
    }
};

// Funkcja wylogowania
document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => {
        window.location.reload();
    });
};

// Monitor stanu zalogowania
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Użytkownik zalogowany - pokaż dashboard
        heroSec.classList.remove('active');
        authSec.classList.remove('active');
        dashSec.classList.add('active');
        
        // Wyświetlanie nazwy użytkownika (wycinamy z maila)
        const nick = user.email.split('@')[0].toUpperCase();
        document.getElementById('user-name').innerText = nick;
    } else {
        // Użytkownik wylogowany - pokaż ekran główny
        dashSec.classList.remove('active');
        heroSec.classList.add('active');
    }
});
