import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TWOJA KONFIGURACJA FIREBASE (Wklej ją tutaj)
const firebaseConfig = {
    apiKey: "TWÓJ_KLUCZ",
    authDomain: "TWÓJ_PROJEKT.firebaseapp.com",
    projectId: "TWÓJ_PROJEKT",
    storageBucket: "TWÓJ_PROJEKT.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementy DOM
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loader = document.getElementById('loader');

// Ukrywanie loadera po załadowaniu
window.onload = () => loader.style.display = 'none';

// Logowanie
document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password) return alert("Uzupełnij pola!");

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert("Błąd logowania: Sprawdź dane.");
        console.error(error);
    }
};

// Wylogowanie
document.getElementById('logout-btn').onclick = () => signOut(auth);

// Monitorowanie stanu użytkownika
onAuthStateChanged(auth, (user) => {
    if (user) {
        authSection.style.display = 'none';
        dashboardSection.style.display = 'flex';
        document.getElementById('user-email').innerText = user.email;
    } else {
        authSection.style.display = 'flex';
        dashboardSection.style.display = 'none';
    }
});
