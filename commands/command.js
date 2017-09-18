module.exports = class Command {
    
    static parse(message){
        if(message.content.startsWith(this.getCommand())){
            this.action(message);
        }
        else{
            return false;
        }
    }

}