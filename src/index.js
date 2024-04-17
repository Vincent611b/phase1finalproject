document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    // Fetch list of currencies
    fetch('https://v6.exchangerate-api.com/v6/2c5c0051aa1926a6e5f14c44/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.textContent = currency;
                fromCurrencySelect.appendChild(option);
                toCurrencySelect.appendChild(option.cloneNode(true));
            });
        });

    // Event listener for convert button
    convertBtn.addEventListener('click', () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = amountInput.value;
        fetch(`https://v6.exchangerate-api.com/v6/2c5c0051aa1926a6e5f14c44/pair/${fromCurrency}/${toCurrency}/${amount}`)
            .then(response => response.json())
            .then(data => {
                const conversionResult = data.conversion_result;
                resultDiv.textContent = `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error converting currency. Please try again later.';
            });
    });
});
