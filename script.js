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

function switchCard(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
        from.style.display = 'none';
        to.style.display = 'block';
        setTimeout(() => to.classList.add('active'), 50);
    }, 400);
}

document.getElementById('go-to-login').onclick = () => switchCard(startScreen, loginScreen);
document.getElementById('go-to-start').onclick = () => switchCard(loginScreen, startScreen);

const formatEmail = (login) => login.toLowerCase().trim() + "@primerp.pl";

document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    try {
        await signInWithEmailAndPassword(auth, formatEmail(login), pass);
    } catch (e) { alert("Błąd autoryzacji: Niepoprawne dane."); }
};

document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    if(pass.length < 6) return alert("Hasło musi mieć min. 6 znaków.");
    try {
        await createUserWithEmailAndPassword(auth, formatEmail(login), pass);
        alert("Konto utworzone pomyślnie!");
    } catch (e) { alert("Błąd: " + e.message); }
};

document.getElementById('logout-btn').onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
    if (user) {
        startScreen.style.display = 'none';
        loginScreen.style.display = 'none';
        userScreen.style.display = 'block';
        userScreen.classList.add('active');
        document.getElementById('display-nick').innerText = user.email.split('@')[0].toUpperCase();
    } else {
        userScreen.classList.remove('active');
        setTimeout(() => {
            userScreen.style.display = 'none';
            startScreen.style.display = 'block';
            setTimeout(() => startScreen.classList.add('active'), 50);
        }, 400);
    }
});
