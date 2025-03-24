const API_KEY = "5c1ccb3b5f6b8f2ff22a37aa17c8d33b";
const API_URL = `http://api.currencylayer.com/convert?access_key=${API_KEY}`;

// Funktion som konverterar en summa från en valuta till en annan
async function convertCurrency(amount, from, to) {
  const url = `${API_URL}&from=${from}&to=${to}&amount=${amount}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_message || "Conversion error");
    }
    return data;
  } catch (error) {
    console.error("Error converting currency:", error);
    throw error;
  }
}

// Funktion som hämtar alla valutor
async function getAllCurrencies() {
  const url = `http://api.currencylayer.com/list?access_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error.info || "Failed to fetch currencies");
    }

    return data.currencies;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return {};
  }
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const amount = document.querySelector("#amount").value;
  const fromcurrency = document.querySelector("#fromCurrency").value;
  const toCurrency = document.querySelector("#toCurrency").value;

  try {
    const conversionData = await convertCurrency(
      amount,
      fromcurrency,
      toCurrency
    );
    document.querySelector(
      "#result"
    ).textContent = `Converted amount: ${conversionData.result}`;
  } catch (error) {
    document.getElementById("result").textContent = "Error converting currency";
    console.error("Error converting currency: ", error);
  }
});

// Nav knapp visar vilken sida är aktiv
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");

  fromCurrencySelect.innerHTML = `<option value="">Select currency</option>`;
  toCurrencySelect.innerHTML = `<option value="">Select currency</option>`;

  const currencies = await getAllCurrencies();

  if (currencies) {
    Object.entries(currencies).forEach(([code, name]) => {
      const option1 = document.createElement("option");
      option1.value = code;
      option1.textContent = `${code} - ${name}`;
      fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = code;
      option2.textContent = `${code} - ${name}`;
      toCurrencySelect.appendChild(option2);
    });
  }
});
