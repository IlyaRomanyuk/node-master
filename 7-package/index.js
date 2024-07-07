const notifier = require('node-notifier');
const path = require('path');

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

  setTimeout(() => {
    notifier.notify({
      title: 'Таймер сработал',
      message: `Таймер сработал спустя: ${totalSeconds} c.`,
      icon: path.join(__dirname, 'test.jpg'),
      sound: true,
      wait: true,
      function(err, response, metadata) {
        // Это коллбэк-функция, которая вызывается после взаимодействия с уведомлением
        console.log('Ответ:', response);
        console.log('Метаданные:', metadata);
        if (err) {
          console.error(err);
        } else {
          console.log('Ответ:', response);
          console.log('Метаданные:', metadata);
        }
      },
    });

    notifier.on('click', function (notifierObject, options, event) {
      console.log('Уведомление было кликнуто');
    });

    // Обработчик события закрытия уведомления
    notifier.on('timeout', function (notifierObject, options) {
      console.log('Уведомление было закрыто автоматически по истечении времени.');
    });
  }, totalSeconds * 1000);
};

setTimer(time);
