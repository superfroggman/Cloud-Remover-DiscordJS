const Discord = require('discord.js');
const ffmpeg = require('ffmpeg');
const http = require('http');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.attachments.first() == null){
        return;
    }
    console.log("attachmentURL:", msg.attachments.first().proxyURL);

    
    var input = "http" + msg.attachments.first().proxyURL.substring(5);

    console.log("input:", input);

    const file = fs.createWriteStream("file.jpg");
    const request = http.get(input, function (response) {
        response.pipe(file);
    });


    /*
    try {
        var process = new ffmpeg(input);
        process.then(function (video) {
            // Callback mode
            video.fnAddWatermark('./noNOISE.png', './out.mp4', {
                position : 'SE'
            }, function (error, file) {
                if (!error)
                    console.log('New video file: ' + file);
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
    */

});

const config = require("./config.json");
client.login(config.token);