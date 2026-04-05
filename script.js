import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJoJjugpKxRm-kfWm_BaSuDzdF2YyPQZE",
    authDomain: "primerp-login.firebaseapp.com",
    projectId: "primerp-login",
    storageBucket: "primerp-login.firebasestorage.app",
    messagingSenderId: "137742617587",
    appId: "1:137742617587:web:be0b0cd85411f555f4a086"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// WYMUSZENIE RĘCZNEGO LOGOWANIA
signOut(auth);

const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userView = document.getElementById('user-view');
const authContainer = document.getElementById('auth-container');

// FUNKCJA NAPRAWIAJĄCA PRZEŁĄCZANIE
const showScreen = (screen) => {
    startScreen.classList.remove('active');
    loginScreen.classList.remove('active');
    
    // Używamy setTimeout, aby animacja i display: block zadziałały poprawnie
    setTimeout(() => {
        screen.classList.add('active');
    }, 50);
};

// Nawigacja
document.getElementById('go-to-login-btn').onclick = () => showScreen(loginScreen);
document.getElementById('back-to-start').onclick = () => showScreen(startScreen);

// Logowanie
document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    
    if(!login || !pass) return alert("Wpisz dane!");

    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, `${login.toLowerCase().trim()}@primerp.pl`, pass);
    } catch (e) {
        alert("Błąd: Nieprawidłowy login lub hasło.");
    }
};

document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => window.location.reload());
};

// Monitor stanu sesji
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        userView.style.display = 'flex';
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        authContainer.style.display = 'flex';
        userView.style.display = 'none';
        showScreen(startScreen);
    }
});
