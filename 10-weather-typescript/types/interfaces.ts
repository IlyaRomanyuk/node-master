export interface IWeatherMainData {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface IWeatherWindData {
  speed: number;
}

export interface IWeatherDescriptionData {
  description: string;
}

export interface IWeatherData {
  name: string;
  weather: IWeatherDescriptionData[];
  main: IWeatherMainData;
  wind: IWeatherWindData;
}
