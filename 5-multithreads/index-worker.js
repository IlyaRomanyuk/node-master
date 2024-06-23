const { performance, PerformanceObserver } = require('perf_hooks');
const { Worker } = require('worker_threads');
const os = require('os');

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ['measure'] });

// ###1 Заполнение массива

const arrayNumbers = [];

for (let i = 1; i <= 300000; i++) {
  arrayNumbers.push(i);
}

// ###1

// ###2 Разделение на кол-во массивов, равному чмслу ядер

function splitArray(array, parts) {
  let result = [];
  let length = Math.ceil(array.length / parts);

  for (let i = 0; i < parts; i++) {
    result.push(array.slice(i * length, (i + 1) * length));
  }

  return result;
}

const dividedArray = splitArray(arrayNumbers, os.cpus().length);

// ###2

// ###3 Запуск воркера

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    });

    worker.on('message', (msg) => {
      resolve(msg);
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', () => {
      console.log(`Завершил работу`);
    });
  });
};

// ###3

const main = async (dividedArray) => {
  performance.mark('start');

  const result = await Promise.all(dividedArray.map((arr) => compute(arr)));
  const flatArr = result.reduce((acc, value) => (acc = [...acc, ...value]), []);
  performance.mark('end');
  performance.measure('worker', 'start', 'end');

  return flatArr.length;
};

main(dividedArray).then((result) => {
  console.log(result);
});
