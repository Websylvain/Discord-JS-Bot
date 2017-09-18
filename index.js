const Discord = require('discord.js');
const Google = require('./commands/google.js');
const Ping = require('./commands/ping.js');
const Play = require('./commands/play.js');
const Stock = require('./commands/stock.js');

//INIT BOT
const bot = new Discord.Client();

//On ready
bot.on('ready', () => {
    bot.user.setAvatar("./assets/avatar.png")
        .catch(() => console.error());
    bot.user.setGame('vous surveiller')
        .catch(() => console.error());
});

//New Member !
bot.on('guildMemberAdd',(member) =>{
    member.createDM().then((channel)=>{
        channel.send('Bienvenue sur ce serveur ! '+ member.displayName +' :D')
    })
});

// Create an event listener for messages
bot.on('message', (message) => {
    let commandUsed = Google.parse(message) || Stock.parse(message) || Ping.parse(message) || Play.parse(message);
});

bot.login('DISCOR_API_TOKEN');