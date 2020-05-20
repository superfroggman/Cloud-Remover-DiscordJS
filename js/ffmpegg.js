const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const { exec } = require("child_process");

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const acceptedExtensions = ["mp4", "gif"]

client.on('message', msg => {

    if (!msg.content.startsWith(config.prefix)) {
        //console.log("wrong prefix");
        return;
    }

    if (msg.attachments.first() == null || msg.author.bot) {
        console.log("No attatchment");
        return;
    }
    console.log("attachmentURL:", msg.attachments.first().proxyURL);

    var fileLink = "http" + msg.attachments.first().proxyURL.substring(5);
    var fileExtension = fileLink.substr(fileLink.lastIndexOf('.') + 1);
    var fileLocation = "../files/file." + fileExtension;
    
    /*
    if (!acceptedExtensions.indexOf(fileExtension) > -1){
        console.log("wrong file extention")
        return;
    }*/

    console.log("fileLink:", fileLink);
    console.log("fileExtension:", fileExtension);
    console.log("fileLocation:", fileLocation);



    const file = fs.createWriteStream(fileLocation);
    const request = http.get(fileLink, function (response) {
        response.pipe(file);
    });

    var ffmpegCommand = "ffmpeg -i " + fileLocation + " -vf \"select=gte(n\\, 50)\" -vframes 1 ../files/test_image.jpg"

    execFfmpeg(ffmpegCommand);

    setTimeout(function () {
        msg.channel.send("here's your file back, thanks for letting me borrow it, buddy. sorry, might have broken it a bit", { files: [fileLocation] });
    }, 2000)
});



function execFfmpeg(command) {
    console.log("doing exec thingy")
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}


const config = require("../config.json");
client.login(config.token);
