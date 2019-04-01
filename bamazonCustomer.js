const database = require('./database/config');

const inquirer = require('inquirer');

function drawTable(){
    database.query("SELECT * FROM products", function(err, result){
        if (err) throw err; 
        const productNames = [];
        console.log("\n\n" + "     ==========================================");
        console.log("     HERE'S WHAT BAMAZON HAS IN STOCK RIGHT NOW");
        console.log("     ==========================================" + "\n");
        for(let i = 0; i < result.length; i++){
            console.log("     ID: " + result[i].id + "     PRODUCT: " + result[i].product + "     PRICE: " + result[i].price);
            productNames.push(result[i].product);
        }
        console.log("\n\n");
        startPrompt(productNames);
    });
};


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
        when: function(answer) {
            return answer.whatToBuy;
        }
    }];

    inquirer
    .prompt(questions)
    .then(answers => {
        const item = answers.whatToBuy;
        console.log("this is what you selected: " + item);
        const quantity = answers.numOfItems;
        console.log("this is how many you wanted: " + quantity);

                
    })
};

drawTable();