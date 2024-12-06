

class WaterTracker {
    
    static DAILY_GOAL = 2000;

    constructor() {
        
        this.waterAmountInput = document.getElementById('water-amount');
        this.addWaterBtn = document.getElementById('add-water-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.waterLogElement = document.getElementById('water-log');
        this.currentIntakeElement = document.getElementById('current-intake');
        this.waterFillElement = document.getElementById('water-fill');

        
        this.totalIntake = 0;

        
        this.addWaterBtn.addEventListener('click', () => this.addWater());
        this.resetBtn.addEventListener('click', () => this.resetTracker());
    }

    
    addWater() {
        const amount = parseInt(this.waterAmountInput.value);

        
        if (isNaN(amount) || amount <= 0) {
            this.showError('Please enter a valid water amount.');
            return;
        }

        
        if (amount > 1000) {
            this.showError('Water amount seems too high. Please check your input.');
            return;
        }

        this.totalIntake += amount;
        this.updateDisplay(amount);
        this.waterAmountInput.value = '';
    }

    
    updateDisplay(amount) {
        
        this.currentIntakeElement.textContent = this.totalIntake;

       
        const progressPercentage = Math.min((this.totalIntake / WaterTracker.DAILY_GOAL) * 100, 100);
        this.waterFillElement.style.width = `${progressPercentage}%`;

       
        const logEntry = document.createElement('li');
        logEntry.innerHTML = `
            <strong>Added:</strong> ${amount} ml 
            <span style="color: #666;">(Total: ${this.totalIntake} ml)</span>
        `;
        this.waterLogElement.prepend(logEntry);

        
        this.updateProgressColor(progressPercentage);
    }

    
    resetTracker() {
        
        const confirmReset = confirm('Are you sure you want to reset your water intake?');
        
        if (confirmReset) {
            this.totalIntake = 0;
            this.currentIntakeElement.textContent = '0';
            this.waterFillElement.style.width = '0%';
            this.waterLogElement.innerHTML = '';
            this.waterFillElement.style.backgroundColor = '#3b82f6';
        }
    }

    
    showError(message) {
        alert(message);
        this.waterAmountInput.focus();
    }

    
    updateProgressColor(percentage) {
        if (percentage < 50) {
            this.waterFillElement.style.backgroundColor = '#3b82f6'; // Blue
        } else if (percentage < 75) {
            this.waterFillElement.style.backgroundColor = '#22c55e'; // Green
        } else if (percentage < 100) {
            this.waterFillElement.style.backgroundColor = '#eab308'; // Yellow
        } else {
            this.waterFillElement.style.backgroundColor = '#ef4444'; // Red
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new WaterTracker();
});