import { API_KEY } from '../constants/index';

class Service {
  async getStockSymbols(searchQuery) {
    const searchEndpoint = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${API_KEY}`;
    try {
      const response = await fetch(searchEndpoint, { method: 'GET' });
      return response.json();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async fetchDetails(symbol) {
    const detailsEndpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
    try {
      const response = await fetch(detailsEndpoint, { method: 'GET' });
      return response.json();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async fetchPriceAndChange(symbol) {
    const priceEndpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    try {
      const response = await fetch(priceEndpoint, { method: 'GET' });
      return response.json();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default new Service();
