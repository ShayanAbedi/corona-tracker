const url = "https://covid19.mathdro.id/api";
export const callApi = async () => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return {
      confirmed: json.confirmed.value,
      recovered: json.recovered.value,
      deaths: json.deaths.value,
      lastUpdated: json.lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getCountries = async (selected) => {
  try {
    const res = await fetch(`${url}/countries`);
    const json = await res.json();
    return json.countries;
  } catch (error) {
    console.log(error);
  }
};
