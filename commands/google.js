const Command = require('./command.js');
module.exports = class Google extends Command{
    static getCommand(){ return "!google"; }

    static action(message){
        let args = message.content.split(' ');
        args.shift();
        message.reply("https://www.google.fr/search?q=" + args.join("+"));
    }

}