import express from 'express';
import axios from 'axios';

import { weatherResponse } from '../services/weather-response.js';

const weatherRouter = express.Router();

weatherRouter.use((req, res, next) => {
  const { city, token } = req.body;

  req.customData = {
    city: city.toLowerCase(),
    token,
  };

  next();
});

weatherRouter.post('/get-weather', async (req, res, next) => {
  try {
    const { city, token } = req.customData;

    if (!token) {
      throw new Error('Token is a require param');
    }

    const { data } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: city,
        limit: 1,
        appid: token,
      },
    });

    const [dataObj] = data;
    const { lat, lon } = dataObj;

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    });
    res.json(weatherResponse(response.data));
  } catch (e) {
    next(e);
  }
});

export { weatherRouter };
