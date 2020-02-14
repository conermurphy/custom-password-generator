let password = '';

const allCharacters = {
  lowerLetters: 'abcdefghijklmnopqrstuvwxyz',
  get upperLetters() {
    return this.lowerLetters.toUpperCase();
  },
  numbers: '0123456789',
  // eslint-disable-next-line quotes
  symbols: `"'!#@?/,.<>{}[]`
};

// variables to control what is allowed in the password
const allControlVars = {
  length: 50,
  allowLowerLetters: true,
  allowUpperLetters: true,
  allowDupLetters: false,
  allowNumbers: true,
  allowSymbols: true
};


const genPwdOptions = (characters, controlVars) => {
  let pwdCharString = '';
  const pwdOptions = [];
  const controlArray = Object.entries(controlVars);


  for (let i = 0; i < controlArray.length; i++) {
    if (controlArray[i][1] === true) {
      pwdOptions.push(controlArray[i][0]);
    }
  }

  // console.log(pwdOptions);
  pwdOptions.map((option) => {
    switch (option) {
      case 'allowLowerLetters':
        pwdCharString += characters.lowerLetters;
        break;
      case 'allowUpperLetters':
        pwdCharString += characters.upperLetters;
        break;
      case 'allowNumbers':
        pwdCharString += characters.numbers;
        break;
      case 'allowSymbols':
        pwdCharString += characters.symbols;
        break;
      default:
        // console.log('do nothing as no options selected.');
    }
  });

  // console.log(pwdCharString);
  return pwdCharString;
};

const pwdGen = () => {
  let nextChar;
  let lastChar;
  const pwdCharacters = genPwdOptions(allCharacters, allControlVars);

  for (let i = 0; i < allControlVars.length; i++) {
    // console.log(allControlVars.length);
    nextChar = pwdCharacters.charAt(Math.floor(Math.random() * pwdCharacters.length));
    lastChar = password.slice(-1);

    if (allControlVars.allowDupLetters) {
      password += nextChar;
    } else if (nextChar !== lastChar) {
      if (allControlVars.allowLowerLetters && allControlVars.allowUpperLetters) {
        if ((allCharacters.lowerLetters.includes(nextChar) || allCharacters.upperLetters.includes(nextChar)) && (allCharacters.lowerLetters.includes(lastChar) || allCharacters.upperLetters.includes(lastChar))) {
          if (nextChar.toLowerCase() === lastChar.toLowerCase()) {
            console.log(`dup letter has been found, lastChar: ${lastChar} and nextChar: ${nextChar}`);
          } else {
            password += nextChar;
          }
        } else {
          password += nextChar;
        }
      } else {
        password += nextChar;
      }
    } else {
      console.log(`dup char has been found, lastChar: ${lastChar} and nextChar: ${nextChar}`);
    }
  }
};

pwdGen();

console.log(password);
