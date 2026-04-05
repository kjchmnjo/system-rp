import { auth } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { loginUser, logoutUser } from "./auth.js";
import { showSection, updateNick, showError } from "./ui.js";

document.getElementById('trigger-login').onclick = () => showSection('auth');
document.getElementById('back-to-hero').onclick = () => showSection('hero');
document.getElementById('logout-btn').onclick = () => logoutUser();

document.getElementById('login-execute').onclick = async () => {
    const login = document.getElementById('login-input').value.trim();
    const pass = document.getElementById('password-input').value;
    if(!login || !pass) return showError("Wypełnij pola!");
    
    const result = await loginUser(login, pass);
    if(!result.success) showError("Błędne dane logowania.");
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        showSection('dashboard');
        updateNick(user.email);
    } else {
        showSection('hero');
    }
});
