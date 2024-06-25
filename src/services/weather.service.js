import axios from 'axios';
import config from '../../config.js';

const getRainProbability = async (location) => {
    const API_KEY = config.WEATHERAPI_KEY;

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: API_KEY,
                q: location,
                days: 1 // Obtenemos el pronóstico para el día actual
            }
        });

        if (response.data) {
            const forecast = response.data.forecast.forecastday[0]; // Obtenemos el primer día de pronóstico

            // Extraemos la probabilidad de lluvia
            const rainProbability = forecast.day.daily_chance_of_rain || 0;
            console.log(rainProbability)
            return rainProbability;
        } else {
            throw new Error('Error en la API WeatherAPI');
        }
    } catch (error) {
        throw new Error(`Error al obtener la probabilidad de lluvia: ${error.message}`);
    }
};

export default getRainProbability;
