const [_nodePath, _filePath, firstArg, secondArg, operation] = process.argv;
const whiteListOperation = ['add', 'diff', 'div', 'multiply'];

const calculator = (firstArg, secondArg, operation) => {
  let result;
  let func;

  if (whiteListOperation.includes(operation)) {
    func = require(`./${operation}.js`);
  } else {
    console.error(`Введите одну ииз операций - ${whiteListOperation}`);
    return;
  }

  try {
    result = func[operation](firstArg, secondArg);
  } catch (e) {
    console.error(e.message);
    return;
  }

  return result;

  //   switch (operation) {
  //     case 'add':
  //       const { add } = require('./add.js');
  //       result = add(firstArg, secondArg);
  //       break;
  //     case 'diff':
  //       const { diff } = require('./diff.js');
  //       result = diff(firstArg, secondArg);
  //       break;
  //     case 'multiply':
  //       const { multiply } = require('./multiply.js');
  //       result = multiply(firstArg, secondArg);
  //       break;
  //     case 'div':
  //       const { div } = require('./div.js');
  //       result = div(firstArg, secondArg);
  //       break;
  //     default:
  //       result = 'Invalid operator';
  //   }

  //   return result;
};

console.log(calculator(+firstArg, +secondArg, operation));
