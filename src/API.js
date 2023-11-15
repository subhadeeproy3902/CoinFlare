let Data = {
  data: {},
};

const Api = "fca_live_4Ka3OKfnfQ97tWuSLuWtTDckmAk0Dh43C0hiy55Y";
const Url = `https://api.freecurrencyapi.com/v1/latest?apikey=${Api}`;

const fetchAPI = async() => {
  try {
    const response = await fetch(Url);
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    Data = { data: data.data };
} catch {
    console.error("Eroror");
}
};

export { Data, fetchAPI }