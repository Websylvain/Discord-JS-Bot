const Command = require('./command.js');
module.exports = class Ping extends Command{
    static getCommand(){ return "!ping"; }

    static action(message){
        message.reply("pong !");
    }

}