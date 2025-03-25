document.addEventListener("DOMContentLoaded", async () => {
    const alphabetContainer = document.getElementById("alphabet-filter");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    alphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.classList.add("filter-btn");
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.addEventListener("click", () => displayCurrencies(letter));
        alphabetContainer.appendChild(btn);
    });

    const manualFlags = {
        "EUR": "https://flagcdn.com/w320/eu.png",  
        "GBP": "https://flagcdn.com/w320/gb.png",  
        "AFN": "https://flagcdn.com/w320/af.png",  
        "AUD": "https://flagcdn.com/w320/au.png",  
        "ILS": "https://flagcdn.com/w320/il.png",  
        "DKK": "https://flagcdn.com/w320/dk.png",  
        "USD": "https://flagcdn.com/w320/us.png"   
    };

    async function fetchCurrencies() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const countries = await response.json();
            let currencies = [];

            countries.forEach(country => {
                if (country.currencies) {
                    for (let code in country.currencies) {
                        const currencyName = country.currencies[code].name;
                        const flagUrl = manualFlags[code] || country.flags?.png || `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;

                        if (!currencies.some(c => c.code === code)) {
                            currencies.push({
                                code,
                                name: currencyName,
                                flag: flagUrl
                            });
                        }
                    }
                }
            });

            currencies.sort((a, b) => a.code.localeCompare(b.code));
            return currencies;
        } catch (error) {
            console.error("Error fetching currency data:", error);
            return [];
        }
    }

    async function displayCurrencies(filterLetter = null) {
        const container = document.getElementById("currency-list");
        container.innerHTML = ""; 
        const currencies = await fetchCurrencies();

        const filteredCurrencies = filterLetter
            ? currencies.filter(currency => currency.code.startsWith(filterLetter))
            : currencies;

        let currentLetter = "";

        filteredCurrencies.forEach(currency => {
            if (currency.code[0] !== currentLetter) {
                currentLetter = currency.code[0];

                const categoryContainer = document.createElement("div");
                categoryContainer.classList.add("category-container");

                const letterHeader = document.createElement("h2");
                letterHeader.textContent = currentLetter;
                letterHeader.classList.add("currency-letter");

                const currencyGroup = document.createElement("div");
                currencyGroup.classList.add("currency-group");

                categoryContainer.appendChild(letterHeader);
                categoryContainer.appendChild(currencyGroup);
                container.appendChild(categoryContainer);
            }

            const currencyCard = document.createElement("div");
            currencyCard.classList.add("currency-card");
            currencyCard.innerHTML = `
                <div class="currency-info">
                    <strong>${currency.code}</strong>
                    <p>${currency.name}</p>
                </div>
                <img src="${currency.flag}" class="flag" alt="${currency.code} Flag">
            `;

            const lastCategory = container.lastElementChild;
            const lastGroup = lastCategory.querySelector(".currency-group");
            lastGroup.appendChild(currencyCard);
        });
    }

    displayCurrencies();
});
