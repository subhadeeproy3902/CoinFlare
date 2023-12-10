let Data = {
  data: {},
};

const Api = import.meta.env.VITE_APP_API_KEY;
const Api_Url = import.meta.env.VITE_APP_URL;
const Url = `${Api_Url}?apikey=${Api}`;

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