const Discord = require('discord.js');
const ffmpeg = require('ffmpeg');
const http = require('http');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    asyncCall(msg)
});

async function asyncCall(msg) {
    if (msg.attachments.first() == null || msg.author.bot) {
        console.log("No attatchment");
        return;
    }

    console.log("attachmentURL:", msg.attachments.first().proxyURL);

    var input = "http" + msg.attachments.first().proxyURL.substring(5);

    console.log("input:", input);

    await resolveAfter2Seconds(input);

    msg.channel.send("here's your file back, thanks for letting me borrow it, buddy. sorry, might have broken it a bit", { files: ["./files/file.png"] });
}

function resolveAfter2Seconds(input) {
    console.log("hej")
    return new Promise(resolve => {
        console.log("hej2")
        const file = fs.createWriteStream("./files/file.png");
        const request = http.get(input, function (response) {
            response.pipe(file);
        });

        resolve("done");
    });
}


const config = require("./config.json");
client.login(config.token);
