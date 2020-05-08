const Discord = require('discord.js');
var ffmpeg = require('ffmpeg');

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
    console.log("attachmentURL:", msg.attachments.first().proxyURL);

    var input = msg.attachments.first().proxyURL;
    
    if (msg.content === 'ping') {
        msg.reply('Pong!');
        msg.channel.send("Testing message.", { files: ["./noNOISE.png"] });
    }
});

client.login('NzA4NDIwNTk1Mjk3MDI2MTA5.XrXGmg.3QzFE9-Zf7rzjytOxLjbJVpokRY');