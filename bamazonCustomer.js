const database = require('./database/config');

const inquirer = require('inquirer');

database.query("SELECT * FROM products", function(err, result){
    if (err) throw err; 
    const productNames = [];
    for(let i = 0; i < result.length; i++){
        console.log("ID: " + result[i].id + " PRODUCT: " + result[i].product + " PRICE: " + result[i].price);
        productNames.push(result[i].product);
    }
    startPrompt(productNames);
})

function startPrompt(choices){

    const questions = 
    [{
        type: 'list',
        name: 'whatToBuy',
        message: 'What would you like to buy?',
        choices: choices
    },
    {
        type: 'input',
        name: 'numOfItems',
        message: 'How many would you like to buy?',
        when: function(answers) {
            return answers.programs == 'Look up a movie';
        }
    }];

    inquirer
    .prompt(questions)
    .then(answers => {


                
    })
};
