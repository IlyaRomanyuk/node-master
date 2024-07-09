#!/usr/bin/env node
import { getArgs } from './helpers/index.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue } from './services/storage.service.js';
import { getCoordinates, getWeather } from './services/api.service.js';
import { IWeatherData } from './types/interfaces.js';
import { ValueOfParam } from './types/types.js';
import { TokenDictionary } from './types/enums.js';

const saveToken = async (token: ValueOfParam) => {
  if (typeof token === 'boolean') return;

  if (!token.length) {
    printError('Токен не передан');
    return;
  }
  try {
    await saveKeyValue(TokenDictionary.TOKEN, token);
    printSuccess('Токен сохранен успешно');
  } catch (e: unknown) {
    if (e instanceof Error) printError(e.message);
  }
};

const saveCity = async (city: ValueOfParam) => {
  if (typeof city === 'boolean') return;

  if (!city.length) {
    printError('Город не передан');
    return;
  }
  try {
    await saveKeyValue(TokenDictionary.CITY, city);
    printSuccess('Город сохранен успешно');
  } catch (e: unknown) {
    if (e instanceof Error) printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const city: string = process.env.CITY ?? (await getKeyValue(TokenDictionary.CITY));
    const [coordinates] = await getCoordinates(city);
    const weather: IWeatherData = await getWeather(coordinates.lat, coordinates.lon);
    printWeather(weather);
  } catch (e: unknown) {
    const errorWithResponse = e as Error & { response: { status: number } };
    if (errorWithResponse?.response?.status == 404) {
      printError('Неверно указан город');
    } else if (errorWithResponse?.response?.status == 401) {
      printError('Неверно указан токен');
    } else if (errorWithResponse?.response?.status == 400) {
      printError('Неверные координаты');
    } else {
      printError(errorWithResponse.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.c) {
    return saveCity(args.c);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

initCLI();
