const { parentPort, workerData } = require('worker_threads');

const func = ({ array }) => {
  const result = [];
  array.forEach((number) => {
    if (number % 3 === 0) {
      result.push(number);
    }
  });

  return result;
};

parentPort.postMessage(func(workerData));
