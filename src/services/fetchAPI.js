const url = 'https://economia.awesomeapi.com.br/json/all';

const getAllCurrencies = async () => {
  const response = await fetch(url);
  const resp = await response.json();
  delete resp.USDT;

  const currencies = Object.keys(resp);

  return currencies;
};

export default getAllCurrencies;
