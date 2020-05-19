const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log("\nnew message");
    console.log("content:", msg.content);
    console.log("file:", msg.files);
    console.log("url:", msg.url);
    console.log("attachments:", msg.attachments);

    if (msg.attachments.first() != null){
        console.log("attachmentURL:", msg.attachments.first().proxyURL);
    }
    
});

const config = require("../config.json");
client.login(config.token);