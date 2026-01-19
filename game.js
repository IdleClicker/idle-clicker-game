let money = parseFloat(localStorage.getItem("money")) || 0;
let incomePerSecond = parseFloat(localStorage.getItem("income")) || 0;
let prestigePoints = parseFloat(localStorage.getItem("prestige")) || 0;
let multiplier = parseFloat(localStorage.getItem("multiplier")) || 1;
let upgradeCost = 10;

function updateUI() {
    document.getElementById("money").innerText = money.toFixed(2);
    document.getElementById("income").innerText = incomePerSecond.toFixed(2);
    document.getElementById("prestige").innerText = prestigePoints;
    document.getElementById("multiplier").innerText = `${multiplier}x`;
}

function earnMoney() {
    money += 1 * multiplier;
    updateUI();
    saveGame();
}

function buyUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        incomePerSecond += 1;
        upgradeCost *= 1.5;
        saveGame();
    }
}

function prestige() {
    if (money >= 1000) { // Example threshold
        prestigePoints += 1;
        multiplier += 0.5;
        money = 0;
        incomePerSecond = 0;
        saveGame();
    }
}

function autoEarnings() {
    money += (incomePerSecond / 10) * multiplier;
    updateUI();
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("income", incomePerSecond);
    localStorage.setItem("prestige", prestigePoints);
    localStorage.setItem("multiplier", multiplier);
}

setInterval(autoEarnings, 100);
updateUI();

// Language Support
const translations = {
    en: { money: "Money", income: "Income per second", prestige: "Prestige Points", multiplier: "Multiplier", version: "Version" },
    es: { money: "Dinero", income: "Ingresos por segundo", prestige: "Puntos de Prestigio", multiplier: "Multiplicador", version: "Versión" },
    fr: { money: "Argent", income: "Revenu par seconde", prestige: "Points de Prestige", multiplier: "Multiplicateur", version: "Version" },
    de: { money: "Geld", income: "Einkommen pro Sekunde", prestige: "Prestige-Punkte", multiplier: "Multiplikator", version: "Version" }
};

function changeLanguage(lang) {
    document.getElementById("money-display").innerHTML = `${translations[lang].money}: <span id="money">${money}</span>`;
    document.getElementById("income-display").innerHTML = `${translations[lang].income}: <span id="income">${incomePerSecond}</span>`;
    document.getElementById("prestige-display").innerHTML = `${translations[lang].prestige}: <span id="prestige">${prestigePoints}</span>`;
    document.getElementById("multiplier-display").innerHTML = `${translations[lang].multiplier}: <span id="multiplier">${multiplier}x</span>`;
    document.getElementById("version").innerText = `${translations[lang].version}: 1.1.2`;
}

document.getElementById("language-select").value = "en";
