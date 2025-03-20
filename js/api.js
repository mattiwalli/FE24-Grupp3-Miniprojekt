const API_KEY = "2NFkSv2AVnmF3akthFLbiPYqyHe2wp";
const API_URL = `https://www.amdoren.com/api/currency.php?api_key=${API_KEY}`;

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
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching currensies: ", error);
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
    ).textContent = `Converted amount: ${conversionData.amount}`;
  } catch (error) {
    document.getElementById("result").textContent = "Error converting currency";
    console.error("Error converting currency: ", error);
  }
});
