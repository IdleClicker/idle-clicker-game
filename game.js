let money = parseFloat(localStorage.getItem("money")) || 0;
let incomePerSecond = parseFloat(localStorage.getItem("income")) || 0;
let upgradeCost = parseFloat(localStorage.getItem("upgradeCost")) || 10;
let prestigePoints = parseFloat(localStorage.getItem("prestigePoints")) || 0;
let multiplier = parseFloat(localStorage.getItem("multiplier")) || 1;

function updateUI() {
    document.getElementById("money").innerText = money.toFixed(2);
    document.getElementById("incomePerSecond").innerText = incomePerSecond.toFixed(2);
    document.getElementById("prestigePoints").innerText = prestigePoints.toFixed(0);
    document.getElementById("multiplier").innerText = multiplier.toFixed(2);
    document.getElementById("upgradeCost").innerText = upgradeCost.toFixed(2);
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
    if (money >= 100) {
        prestigePoints += 1;
        money = 0;
        incomePerSecond = 0;
        upgradeCost = 10;
        multiplier = 1 + prestigePoints * 0.1;
        saveGame();
        updateUI();
    }
}

function resetGame() {
    localStorage.clear();
    money = 0;
    incomePerSecond = 0;
    upgradeCost = 10;
    prestigePoints = 0;
    multiplier = 1;
    updateUI();
}

function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("income", incomePerSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("prestigePoints", prestigePoints);
    localStorage.setItem("multiplier", multiplier);
}

function autoEarnings() {
    money += (incomePerSecond / 10) * multiplier;
    updateUI();
    saveGame();
}

setInterval(autoEarnings, 100);

// Language Support
const translations = {
    en: {
        title: "Idle Clicker Game",
        moneyText: "Money: ",
        incomeText: "Income per second: ",
        prestigeText: "Prestige Points: ",
        multiplierText: "Multiplier: ",
        earnBtn: "Click to Earn",
        upgradeBtn: "Buy Upgrade (Cost: ",
        prestigeBtn: "Prestige",
        resetBtn: "Reset Game",
        version: "Version: 1.1.1"
    },
    es: {
        title: "Juego Idle Clicker",
        moneyText: "Dinero: ",
        incomeText: "Ingreso por segundo: ",
        prestigeText: "Puntos de Prestigio: ",
        multiplierText: "Multiplicador: ",
        earnBtn: "Hacer Dinero",
        upgradeBtn: "Comprar Mejora (Costo: ",
        prestigeBtn: "Prestigio",
        resetBtn: "Reiniciar Juego",
        version: "Versión: 1.1.1"
    },
    fr: {
        title: "Jeu Idle Clicker",
        moneyText: "Argent: ",
        incomeText: "Revenu par seconde: ",
        prestigeText: "Points de Prestige: ",
        multiplierText: "Multiplicateur: ",
        earnBtn: "Gagner de l'argent",
        upgradeBtn: "Acheter une Amélioration (Coût: ",
        prestigeBtn: "Prestige",
        resetBtn: "Réinitialiser le Jeu",
        version: "Version: 1.1.1"
    }
};

function changeLanguage() {
    let selectedLang = document.getElementById("language").value;
    document.getElementById("title").innerText = translations[selectedLang].title;
    document.getElementById("moneyText").innerText = translations[selectedLang].moneyText + money.toFixed(2);
    document.getElementById("incomeText").innerText = translations[selectedLang].incomeText + incomePerSecond.toFixed(2);
    document.getElementById("prestigeText").innerText = translations[selectedLang].prestigeText + prestigePoints;
    document.getElementById("multiplierText").innerText = translations[selectedLang].multiplierText + multiplier.toFixed(2);
    document.getElementById("earnBtn").innerText = translations[selectedLang].earnBtn;
    document.getElementById("upgradeBtn").innerText = translations[selectedLang].upgradeBtn + upgradeCost.toFixed(2) + ")";
    document.getElementById("prestigeBtn").innerText = translations[selectedLang].prestigeBtn;
    document.getElementById("resetBtn").innerText = translations[selectedLang].resetBtn;
}

// Load saved game state
updateUI();
