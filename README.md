# DiscordBotEvents
discord.js extension to communicate events between bots using a text channel

```
npm install --save discord-bot-events
```


```js
const Discord = require("discord.js");
const discord = new Discord.Client({autoreconnect: true});
const discordBotEvents = require("discord-bot-events");

discord.login('....');
discord.on('ready', function(){
  discord.guilds.every(function(guild){
    discordBotEvents.register(guild,'bot-events');
    guild.on("test",function(...args){
      console.log("works",args);
    });
  });
});

discord.on("message", function(message) {
  message.guild.emit("test","tada");
});

```
