import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } 
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

// WYMUSZENIE BRAKU AUTOMATYCZNEGO LOGOWANIA
// Czyścimy sesję przy każdym odświeżeniu strony
signOut(auth); 

const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userScreen = document.getElementById('user-view');

const hideAll = () => {
    startScreen.style.display = 'none';
    startScreen.classList.remove('active');
    loginScreen.style.display = 'none';
    loginScreen.classList.remove('active');
    userScreen.style.display = 'none';
};

document.getElementById('go-to-login').onclick = () => {
    hideAll();
    loginScreen.style.display = 'block';
    loginScreen.classList.add('active');
};

document.getElementById('go-to-start').onclick = () => {
    hideAll();
    startScreen.style.display = 'block';
    startScreen.classList.add('active');
};

const formatEmail = (login) => login.toLowerCase().trim() + "@primerp.pl";

document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    
    if(!login || !pass) return alert("Wpisz dane!");

    try {
        // Ustawiamy trwałość sesji tylko na czas trwania karty przeglądarki
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, formatEmail(login), pass);
    } catch (e) {
        alert("Błędny login lub hasło!");
    }
};

document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    if(pass.length < 6) return alert("Hasło min. 6 znaków!");
    try {
        await createUserWithEmailAndPassword(auth, formatEmail(login), pass);
        alert("Konto stworzone! Teraz możesz się zalogować.");
        hideAll();
        startScreen.style.display = 'block';
        startScreen.classList.add('active');
    } catch (e) {
        alert("Błąd rejestracji.");
    }
};

document.getElementById('logout-btn').onclick = () => {
    signOut(auth).then(() => {
        location.reload(); // Przeładowanie strony po wylogowaniu dla pewności
    });
};

onAuthStateChanged(auth, (user) => {
    hideAll();
    if (user) {
        userScreen.style.display = 'flex';
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        startScreen.style.display = 'block';
        startScreen.classList.add('active');
    }
});
