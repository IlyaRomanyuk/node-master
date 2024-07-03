export const weatherResponse = (data) => {
  const resultObj = {
    title: `Температура в городе: ${data.name}`,
    description: `Оценка погоды: ${data.weather[0].description}`,
    temp: `Температура ${data.main.temp}, ощущается как ${data.main.feels_like}`,
    wind: `Средний ветер ${data.wind.speed}`,
  };

  return resultObj;
};
