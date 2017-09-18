const Command = require('./command.js');
const MongoClient = require('../node_modules/mongodb').MongoClient;

module.exports = class Play extends Command{
    static getCommand(){ return "!play"; }

    static action(message){
        let url = 'mongodb://localhost:27017/disconode';

        let args = message.content.split(' ');
        args.shift();

        //console.log(message.guild.channels.array());
        //remonte jusqu'à la guild puis trouve la premiere voices channels (Général)
        let voiceChannel = message.guild.channels.find((c)=>c.type == "voice");
        //console.log(voiceChannel);

        MongoClient.connect(url, function(err, db){
            let files = db.collection('files');

            //Find the file
            files.find({name:args[0]}).toArray(function(err, result){
                if(err){
                    throw err;
                }

                if(result[0] == undefined){
                    message.reply("Ce son n'à pas été trouvé :/ !");
                }
                else{
                    console.log(result[0]);

                    //Play sound
                    voiceChannel.join()
                    .then((voiceConnection) => {
                        voiceConnection.playFile(result[0].url);
                    })
                    .catch(console.error);
                }

            });


        });
    }

}