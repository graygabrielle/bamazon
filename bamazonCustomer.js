const database = require('./database/config');

const inquirer = require('inquirer');

function drawTable(){
    database.query("SELECT * FROM products", function(err, result){
        if (err) throw err; 
        const productNames = [];
        console.log("\n\n" + "     ========================================================================================");
        console.log("                            HERE'S WHAT BAMAZON HAS IN STOCK RIGHT NOW");
        console.log("     ========================================================================================" + "\n");
        for(let i = 0; i < result.length; i++){
            console.log("     DEPARTMENT: " + result[i].department + "     ID: " + result[i].id + "     PRODUCT: " + result[i].product + "     PRICE: $" + result[i].price + "\n");
            productNames.push(result[i].product);
        }
        startPrompt(productNames);
    });
};


function startPrompt(choices){

    const questions = 
    [{
        type: 'list',
        name: 'whatToBuy',
        message: '\nWhat would you like to buy?',
        choices: choices
    },
    {
        type: 'input',
        name: 'numOfItems',
        message: '\nHow many would you like to buy?',
        when: function(answer) {
            return answer.whatToBuy;
        }
    }];

    inquirer
    .prompt(questions)
    .then(answers => {
        let price;
        let stock;
        const item = answers.whatToBuy;
        database.query("SELECT * FROM products WHERE ?", 
        {
            product: item
        }, 
        function(err, result){
            if (err) throw err;
            price = result[0].price;
            stock = result[0].stock;
            const quantity = answers.numOfItems;
            const total = quantity*price;
            if(stock<quantity){
                if(stock==0){
                    console.log("\n     Sorry, this item is currently out of stock. Please check back later!");
                }
                else
                console.log(`\n     Sorry, we only have ${stock} of this item left.`);
                return whatNext();
            }
            if(quantity==1){
                console.log(`\n     One ${item} costs $${price}`);
            }
            else if(quantity==0){
                console.log('\n     Error: You did not enter a valid number.');
                return whatNext();
            }
            else{
                console.log(`\n     ${quantity} ${item}s will cost $${total}`);
            }
            areYouSure(quantity, item, stock);
        })
    
    })
};

function areYouSure(number, product, available){
    const questions = 
    [{
        type: 'list',
        name: 'whatToDo',
        message: '\nWhat would you like to do?',
        choices: ['Confirm purchase', 'Change purchase', 'Quit']
    }];

    inquirer
    .prompt(questions)
    .then(answer => {
        switch (answer.whatToDo){
            case 'Confirm purchase':
            database.query(`UPDATE products SET stock = ${available-number} WHERE ?`, {product: product}, 
            function(err){
                if(err) throw err;
            })
            if(number>1)
                product = product + "s";
            console.log(`\n     Congratulations on successfully purchasing ${number} ${product}!`)
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
        message: '\nWhat would you like to do next?',
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