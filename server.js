const inquirer = require("inquirer");
// function definitions
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  let symbols = "!@#$%^&*()_+{}[]<>,.";
  return symbols[Math.floor(Math.random() * 20)];
}
const validLength= async (input)=> {
  if(input < 8 || input > 128 ||typeof input !== 'number' ) {

    throw " invalid length!";
    
    
    
  }
  
  
return true;

}

inquirer
  .prompt([
    {
      name: "characterAmount",
      message:
      "please specify how many characters in your password.(must be between 8 and 128)",
      type:"input",
      validate: validLength,
      
      validate: function( value ) {
        if(value >7 || value <129){
          var valid = !isNaN(parseFloat(value));
          return valid;
        }
        else{
          throw " invalid";
        }
          },
          filter: Number
    
      
      
    
    },

    {
      type: "checkbox",
      message: "please select what will entail in this password.",
      choices: ["uppercase", "lowercase", "numbers", "symbols"],
      name: "choices"
    }
  ])
  .then(function(response) {
    uppercase = response.choices[0];
    lowercase = response.choices[1];
    number = response.choices[2];
    symbols = response.choices[3];
    characterAmount = response.characterAmount;

    // declare generator class
    class generator {
      constructor(uppercase, lowercase, number, symbols) {
        this.uppercase = uppercase;
        this.lowercase = lowercase;
        this.number = number;
        this.symbols = symbols;
      }
      //getter
      get password() {
        return this.calcPassword();
      }

      calcPassword() {
        let randomFunction = {
          uppercase: getRandomUpper,
          lowercase: getRandomLower,
          number: getRandomNumber,
          symbols: getRandomSymbol
        };
        
        let writePassword = "";
        let typesArr = [
          { uppercase },
          { lowercase },
          { number },
          { symbols }
        ];

        for (let i = 0; i < characterAmount; i++) {

          let funcName = Object.keys(
            typesArr[Math.floor(Math.random() * typesArr.length)]
          )[0];

          writePassword += randomFunction[funcName]();
        
        }
        let finalPassword = writePassword.slice(0, characterAmount);
        console.log(finalPassword);

      }
    }

    const generatedPassword = new generator(
      uppercase,
      lowercase,
      number,
      symbols
    );

    generatedPassword.password
  });
