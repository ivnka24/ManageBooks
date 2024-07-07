function reserveAlphabet(str) {
  let letters = str.match(/[a-zA-Z]+/g);
  let numbers = str.match(/\d+/g);
  if (letters && letters.length > 0) {
    let reversedLetters = letters[0].split("").reverse().join("");

    let result = reversedLetters + (numbers ? numbers[0] : "");
    return result;
  } else {
    return str;
  }
}
let result = reserveAlphabet("NEIGE1");
console.log(result);
