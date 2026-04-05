import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// ELEMENTY UI
const heroSec = document.getElementById('hero-section');
const authSec = document.getElementById('auth-section');
const dashSec = document.getElementById('dashboard-section');
const errorMsg = document.getElementById('auth-error');

// NAWIGACJA
document.getElementById('trigger-login').onclick = () => {
    heroSec.classList.remove('active');
    authSec.classList.add('active');
};

document.getElementById('back-to-hero').onclick = () => {
    authSec.classList.remove('active');
    heroSec.classList.add('active');
    errorMsg.innerText = "";
};

// LOGOWANIE
document.getElementById('login-execute').onclick = async () => {
    const login = document.getElementById('login-input').value.trim();
    const pass = document.getElementById('password-input').value;

    if(!login || !pass) {
        errorMsg.innerText = "Wprowadź wszystkie dane!";
        return;
    }

    // Jeśli wpiszesz "Jan_Kowalski", system zaloguje "jan_kowalski@wirtualnysystemrp.pl"
    const email = login.includes('@') ? login : `${login.toLowerCase()}@wirtualnysystemrp.pl`;
    errorMsg.style.color = "var(--gold)";
    errorMsg.innerText = "Trwa autoryzacja...";

    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        errorMsg.style.color = "#ff4444";
        errorMsg.innerText = "Błąd: Niepoprawny login lub hasło.";
        console.error(error.code);
    }
};

// WYLOGOWANIE
document.getElementById('logout-btn').onclick = () => signOut(auth);

// MONITOR STANU ZALOGOWANIA
onAuthStateChanged(auth, (user) => {
    if (user) {
        heroSec.classList.remove('active');
        authSec.classList.remove('active');
        dashSec.classList.add('active');
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        dashSec.classList.remove('active');
        heroSec.classList.add('active');
    }
});
