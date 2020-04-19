const mainUrl = "https://covid19.mathdro.id/api";
const countriesUrl = "https://covid19.mathdro.id/api/countries";
export const callApi = async () => {
  try {
    const res = await fetch(mainUrl);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
export const getCountries = async () => {
  try {
    const res = await fetch(countriesUrl);
    const json = await res.json();
    return json.countries;
  } catch (error) {
    console.log(error);
  }
};
