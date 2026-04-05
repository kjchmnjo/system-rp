// Konfiguracja Twojej bazy danych
const SUPABASE_URL = 'https://TWOJE_ID.supabase.co'; // Wklej swój URL z Settings -> API
const SUPABASE_ANON_KEY = 'sb_publishable_Qy_e6UKTPyFhb17sUez4LQ_E3TLC2f1o_969cc4821a364177247738096350d7503487c674'; 

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Obsługa przycisku logowania
document.getElementById('login-btn').onclick = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            // redirectTo musi zgadzać się z tym, co wpisałeś w panelu Supabase!
            redirectTo: 'https://wirtualnysystemrp.pl' 
        }
    });
    if (error) alert("Błąd połączenia: " + error.message);
};

// Obsługa wylogowania
document.getElementById('logout-btn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.reload();
};

// Funkcja sprawdzająca czy jesteś już zalogowany
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        const user = session.user.user_metadata;
        document.getElementById('guest-view').style.display = 'none';
        document.getElementById('user-view').style.display = 'block';
        
        document.getElementById('user-name').innerText = user.full_name || user.custom_claims?.global_name;
        document.getElementById('user-avatar').src = user.avatar_url;
    }
}

checkUser();
