// --- KONFIGURACJA SUPABASE ---
const SUPABASE_URL = 'https://TWOJE_ID.supabase.co'; // PODMIEŃ NA SWÓJ URL!
const SUPABASE_ANON_KEY = 'sb_publishable_Qy_e6UKTPyFhb17sUez4LQ_E3TLC2f1o_969cc4821a364177247738096350d7503487c674'; 

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- PRZEŁĄCZANIE EKRANÓW (FIX) ---
const startScreen = document.getElementById('start-screen');
const loginScreen = document.getElementById('login-screen');
const userScreen = document.getElementById('user-view');

document.getElementById('go-to-login').onclick = () => {
    startScreen.style.display = 'none';
    loginScreen.style.display = 'block';
};

document.getElementById('go-to-start').onclick = () => {
    loginScreen.style.display = 'none';
    startScreen.style.display = 'block';
};

// --- LOGIKA LOGOWANIA ---
function formatEmail(login) {
    return login.toLowerCase().trim() + "@primerp.local";
}

// Logowanie
document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    if (!login || !pass) return alert("Wypełnij dane!");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formatEmail(login),
        password: pass
    });

    if (error) alert("Błąd: Nieprawidłowy login lub hasło.");
    else window.location.reload();
};

// Rejestracja
document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    if (login.length < 3) return alert("Login musi mieć min. 3 znaki!");
    if (pass.length < 6) return alert("Hasło musi mieć min. 6 znaków!");

    const { data, error } = await supabase.auth.signUp({
        email: formatEmail(login),
        password: pass
    });

    if (error) alert("Błąd: " + error.message);
    else alert("Konto stworzone! Możesz się teraz zalogować.");
};

// Wylogowanie
document.getElementById('logout-btn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.reload();
};

// Sprawdzanie sesji przy starcie
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        startScreen.style.display = 'none';
        loginScreen.style.display = 'none';
        userScreen.style.display = 'block';
        
        const nick = session.user.email.split('@')[0];
        document.getElementById('display-nick').innerText = nick.toUpperCase();
    }
}

checkSession();
