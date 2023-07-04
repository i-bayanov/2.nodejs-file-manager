export function parseArgs(argsString) {
  const resultArray = [];
  let str = argsString;

  while (str.length) {
    const testResult = str[0].match(/["'`]/);

    if (testResult) {
      const quote = testResult[0];
      const closingRE = new RegExp(`${quote}(?:\\s|$)`);
      const nextArgTestResult = str.match(closingRE);

      if (!nextArgTestResult) throw new Error('Invalid input');

      resultArray.push(str.slice(1, nextArgTestResult.index));

      str = str.slice(nextArgTestResult.index + 2);
    } else {
      const indexOfSpace = str.indexOf(' ');

      if (indexOfSpace === -1) {
        resultArray.push(str);
        str = '';
      } else {
        resultArray.push(str.slice(0, indexOfSpace));
        str = str.slice(indexOfSpace + 1);
      }
    }
  }

  return resultArray;
}
