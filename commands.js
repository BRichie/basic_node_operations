const fs = require("fs");

function done(output){
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');

}

function evaluateCmd(userInput){ // store the commands
    const userInputArray = userInput.split(" "); //parses user input, comprehend which command was typed
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail": 
            commandLibrary.tail(userInputArray.slice(1));
            break;
        case "default":
            commandLibrary.errorHandler(userInputArray[0]);
        }
}

const commandLibrary = {
    "echo":function(userInput){ //echo commmand
        done(userInput);
    },

    "cat": function(fullPath) { //cat command
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });

    },
    "head": function(fullPath) { //head command, first 7 lines of code
        const fileName = fullPath[0];
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;
        done(data.split("\n").slice(0, 7).join("\n"));

        });
    },

    "tail": function(fullPath){ //tail command, last 7 lines of code
        const fileName = fullPath[0];
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;
        done(data.split("\n").slice(-7).join("\n"));
        });
    },

    "errorHandler": function (userInput){
        done('ERROR : "${userInput}" is an invalid command.');
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;