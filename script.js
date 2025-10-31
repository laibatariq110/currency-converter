const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultText = document.getElementById("result");

window.addEventListener("load", getCurrencies);
form.addEventListener("submit", convertCurrency);

async function getCurrencies() {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/PKR");
    const data = await response.json();

    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach(currency => {
        const option1 = document.createElement("option");
        option1.textContent = currency;
        option1.value = currency;
        fromSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.textContent = currency;
        option2.value = currency;
        toSelect.appendChild(option2);
    })
}

async function convertCurrency(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (amount < 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const rate = data.rates[toCurrency];

    const convertedAmount = (amount * rate).toFixed(2);

    resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}