// In-memory game state (no localStorage)
let gameState = {
    money: 0,
    incomePerSecond: 0,
    prestigePoints: 0,
    multiplier: 1,
    upgradeCost: 10,
    lastSaveTime: Date.now(),
    totalClicks: 0
};

// Format large numbers
function formatNumber(num) {
    if (num < 1000) return num.toFixed(2);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(2) + 'B';
    return (num / 1000000000000).toFixed(2) + 'T';
}

// Calculate prestige cost (scales with prestige points)
function calculatePrestigeCost() {
    return Math.floor(1000 * Math.pow(2, gameState.prestigePoints));
}

// Calculate prestige bonus
function calculatePrestigeBonus() {
    return 0.5 + (gameState.prestigePoints * 0.1);
}

// Update all UI elements
function updateUI() {
    document.getElementById("money").innerText = formatNumber(gameState.money);
    document.getElementById("income").innerText = formatNumber(gameState.incomePerSecond);
    document.getElementById("prestige").innerText = gameState.prestigePoints;
    document.getElementById("multiplier").innerText = `${gameState.multiplier.toFixed(1)}x`;
    document.getElementById("upgrade-cost").innerText = formatNumber(gameState.upgradeCost);
    document.getElementById("click-value").innerText = formatNumber(1 * gameState.multiplier);

    const prestigeCost = calculatePrestigeCost();
    const prestigeBonus = calculatePrestigeBonus();
    document.getElementById("prestige-cost").innerText = formatNumber(prestigeCost);
    document.getElementById("prestige-bonus").innerText = prestigeBonus.toFixed(1);

    // Update button states
    const upgradeBtn = document.getElementById("upgrade-btn");
    upgradeBtn.disabled = gameState.money < gameState.upgradeCost;

    const prestigeBtn = document.getElementById("prestige-btn");
    prestigeBtn.disabled = gameState.money < prestigeCost;

    // Update progress bars
    updateProgressBars();
}

// Update progress bars
function updateProgressBars() {
    // Upgrade progress
    const upgradeProgress = Math.min((gameState.money / gameState.upgradeCost) * 100, 100);
    document.getElementById("upgrade-progress").style.width = upgradeProgress + '%';
    document.getElementById("upgrade-progress-text").innerText = 
        upgradeProgress >= 100 ? 'Ready to upgrade!' : `${upgradeProgress.toFixed(0)}% to next upgrade`;

    // Prestige progress
    const prestigeCost = calculatePrestigeCost();
    const prestigeProgress = Math.min((gameState.money / prestigeCost) * 100, 100);
    document.getElementById("prestige-progress").style.width = prestigeProgress + '%';
    document.getElementById("prestige-progress-text").innerText = 
        prestigeProgress >= 100 ? 'Ready to prestige!' : `${prestigeProgress.toFixed(0)}% to prestige`;
}

// Show floating number animation
function showFloatingNumber(value, x, y) {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    floatingNum.innerText = '+' + formatNumber(value);
    floatingNum.style.left = x + 'px';
    floatingNum.style.top = y + 'px';
    document.body.appendChild(floatingNum);

    setTimeout(() => {
        floatingNum.remove();
    }, 1000);
}

// Earn money on click
function earnMoney(event) {
    const earnAmount = 1 * gameState.multiplier;
    gameState.money += earnAmount;
    gameState.totalClicks++;
    
    // Show floating number at click position
    if (event) {
        showFloatingNumber(earnAmount, event.clientX, event.clientY);
    }
    
    updateUI();
}

// Buy upgrade
function buyUpgrade() {
    if (gameState.money >= gameState.upgradeCost) {
        gameState.money -= gameState.upgradeCost;
        gameState.incomePerSecond += 1;
        gameState.upgradeCost = Math.floor(gameState.upgradeCost * 1.5);
        updateUI();
    }
}

// Prestige system
function prestige() {
    const prestigeCost = calculatePrestigeCost();
    if (gameState.money >= prestigeCost) {
        gameState.prestigePoints += 1;
        const bonus = calculatePrestigeBonus();
        gameState.multiplier += bonus;
        gameState.money = 0;
        gameState.incomePerSecond = 0;
        gameState.upgradeCost = 10;
        updateUI();
        alert(`Prestige successful! Your multiplier is now ${gameState.multiplier.toFixed(1)}x`);
    }
}

// Auto earnings
function autoEarnings() {
    gameState.money += (gameState.incomePerSecond / 10) * gameState.multiplier;
    updateUI();
}

// Calculate offline earnings
function calculateOfflineEarnings() {
    const now = Date.now();
    const timeDiff = (now - gameState.lastSaveTime) / 1000; // seconds
    
    // Only give offline earnings if away for more than 10 seconds and have income
    if (timeDiff > 10 && gameState.incomePerSecond > 0) {
        const offlineEarnings = Math.min(timeDiff, 3600) * gameState.incomePerSecond * gameState.multiplier; // Cap at 1 hour
        gameState.money += offlineEarnings;
        
        // Show offline earnings message
        const message = document.getElementById('offline-message');
        message.innerHTML = `<div class="offline-earnings">
            Welcome back! You earned ${formatNumber(offlineEarnings)} while away!
        </div>`;
        
        setTimeout(() => {
            message.innerHTML = '';
        }, 5000);
    }
    
    gameState.lastSaveTime = now;
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset all progress?')) {
        gameState = {
            money: 0,
            incomePerSecond: 0,
            prestigePoints: 0,
            multiplier: 1,
            upgradeCost: 10,
            lastSaveTime: Date.now(),
            totalClicks: 0
        };
        updateUI();
    }
}

// Language translations
const translations = {
    en: { 
        money: "Money", 
        income: "Income per second", 
        prestige: "Prestige Points", 
        multiplier: "Multiplier", 
        version: "Version",
        clickToEarn: "Click to Earn",
        buyUpgrade: "Buy Upgrade",
        prestigeBtn: "Prestige",
        resetGame: "Reset Game"
    },
    es: { 
        money: "Dinero", 
        income: "Ingresos por segundo", 
        prestige: "Puntos de Prestigio", 
        multiplier: "Multiplicador", 
        version: "Versión",
        clickToEarn: "Clic para Ganar",
        buyUpgrade: "Comprar Mejora",
        prestigeBtn: "Prestigio",
        resetGame: "Reiniciar Juego"
    },
    fr: { 
        money: "Argent", 
        income: "Revenu par seconde", 
        prestige: "Points de Prestige", 
        multiplier: "Multiplicateur", 
        version: "Version",
        clickToEarn: "Cliquer pour Gagner",
        buyUpgrade: "Acheter Amélioration",
        prestigeBtn: "Prestige",
        resetGame: "Réinitialiser"
    },
    de: { 
        money: "Geld", 
        income: "Einkommen pro Sekunde", 
        prestige: "Prestige-Punkte", 
        multiplier: "Multiplikator", 
        version: "Version",
        clickToEarn: "Klicken zum Verdienen",
        buyUpgrade: "Upgrade Kaufen",
        prestigeBtn: "Prestige",
        resetGame: "Spiel Zurücksetzen"
    },
    tr: { 
        money: "Para", 
        income: "Saniyede Gelir", 
        prestige: "Prestij Puanları", 
        multiplier: "Çarpan", 
        version: "Sürüm",
        clickToEarn: "Kazanmak için Tıkla",
        buyUpgrade: "Yükseltme Satın Al",
        prestigeBtn: "Prestij",
        resetGame: "Oyunu Sıfırla"
    },
    ru: { 
        money: "Деньги", 
        income: "Доход в секунду", 
        prestige: "Очки Престижа", 
        multiplier: "Множитель", 
        version: "Версия",
        clickToEarn: "Нажмите для Заработка",
        buyUpgrade: "Купить Улучшение",
        prestigeBtn: "Престиж",
        resetGame: "Сбросить Игру"
    }
};

function changeLanguage(lang) {
    document.getElementById("money-display").innerHTML = 
        `${translations[lang].money}: <span id="money">${formatNumber(gameState.money)}</span>`;
    document.getElementById("income-display").innerHTML = 
        `${translations[lang].income}: <span id="income">${formatNumber(gameState.incomePerSecond)}</span>`;
    document.getElementById("prestige-display").innerHTML = 
        `${translations[lang].prestige}: <span id="prestige">${gameState.prestigePoints}</span>`;
    document.getElementById("multiplier-display").innerHTML = 
        `${translations[lang].multiplier}: <span id="multiplier">${gameState.multiplier.toFixed(1)}x</span>`;
    document.getElementById("version").innerText = `${translations[lang].version}: 2.0.0`;
}

// Initialize game
calculateOfflineEarnings();
setInterval(autoEarnings, 100);
setInterval(() => { gameState.lastSaveTime = Date.now(); }, 1000);
updateUI();
document.getElementById("language-select").value = "en";
