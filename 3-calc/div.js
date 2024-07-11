function div(firstArg, secondArg) {
  if (secondArg === 0) {
    throw new Error('Деление на ноль запрещено');
  }
  return firstArg / secondArg;
}

module.exports = { div };
