import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Config
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

// Elements
const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userView = document.getElementById('user-view');
const authContainer = document.getElementById('auth-container');

// View Switcher
const switchView = (target) => {
    [startScreen, loginScreen].forEach(el => el.classList.remove('active'));
    target.classList.add('active');
};

document.getElementById('go-to-login').onclick = () => switchView(loginScreen);
document.getElementById('go-to-start').onclick = () => switchView(startScreen);

// Login Logic
document.getElementById('login-btn').onclick = async () => {
    const btn = document.getElementById('login-btn');
    const login = document.getElementById('auth-login').value.trim();
    const pass = document.getElementById('auth-password').value;

    if (!login || !pass) return alert("Uzupełnij wszystkie dane!");

    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> LOGOWANIE...`;
    btn.disabled = true;

    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, `${login.toLowerCase()}@primerp.pl`, pass);
    } catch (error) {
        alert("Błąd: Niepoprawny login lub hasło.");
        btn.innerHTML = "WEJDŹ DO SYSTEMU";
        btn.disabled = false;
    }
};

// Logout Logic
document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => {
        window.location.reload();
    });
};

// Global Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        userView.style.display = 'flex';
        const nick = user.email.split('@')[0].toUpperCase();
        document.getElementById('display-nick').innerText = nick;
        document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${nick}&background=FFC800&color=000`;
    } else {
        authContainer.style.display = 'flex';
        userView.style.display = 'none';
        switchView(startScreen);
    }
});
