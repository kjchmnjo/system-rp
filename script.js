import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
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

const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userScreen = document.getElementById('user-view');

// Przełączanie widoków
document.getElementById('go-to-login').onclick = () => {
    startScreen.style.display = 'none';
    loginScreen.style.display = 'block';
};

document.getElementById('go-to-start').onclick = () => {
    loginScreen.style.display = 'none';
    startScreen.style.display = 'block';
};

const formatEmail = (login) => login.toLowerCase().trim() + "@primerp.pl";

// Logowanie
document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    try {
        await signInWithEmailAndPassword(auth, formatEmail(login), pass);
    } catch (e) { alert("Błąd logowania!"); }
};

// Rejestracja
document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    try {
        await createUserWithEmailAndPassword(auth, formatEmail(login), pass);
        alert("Konto stworzone!");
    } catch (e) { alert("Błąd: " + e.message); }
};

// Wylogowanie
document.getElementById('logout-btn').onclick = () => signOut(auth);

// Obsługa sesji
onAuthStateChanged(auth, (user) => {
    if (user) {
        startScreen.style.display = 'none';
        loginScreen.style.display = 'none';
        userScreen.style.display = 'block';
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        userScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }
});
