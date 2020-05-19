const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    
    if (msg.content === 'ping') {
        msg.reply('Pong!');
        msg.channel.send("Testing message.", { files: ["./noNOISE.png"] });

        setTimeout(function (){
            msg.reply("Waiting")
        }, 5000)

        msg.reply("done waiting")
    }
});

const config = require("../config.json");
client.login(config.token);