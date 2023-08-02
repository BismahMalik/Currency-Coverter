async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const oldCurrency = document.getElementById("oldCurrency").value;
    const newCurrency = document.getElementById("newCurrency").value;

    const response = await fetch('/convertcurrency', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, oldCurrency, newCurrency })
    });

    const results = await response.json();

    if (!response.ok) {
        document.getElementById("result").innerHTML = "<h4>Currency not found</h4>";
    } else {
        document.getElementById("result").innerHTML = `<br>${amount} ${results.old_currency} equals <br><h1>${results.new_amount}<br>${results.new_currency}</h1>`;
    }
}