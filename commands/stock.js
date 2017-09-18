const Command = require('./command.js');
const MongoClient = require('../node_modules/mongodb').MongoClient;
const download = require('download');
const fs = require('fs');

module.exports = class Stock extends Command{
    static getCommand(){ return "!stock"; }

    static action(message){
        let url = 'mongodb://localhost:27017/disconode';

        //Get the name of the file
        let args = message.content.split(' ');
        args.shift();

        // Get message's attachment
        let attachment = message.attachments.first();

        //SAVE File url and name in MongoDb
        MongoClient.connect(url, function(err, db){

            //COPY THE MP3 file
            download(attachment.url).then(data => {
                let files = db.collection('files');

                //Copy
                fs.writeFileSync("./assets/track/" +args[0] + ".mp3", data);

                //DB INSERT
                files.insert({url:"./assets/track/" +args[0]+ ".mp3",name:args[0]});

                //Message
                message.reply("Appel ton son en écrivant la commande: !play "+ args[0]);
                
            });

        });
        
    }

}