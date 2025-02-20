// Load saved game data or set defaults
let money = parseFloat(localStorage.getItem("money")) || 0;
let incomePerSecond = parseFloat(localStorage.getItem("income")) || 0;
let upgradeCost = parseFloat(localStorage.getItem("upgradeCost")) || 10;
let prestigePoints = parseFloat(localStorage.getItem("prestigePoints")) || 0;
let prestigeMultiplier = 1 + prestigePoints * 0.1; // 10% bonus per prestige point

function updateUI() {
    document.getElementById("money").innerText = money.toFixed(2);
    document.getElementById("incomePerSecond").innerText = incomePerSecond.toFixed(2);
    document.getElementById("upgradeCost").innerText = upgradeCost.toFixed(2);
    document.getElementById("prestigePoints").innerText = prestigePoints;
    document.getElementById("prestigeMultiplier").innerText = prestigeMultiplier.toFixed(1) + "x";
}

function earnMoney() {
    money += 1 * prestigeMultiplier;
    updateUI();
    saveGame();
}

function buyUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        incomePerSecond += 1 * prestigeMultiplier;
        upgradeCost *= 1.5; // Increase cost progressively
        updateUI();
        saveGame();
    }
}

function autoEarnings() {
    money += (incomePerSecond / 10); // Earn over time
    updateUI();
}

function prestige() {
    if (money >= 1000) { // Require 1000 money to prestige
        prestigePoints += Math.floor(money / 1000); // Gain 1 point per 1000 money
        prestigeMultiplier = 1 + prestigePoints * 0.1;
        
        // Reset progress but keep prestige points
        money = 0;
        incomePerSecond = 0;
        upgradeCost = 10;

        saveGame();
        updateUI();
    } else {
        alert("You need at least 1000 money to prestige!");
    }
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game? This will erase ALL progress!")) {
        localStorage.clear();
        location.reload();
    }
}

function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("income", incomePerSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("prestigePoints", prestigePoints);
}

// Auto earnings every 100ms
setInterval(autoEarnings, 100);

// Load saved state on page load
updateUI();
