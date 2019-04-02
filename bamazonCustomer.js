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
            console.log("     ID: " + result[i].id + "     PRODUCT: " + result[i].product + "     PRICE: $" + result[i].price);
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
        let price;
        const item = answers.whatToBuy;
        database.query("SELECT price FROM products WHERE ?", 
        {
            product: item
        }, 
        function(err, result){
            if (err) throw err;
            price = result[0].price;
            const quantity = answers.numOfItems;
            const total = quantity*price;
            if(quantity==1){
                console.log(`One ${item} costs $${price}`);
            }
            else if(quantity==0){
                console.log('Please enter a valid number.');
            }
            else{
                console.log(`${quantity} ${item}s will cost $${total}`);
            }
            areYouSure(quantity, item);
        })
        


    })
};

function areYouSure(number, product){
    const questions = 
    [{
        type: 'list',
        name: 'whatToDo',
        message: 'What would you like to do?',
        choices: ['Confirm purchase', 'Change purchase', 'Quit']
    }];

    inquirer
    .prompt(questions)
    .then(answer => {
        switch (answer.whatToDo){
            case 'Confirm purchase':
            if(number>1){
                product = product + "s";
            }
            console.log(`Congratulations on successfully purchasing ${number} ${product}!`);
            whatNext();
            break;

            case 'Change purchase':
            drawTable();
            break;

            case 'Quit':
            process.exit();
            break;
        }
    })
}

function whatNext(){
    const questions = 
    [{
        type: 'list',
        name: 'whatNext',
        message: 'What would you like to do next?',
        choices: ['Make another purchase', 'Quit']
    }];

    inquirer
    .prompt(questions)
    .then(answer => {
        switch (answer.whatNext){
            case 'Make another purchase':
            drawTable();
            break;

            case 'Quit':
            process.exit();
            break;
        }
    })
}

drawTable();