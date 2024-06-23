const { performance, PerformanceObserver } = require('perf_hooks');

const arrayNumbers = [];

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ['measure'] });

for (let i = 1; i <= 300000; i++) {
  arrayNumbers.push(i);
}

const main = (arrayNumbers) => {
  performance.mark('start');

  const result = [];
  arrayNumbers.forEach((number) => {
    if (number % 3 === 0) {
      result.push(number);
    }
  });

  performance.mark('end');
  performance.measure('test', 'start', 'end');
  return result.length;
};

console.log(main(arrayNumbers));
