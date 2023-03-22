//#region //o CONSIGNE
// Ecrire une fonction permettant de générere un mot de passe
// inspiré de : https://stackoverflow.com/questions/1497481/javascript-password-generator

// Les paramètres à prendre en entré sont:
// - Longueur du mot de passe finale (number)
// - Integration des majuscules (bool)
// - Integration des nombre de 0 à 9 (bool)
// - Integration des caractères spéciaux ($=+;.!-_§|) (bool)

// Exemple d'utilisation:

//#endregion //o CONSIGNE

//#region //o INIT VARIABLES

let   lengthPassword = 10,
      isUpperCase   = true,
      isNumbers     = true,
      isSpecChar    = true;
let urlGoodRandom  = `https://www.random.org/integers/?num=${lengthPassword}&min=0&max=100&col=1&base=10&format=plain&rnd=new`;

//#endregion //o INIT VARIABLES

//#region //o BLOC INSTRUCTIONS

// document.querySelector('#length').addEventListener("keydown", (e) => {
//   /^[a-zA-Z@&#~'{ ([-|`_),.;/:§!%*¨$¤£²+-/b]+$/.test(e.key) ? e.preventDefault() : console.log("bravo coco") ;
// });
// document.querySelector('#length').addEventListener('change', (e) => {
//   lengthPassword = e.target.value;
// })
// document.querySelector('#upper').addEventListener ('input' , (e) => {
//   e.target.checked ? isUpperCase = true : isUpperCase = false;
// })
// document.querySelector('#number').addEventListener ('input' , (e) => {
//   e.target.checked ? isNumbers = true : isNumbers = false;
// })
// document.querySelector('#special').addEventListener ('input' , (e) => {
//   e.target.checked ? isSpecChar = true : isSpecChar = false;
// })
// document.querySelector('#genPassword').addEventListener ( 'click', () => {
//   urlGoodRandom  = `https://www.random.org/integers/?num=${lengthPassword}&min=0&max=100&col=1&base=10&format=plain&rnd=new`;
//   getGoodRandomNumber(urlGoodRandom)
//     .then((randomNumbers) => {
//       console.log(
//         generatePassword(randomNumbers, isUpperCase, isNumbers, isSpecChar)
//       );
//     })
//     .catch("Nop promesse failed ");

// })

//#endregion //o BLOC INSTRUCTIONS

//#region //o FUNCTIONS

export async function getGoodRandomNumber(urlGoodRandom) {
  const response = await fetch(urlGoodRandom, {
    method : 'GET',
    headers: {
      'Accept'      : 'text/plain',
      'Content-type': 'text/plain'
    }
  });
  if (response.ok === true) { //response type 200
    let   dataNumb = [];
    const dataText = (await response.text()).split("\n");  //str => arr + endSeparator ''
    dataText.pop();  //last index value = '' => pop it
    dataNumb = dataText.map((data) => +data);
    return dataNumb;
  }
  throw new Error("Serveur indisponible");
}

export function generatePassword(
  randomNumbers = [1,1,1,1,1],
  isUpperCase  = true,
  isNumbers    = true,
  isSpecChar   = true
) {
  let   retVal  = "";
  const charset = {
    passwordChar: "",
    lowerCase   : "abcdefghijklmnopqrstuvwxyz",
    upperCase   : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers     : "01234567890123456789",
    special     : "$=+;.!-_§|$=+;.!-_§|"
  };
  
  if (isUpperCase) {
    charset.passwordChar += charset.upperCase;
  }
  if (isNumbers) {
    charset.passwordChar += charset.numbers;
  }
  if (isSpecChar) {
    charset.passwordChar += charset.special;
  }
  charset.passwordChar += charset.lowerCase;
  for (let numb of randomNumbers) {
    retVal += charset.passwordChar.charAt((numb / 100) * charset.passwordChar.length);
  }
  // document.querySelector("#genPassword").textContent = retVal;
  return { value: retVal, length: retVal.length };
}

//#endregion //o FUNCTIONS
