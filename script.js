import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Elementy DOM
const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userScreen = document.getElementById('user-view');

// Nawigacja
document.getElementById('go-to-login').onclick = () => {
    startScreen.style.display = 'none';
    loginScreen.style.display = 'block';
};

document.getElementById('go-to-start').onclick = () => {
    loginScreen.style.display = 'none';
    startScreen.style.display = 'block';
};

// Formatowanie loginu na format email (wymóg Firebase)
const formatEmail = (login) => login.toLowerCase().trim() + "@primerp.pl";

// LOGOWANIE
document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    if (!login || !pass) return alert("Wypełnij wszystkie pola!");

    try {
        await signInWithEmailAndPassword(auth, formatEmail(login), pass);
    } catch (error) {
        alert("Błąd: Nieprawidłowy login lub hasło.");
    }
};

// REJESTRACJA
document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    if (pass.length < 6) return alert("Hasło musi mieć min. 6 znaków!");

    try {
        await createUserWithEmailAndPassword(auth, formatEmail(login), pass);
        alert("Konto założone! Teraz możesz się zalogować.");
    } catch (error) {
        alert("Błąd rejestracji: " + error.message);
    }
};

// WYLOGOWANIE
document.getElementById('logout-btn').onclick = () => {
    signOut(auth);
};

// MONITOROWANIE STANU SESJI
onAuthStateChanged(auth, (user) => {
    if (user) {
        startScreen.style.display = 'none';
        loginScreen.style.display = 'none';
        userScreen.style.display = 'block';
        
        const nick = user.email.split('@')[0];
        document.getElementById('display-nick').innerText = nick.toUpperCase();
    } else {
        userScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }
});
