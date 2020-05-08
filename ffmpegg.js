const Discord = require('discord.js');
const ffmpeg = require('ffmpeg');
const http = require('http');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.attachments.first() == null || msg.author.bot) {
        return;
    }

    console.log("attachmentURL:", msg.attachments.first().proxyURL);


    var input = "http" + msg.attachments.first().proxyURL.substring(5);

    console.log("input:", input);

    const file = fs.createWriteStream("./files/file.mp4");
    const request = http.get(input, function (response) {
        response.pipe(file);
        msg.channel.send("here's your file back, thanks for letting me borrow it, buddy. sorry, might have broken it a bit", {files: ["./files/file.mp4"]});
    });
    
});

const config = require("./config.json");
client.login(config.token);