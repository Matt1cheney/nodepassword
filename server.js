const inquirer = require("inquirer");
// constant for inquirer validate. if the input is less than 8 or greater than 128 to throw error
const validLength= async (input) => {
  // if the input is not a Number, throw an eror
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
  //for final password printout
  _password='';
  // function that executes once when a new instance is made, fired automatically.
  constructor(choicesArr) {
    // calls the calcPassword. passed in the array of selected values
   this.calcPassword(choicesArr)

   this.finalProcess(choicesArr)
  }
  //getter
  get password() {
    return this._password;
  }
  get finalPassword(){
    return this.finalProcess;
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
//I created a funtion to fire the functions above with the choices parameter passed in
  calcPassword(choices) {
  //list of function references
    let randomFunction = {
      uppercase: this.getRandomUpper,
      lowercase: this.getRandomLower,
      numbers: this.getRandomNumber,
      symbols: this.getRandomSymbol
    };
    //temporary placeholder for created password
    let writePassword = "";
    // fire random character functions for the amount of desired length
    for (let i = 0; i < characterAmount; i++) {
      //for the functions randomly(otherwise would traverse index in order of 0,1,2,3)
      let randomIndex= Math.floor(Math.random() * choices.length)

       const randomChosen =  choices[randomIndex]
      writePassword += randomFunction[randomChosen]();
    
    }
    this._password= writePassword;

 
    }
    finalProcess(choicesArr) {
      this._Password
// move the table into a seperate function in class req. choicesArr parameter. call it in constructor after calcPassword.
    console.table(["chosen character length",characterAmount,choicesArr,"your password",this._password],);

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

    const generatedPassword = new Generator(
      response.choices
    );

    generatedPassword.password;
  });
