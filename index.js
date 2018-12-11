const EventEmitter = require("events").EventEmitter;
const Buffer = require("Buffer");

class DiscordBotEventEmitter extends EventEmitter {
    constructor(guild,channelName) {
        super(); 
        var that = this;
        this.guild = guild;
        this.channel = guild.channels.find((c) => c.name == channelName ? channelName : 'bot-events');

        this.guild.client.on("message", function(message) {
            if(message.content && message.channel.id == message.channel.id && message.author && message.author.id != that.guild.client.user.id && message.author.bot){
                try{
                    let event = JSON.parse(message.content);
                    if(event.hasOwnProperty("name") && event.hasOwnProperty("arguments")){
                        that.emit(event.name,event.arguments);
                    }
                }catch (e){
                    //
                }
            }
        });
    }
    
    send(event, ...args){
        var serializedEvent = JSON.stringify({
            name:event,
            arguments: args
        });
        if(serializedEvent.length < 2000)
            this.channel.send(serializedEvent).catch(console.error);
    }
}

module.exports = {
    register: function(guild, channelName){
        guild.events = new DiscordBotEventEmitter(guild,channelName);
        guild.on = guild.events.on.bind(guild.events);
        guild.emit = guild.events.send.bind(guild.events);
    }
};
