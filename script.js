import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJoJjugpKxRm-kfWm_BaSuDzdF2YyPQZE",
    authDomain: "primerp-login.firebaseapp.com",
    projectId: "primerp-login",
    storageBucket: "primerp-login.firebasestorage.app",
    messagingSenderId: "137742617587",
    appId: "1:137742617587:web:be0b0cd85411f555f4a086",
    measurementId: "G-S27SYQM1KM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wymuszenie wylogowania przy odświeżeniu
signOut(auth);

const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userScreen = document.getElementById('user-view');

const hideAll = () => {
    startScreen.style.display = 'none';
    loginScreen.style.display = 'none';
    userScreen.style.display = 'none';
};

document.getElementById('go-to-login').onclick = () => {
    hideAll();
    loginScreen.style.display = 'block';
};

document.getElementById('go-to-start').onclick = () => {
    hideAll();
    startScreen.style.display = 'block';
};

document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    if(!login || !pass) return alert("Wpisz dane!");
    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, login.toLowerCase().trim() + "@primerp.pl", pass);
    } catch (e) {
        alert("Błąd logowania!");
    }
};

document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => location.reload());
};

onAuthStateChanged(auth, (user) => {
    hideAll();
    if (user) {
        userScreen.style.display = 'flex'; // Zmienione na flex dla układu z sidebarem
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        startScreen.style.display = 'block';
    }
});
