const commands = require("./commands.js");

process.stdout.write('prompt > '); //prompts user

process.stdin.on('data', (userInput) => { // data event trigger
    userInput = userInput.toString().trim();

    commands.evaluateCmd(userInput);
});