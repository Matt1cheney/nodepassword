const inquirer = require("inquirer");

const validLength= async (input) => {
  let notValid= isNaN(input);
  if((input < 8 )|| (input > 128)){
    
   throw "invalid entry";
    
    
    
  }
  else if(notValid){
    throw "please enter a number"
  }
  
  return true;
  
}
// declare generator class
class Generator {
  _password='';
  // function that executes once when a new instance is made, fired automatically.
  constructor(choicesArr) {

   this.calcPassword(choicesArr)
  }
  //getter
  get password() {
    return this._password;
  }
// function definitions
getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

 getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
 getRandomSymbol() {
  let symbols = "!@#$%^&*()_+{}[]<>,.";
  return symbols[Math.floor(Math.random() * 20)];
}
  calcPassword(choices) {
  
    let randomFunction = {
      uppercase: this.getRandomUpper,
      lowercase: this.getRandomLower,
      numbers: this.getRandomNumber,
      symbols: this.getRandomSymbol
    };
    console.log(choices,'choicesarr')
    let writePassword = "";
    // let typesArr = [
    //   { uppercase },
    //   { lowercase },
    //   { number },
    //   { symbols }
    // ];
    // filter(
    //   item => Object.values(item)[0]);
    
    for (let i = 0; i < characterAmount; i++) {
      let randomIndex= Math.floor(Math.random() * choices.length)

       const randomChosen =  choices[randomIndex]
      console.log(randomChosen,'randomChoice')
      writePassword += randomFunction[randomChosen]();
    
    }
    this._password= writePassword;
// move the table into a seperate funtion in class req. choicesArr parameter. call it in constructor after calcPassword.
    console.table(["chosen character length",characterAmount,choices,"your password",this._password],);

  }
}

inquirer
  .prompt([
    {
      name: "characterAmount",
      message:
      "please specify how many characters in your password.(must be between 8 and 128)",
      type:"number",
      
      validate: validLength,
      
      // validate: function( value ) {
      //   if(value >7 || value <129){
      //     var valid = !isNaN(parseFloat(value));
      //     return valid;
      //   }
      //   else{
      //     throw " invalid";
      //   }
      //     },
      //     filter: Number
    
      
      
    
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
    console.log('choices', response.choices)
    

    const generatedPassword = new Generator(
      response.choices
    );

    generatedPassword.password;
  });
