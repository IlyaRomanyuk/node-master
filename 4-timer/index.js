const [_nodePath, _filePath, time] = process.argv;

const setTimer = (time) => {
  let totalSeconds = 0;

  const entries = time.split(' ');

  entries.forEach((item) => {
    if (item.includes('h')) {
      totalSeconds = totalSeconds + parseInt(item) * 3600;
    }

    if (item.includes('m')) {
      totalSeconds = totalSeconds + parseInt(item) * 60;
    }

    if (item.includes('s')) {
      totalSeconds = totalSeconds + parseInt(item);
    }
  });

  console.log(totalSeconds);

  setTimeout(() => {
    console.log(`Таймер сработал спустя: ${totalSeconds} c.`);
  }, totalSeconds * 1000);
};

setTimer(time);
