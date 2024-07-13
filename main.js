#! /usr/bin/env node 
// Node Packages
import chalk from "chalk";
import inquirer from "inquirer";
// Create Bank Class
class Bank {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    // Create Withdraw Method
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.magentaBright(`\nWithdrawal Amount : $${amount} \nCurrent Balance : $${this.balance}`));
        }
        else {
            console.log(chalk.redBright("\nInsufficient Balance!!\n"));
        }
    }
    // Create Deposit Method
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.magentaBright(`\nSuccessfully Deposit Amount : $${amount}\nCurrent Balance : $${this.balance}\n`));
        }
    }
    // Check Balance Method
    checkBalance() {
        console.log(chalk.yellow.italic(`\nCurrent Balance : ${this.balance}\n`));
    }
}
// Customer Class
class Customer {
    userName;
    age;
    gender;
    mobileNumber;
    CNIC;
    email;
    account;
    constructor(userName, age, gender, mobileNumber, CNIC, email, account) {
        this.userName = userName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.CNIC = CNIC;
        this.account = account;
    }
    // User Access
    disply() {
        console.log(chalk.green(`Name`) + " : " + chalk.yellow(`${this.userName.firstName} ${this.userName.lastName}`));
        console.log(chalk.green(`Age`) + " : " + chalk.yellow(`${this.age}`));
        console.log(chalk.green(`Gender`) + " : " + chalk.yellow(`${this.gender}`));
        console.log(chalk.green(`Mobile Number`) + " : " + chalk.yellow(`${this.mobileNumber}`));
        console.log(chalk.green(`Email`) + " : " + chalk.yellow(`${this.email}`));
        console.log(chalk.green(`CNIC`) + " : " + chalk.yellow(`${this.CNIC}`));
        console.log(chalk.green(`Amount In Bank `) + " : " + chalk.yellow(`${this.account.balance}`));
    }
}
// Create BankHolders 
const bankHolders = [
    new Bank(9001, 1000),
    new Bank(9002, 2000),
    new Bank(9003, 800),
    new Bank(9004, 400),
];
// Create BankHolder Details 
const holderDetail = [
    new Customer({ firstName: "Asfaa", lastName: "Khan" }, 22, "Female", 321548214, "42101-1254631-8", "asfakhan@gamil.com", bankHolders[0]),
    new Customer({ firstName: "Amaan", lastName: "Asif" }, 24, "Male", 33304414, "42101-2158691-1", "amanasif@gamil.com", bankHolders[1]),
    new Customer({ firstName: "Ahmed", lastName: "Khan" }, 18, "Male", 3219102915, "42101-12452548-4", "ahmed@gamil.com", bankHolders[2]),
    new Customer({ firstName: "Mahnoor", lastName: "Imran" }, 24, "Female", 3480026684, "4210-15463214-7", "mahnoor@gmail.com", bankHolders[3])
];
async function myBank() {
    console.log(chalk.green("========================================================="));
    console.log(chalk.magenta.bold("\t\tWelcome To My Bank Program\t\t"));
    console.log(chalk.green("========================================================="));
    const accountNumber = await inquirer.prompt({
        name: "accountNum",
        type: "number",
        message: "Enter Your Account Number To Access To Bank Operation: ",
    });
    const customer = holderDetail.find(customer => customer.account.accountNumber === accountNumber.accountNum);
    do {
        if (customer) {
            console.log(chalk.blueBright.bold.underline(`\nAccount Holder : ${customer.userName.firstName} ${customer.userName.lastName} \n`));
            const action = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Which Action Do You Want To Perfom?",
                choices: [{ value: "WithDraw Amount" }, { value: "Deposit Amount" }, { value: "Check Balance" }, { value: "User Information" }, { value: "Exit" }],
            });
            switch (action.ans) {
                case "WithDraw Amount":
                    const withdraw = await inquirer.prompt({
                        name: "ans",
                        type: "number",
                        message: "Enter Withdrawal Amount :",
                    });
                    customer.account.withdraw(withdraw.ans);
                    break;
                case "Deposit Amount":
                    const deposit = await inquirer.prompt({
                        name: "ans",
                        type: "number",
                        message: "Enter Deposit Amount :",
                    });
                    customer.account.deposit(deposit.ans);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "User Information":
                    console.log(chalk.red.bold("\nAlert!!!!\n"));
                    let password = 9876;
                    const ask = await inquirer.prompt({
                        name: "passkey",
                        type: "number",
                        message: "Enter Password To access Personl Information : ",
                    });
                    if (password === ask.passkey) {
                        customer.disply();
                    }
                    else {
                        console.log(chalk.red.italic("Invalid Password"));
                    }
                case "Exit":
                    const confirm = await inquirer.prompt({
                        name: "ans",
                        type: "list",
                        message: "\nDo You Want To Continue?",
                        choices: [{ value: "Yes" }, { value: "No" }]
                    });
                    if (confirm.ans === "Yes") {
                        console.log(chalk.blueBright.italic(`\nYou Continue In Your Account\n`));
                        continue;
                    }
                    else {
                        console.log(chalk.grey.bold.italic(`\nYou Successfully Exit From Your Account!`));
                        console.log(chalk.magenta.italic(`Thank You For Using This Project\n`));
                        process.exit();
                    }
            }
        }
        else {
            console.log(chalk.red.bold.italic("\nInvalid Account Number\n"));
            process.exit();
        }
    } while (true);
}
myBank();
