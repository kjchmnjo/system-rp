const SUPABASE_URL = 'https://TWOJE_ID.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_Qy_e6UKTPyFhb17sUez4LQ_E3TLC2f1o_969cc4821a364177247738096350d7503487c674'; 

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Funkcja pomocnicza: zmienia Nick na format udający email
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

    if (error) alert("Błąd: Nieprawidłowy login lub hasło.");
    else window.location.reload();
};

// REJESTRACJA
document.getElementById('register-btn').onclick = async () => {
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;

    if (login.length < 3) return alert("Login za krótki!");

    const { data, error } = await supabase.auth.signUp({
        email: formatEmail(login),
        password: pass,
        options: { data: { display_name: login } } // Zapisujemy prawdziwy nick
    });

    if (error) alert("Błąd: " + error.message);
    else alert("Konto stworzone! Możesz się zalogować.");
};

// WYLOGOWANIE
document.getElementById('logout-btn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.reload();
};

// SPRAWDZANIE SESJI
async function check() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        document.getElementById('guest-view').style.display = 'none';
        document.getElementById('user-view').style.display = 'block';
        
        // Wyświetlamy nick (wycinamy go z udawanego maila)
        const userLogin = session.user.email.split('@')[0];
        document.getElementById('display-nick').innerText = userLogin;
    }
}
check();
