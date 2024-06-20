const EventEmitter = require('events');

const [_nodePath, _filePath, firstArg, secondArg, operation] = process.argv;
const whiteListOperation = ['add', 'diff', 'div', 'multiply'];

const calcEmmiter = new EventEmitter();

calcEmmiter.on(operation, (firstArg, secondArg) => {
  let func;
  let result;
  if (whiteListOperation.includes(operation)) {
    func = require(`./${operation}.js`);
  } else {
    calcEmmiter.emit('result', `Введите одну ииз операций - ${whiteListOperation}`);
    return;
  }

  try {
    result = func[operation](firstArg, secondArg);
    calcEmmiter.emit('result', result);
  } catch (e) {
    calcEmmiter.emit('result', e.message);
    return;
  }
});

calcEmmiter.on('result', (result) => {
  console.log(result);
});

calcEmmiter.emit(operation, +firstArg, +secondArg);
