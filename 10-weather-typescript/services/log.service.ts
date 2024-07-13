import chalk from 'chalk';
import dedent from 'dedent-js';

import { IWeatherData } from '../types/interfaces';

const printError = (error: string) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
};

const printSuccess = (message: string) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

const printHelp = (): void => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`,
  );
};

const printWeather = (res: IWeatherData) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`,
  );
};

export { printError, printSuccess, printHelp, printWeather };
