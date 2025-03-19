const API_KEY = "2NFkSv2AVnmF3akthFLbiPYqyHe2wp";
const API_URL = `https://www.amdoren.com/api/currency.php?api_key=${API_KEY}`;

export const getCurrency = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};
