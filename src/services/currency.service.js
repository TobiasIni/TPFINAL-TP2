import axios from 'axios';
import config from '../../config.js';

const getExchangeRate = async (currency) => {
    const API_KEY = config.EXCHANGERATE_API_KEY;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        if (response.data.result === 'success') {
            const rates = response.data.conversion_rates;
            if (rates[currency]) {
                return rates[currency];
            } else {
                throw new Error('Moneda no encontrada');
            }
        } else {
            throw new Error('Error en la respuesta de la API de ExchangeRate');
        }
    } catch (error) {
        throw new Error(`Error al obtener el tipo de cambio: ${error.message}`);
    }
};

export default getExchangeRate;
