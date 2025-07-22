
const axios = require('axios');
const { default: axiosRetry } = require('axios-retry');

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR'
  }
});

axiosRetry(tmdbApi, { 
    retries: 3,
    retryDelay: (retryCount) => {
        console.log(`Tentativa de requisição #${retryCount} falhou. Tentando novamente em ${retryCount}s...`);
        return retryCount * 1000; 
    },
    retryCondition: (error) => {
        if (!error.response) {
            return true; 
        }
        return error.response.status >= 500;
    }
});

module.exports = tmdbApi;
