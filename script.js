document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const billAmountInput = document.getElementById('bill-amount');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const numberOfPeopleInput = document.getElementById('number-of-people');
    const tipAmountDisplay = document.getElementById('tip-amount-per-person');
    const totalAmountDisplay = document.getElementById('total-amount-per-person');
    const resetButton = document.getElementById('reset-btn');

    // --- State Variables ---
    let billAmount = 0.0;
    let tipPercentage = 0;
    let numberOfPeople = 1;

    // --- Functions ---

    /**
     * Calculates the tip and total amount per person and updates the UI.
     */
    function calculateAndDisplay() {
        // Prevent division by zero
        if (numberOfPeople < 1) {
            return;
        }

        // Calculate tip per person
        const tipTotal = billAmount * (tipPercentage / 100);
        const tipPerPerson = tipTotal / numberOfPeople;

        // Calculate total per person
        const totalBill = billAmount + tipTotal;
        const totalPerPerson = totalBill / numberOfPeople;

        // Update the UI with formatted currency values
        tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    /**
     * Handles the selection of a tip button.
     * @param {Event} event - The click event from the button.
     */
    function handleTipSelection(event) {
        // Remove 'active' class from all tip buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        const selectedButton = event.target;
        selectedButton.classList.add('active');
        
        // Update state and recalculate
        tipPercentage = parseFloat(selectedButton.dataset.tip);
        calculateAndDisplay();
    }

    /**
     * Resets the calculator to its initial state.
     */
    function resetCalculator() {
        billAmountInput.value = '';
        numberOfPeopleInput.value = '1';
        tipButtons.forEach(btn => btn.classList.remove('active'));

        billAmount = 0.0;
        tipPercentage = 0;
        numberOfPeople = 1;

        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
    }

    // --- Event Listeners ---

    // Listen for input on the bill amount field
    billAmountInput.addEventListener('input', (event) => {
        billAmount = parseFloat(event.target.value) || 0;
        calculateAndDisplay();
    });

    // Listen for input on the number of people field
    numberOfPeopleInput.addEventListener('input', (event) => {
        numberOfPeople = parseInt(event.target.value, 10) || 1;
        // Ensure at least one person
        if (numberOfPeople < 1) {
            numberOfPeopleInput.value = 1;
            numberOfPeople = 1;
        }
        calculateAndDisplay();
    });

    // Add click listeners to all tip buttons
    tipButtons.forEach(button => {
        button.addEventListener('click', handleTipSelection);
    });

    // Listen for clicks on the reset button
    resetButton.addEventListener('click', resetCalculator);
});