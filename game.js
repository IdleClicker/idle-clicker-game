// Game version
const gameVersion = "1.0.0"; // Update this when you release a new version

// Load saved game state or start fresh
let money = parseFloat(localStorage.getItem("money")) || 0;
let incomePerSecond = parseFloat(localStorage.getItem("income")) || 0;
let upgradeCost = parseFloat(localStorage.getItem("upgradeCost")) || 10;

// Function to update UI instantly
function updateUI() {
    document.getElementById("money").innerText = money.toFixed(2);
    document.getElementById("upgrade-btn").innerText = `Buy Upgrade (Cost: ${upgradeCost.toFixed(2)})`;
}

// Function to earn money when clicking the button
function earnMoney() {
    money += 1;
    updateUI();
    saveGame();
}

// Function to buy an upgrade
function buyUpgrade() {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        incomePerSecond += 1;
        upgradeCost *= 1.5; // Increase cost progressively
        updateUI(); // Immediately update UI so there's no delay
        saveGame();
    }
}

// Function to generate money passively over time
function autoEarnings() {
    money += incomePerSecond / 20; // Earn over time, increased frequency
    updateUI();
}

// Function to save game state in localStorage
function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("income", incomePerSecond);
    localStorage.setItem("upgradeCost", upgradeCost);
}

// Function to reset the game
function resetGame() {
    if (confirm("Are you sure you want to reset the game?")) { // Confirm before resetting
        money = 0;
        incomePerSecond = 0;
        upgradeCost = 10;
        localStorage.clear(); // Clear saved data
        updateUI();
    }
}

// Function to display version number
function updateVersion() {
    document.getElementById("version").innerText = `Version ${gameVersion}`;
}

// Simulate idle earnings every 50ms for smoother updates
setInterval(autoEarnings, 50);

// Wait until the document is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("earn-btn").addEventListener("click", earnMoney);
    document.getElementById("upgrade-btn").addEventListener("click", buyUpgrade);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
    
    updateUI();
    updateVersion();
});
