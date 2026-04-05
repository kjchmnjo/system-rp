export const showSection = (id) => {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(`${id}-section`);
    target.style.display = (id === 'dashboard') ? 'flex' : 'flex';
    target.classList.add('active');
};

export const updateNick = (email) => {
    const nick = email.split('@')[0].toUpperCase();
    document.getElementById('display-nick').innerText = nick;
};

export const showError = (msg) => {
    document.getElementById('auth-error').innerText = msg;
};
