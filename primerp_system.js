/**
 * PRIMERP - System Zgłoszeń i Obsługi Błędów
 */

const PrimerpSystem = {
    // 1. KONFIGURACJA I STAN
    settings: {
        minChars: 10,
        cooldownTime: 30000, // 30 sekund przerwy między zgłoszeniami
        lastSent: 0
    },

    // 2. INICJALIZACJA
    init() {
        this.cacheDOM();
        this.bindEvents();
        console.log("System zgłoszeń Primerp gotowy.");
    },

    // 3. POBRANIE ELEMENTÓW
    cacheDOM() {
        this.form = document.getElementById('reportForm');
        this.typeSelect = document.getElementById('issueType');
        this.descInput = document.getElementById('issueDesc');
        this.submitBtn = document.getElementById('submitReport');
        this.statusMsg = document.getElementById('statusMsg');
    },

    // 4. ZDARZENIA
    bindEvents() {
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleReport();
            });
        }
    },

    // 5. LOGIKA ZGŁASZANIA BŁĘDU
    handleReport() {
        const now = Date.now();
        const type = this.typeSelect.value;
        const description = this.descInput.value.trim();

        // Walidacja spamu (cooldown)
        if (now - this.settings.lastSent < this.settings.cooldownTime) {
            const wait = Math.ceil((this.settings.cooldownTime - (now - this.settings.lastSent)) / 1000);
            this.showMessage(`Proszę odczekać ${wait}s przed kolejnym zgłoszeniem.`, 'error');
            return;
        }

        // Walidacja treści
        if (description.length < this.settings.minChars) {
            this.showMessage(`Opis jest za krótki! (min. ${this.settings.minChars} znaków)`, 'error');
            return;
        }

        // Symulacja wysyłania (np. do bazy danych lub Discord Webhook)
        this.sendData({
            type,
            description,
            timestamp: new Date().toISOString(),
            user: "Gracz_Primerp" // Tutaj można podpiąć system logowania
        });
    },

    async sendData(payload) {
        this.submitBtn.disabled = true;
        this.submitBtn.innerText = "Wysyłanie...";

        // Symulujemy opóźnienie sieci
        setTimeout(() => {
            console.log("Wysłano zgłoszenie:", payload);
            
            this.showMessage("Zgłoszenie zostało wysłane pomyślnie!", "success");
            this.descInput.value = ""; // Czyszczenie pola
            this.settings.lastSent = Date.now();
            this.submitBtn.disabled = false;
            this.submitBtn.innerText = "Zgłoś błąd";
        }, 1500);
    },

    // 6. POWIADOMIENIA UI
    showMessage(text, status) {
        this.statusMsg.innerText = text;
        this.statusMsg.style.color = status === 'success' ? '#4ade80' : '#f87171';
        
        // Ukryj wiadomość po 5 sekundach
        setTimeout(() => {
            this.statusMsg.innerText = "";
        }, 5000);
    }
};

// Uruchomienie
document.addEventListener('DOMContentLoaded', () => PrimerpSystem.init());
