// Konfiguracja Twojego Supabase
const SUPABASE_URL = 'https://TWOJE_ID.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_Qy_e6UKTPyFhb17sUez4LQ_E3TLC2f1o_969cc4821a364177247738096350d7503487c674'; 

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Nawigacja między oknami
function showLogin() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

function showStart() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

// Funkcja pomocnicza do formatowania loginu na maila
function formatEmail(login) {
    return login.toLowerCase().trim() + "@primerp.local";
}

// LOGOWANIE
document.getElementById('login-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formatEmail(login),
        password: pass
    });

    if (error) alert("Błąd: Niepoprawny login lub hasło.");
    else window.location.reload();
};

// REJESTRACJA
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
    else alert("Konto stworzone pomyślnie! Teraz możesz się zalogować.");
};

// WYLOGOWANIE
document.getElementById('logout-btn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.reload();
};

// SPRAWDZANIE SESJI (Czy gracz już jest zalogowany)
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('user-view').style.display = 'block';
        
        const nick = session.user.email.split('@')[0];
        document.getElementById('display-nick').innerText = nick.toUpperCase();
    }
}

checkSession();
