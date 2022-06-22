const url = 'https://economia.awesomeapi.com.br/json/all';

const getAllCurrencies = async () => {
  const response = await fetch(url);
  const resp = await response.json();

  return resp;
};

export default getAllCurrencies;
