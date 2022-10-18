import inquirer from 'inquirer';
import axios from 'axios';

const amountValidator = (amount: number) => isNaN(amount) ? "Invalid Amount" : true
const api = "https://api.exchangerate-api.com/v4/latest/USD";
const questions = [
  {
    type: 'number',
    name: 'amount',
    message: 'Please Enter Amount : ',
    validator: amountValidator
  },
  {
    type:'list',
    name: 'from',
    message: 'From : ',
    choices: ["USD","AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","KZT","MVR","MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","UYU","ZAR"]
  },
  {
    type:'list',
    name: 'to',
    message: 'To : ',
    choices: ["USD","AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","KZT","MVR","MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","UYU","ZAR"]
  }
]

const questionAgain = [
  {
    type:'confirm',
    name: 'qAgain',
    message: 'Would you like to perform operation again? '
  }
]
function askAgain(){
  inquirer
  .prompt(questionAgain)
  .then((answers) => {
    if(answers.qAgain){
      currencyConverter();
    }else{
      console.log('*****Thank you for using our application*****')
    }

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('Something went wrong')
    }
  });
}
function currencyConverter(){
  inquirer
  .prompt(questions)
  .then((answers) => {
    console.log('Please wait.....')
    axios.get(api)
      .then((response:any) => {
        //console.log(response);
        let fromRate = response.data.rates[answers.from];
        let toRate = response.data.rates[answers.to];
        let priceAfterConversion = ((toRate / fromRate) * answers.amount).toFixed(2);
        console.log(`${answers.amount} ${answers.from} = ${priceAfterConversion} ${answers.to}`)

        askAgain();
      })
      .catch((error:any) => {
        console.log(error);
        askAgain();
    });
    // fetch(`${api}`)
    //   .then((currency: { json: () => any; }) => {
    //       return currency.json();
    //   }).then((currency: any)=>{
    //     console.log(currency)
    //   });
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log(error)
      console.log('Something went wrong')
    }
  });
}

currencyConverter();