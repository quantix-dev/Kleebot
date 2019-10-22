// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

var Youtube = (function () {
    'use strict';

    var video, results;

    var getThumb = function (url, size) {
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
        thumb: getThumb
    };
}());

module.exports.run = async (bot, message, args) => {
	await message.react('✅')

	const id = message.guild.id
	var vc = bot.user.client.voiceConnections.get(id)

	if (!vc) {
		try {
			var vc = await message.member.voiceChannel.join()
		} catch(x) {
			console.error(x)
		}
	}

	if (vc && args[0]) {
		const sl = args[0].substring(0,5)
		if (sl == "https" || sl == "http:") { 
			var thumb = Youtube.thumb(args[0], 'big');
		
			const embed = {
				"color": 2579640,
				"author": {
				  "name": "Kleebot - Music",
				  "url": "https://discordapp.com",
				  "icon_url": bot.user.displayAvatarURL
				},
				"description": `Music Requested By: ${message.member.user.username}`,
				"timestamp": new Date(),
				"thumbnail": {
					"url": thumb,
				},
				"footer": {
				  "text": "• Powered by Qubit"
				},
			};
	
			if (embed) {
				message.channel.send({embed})
			} else {
				message.channel.send("Starting music..")
			}

			const ytdl = require('ytdl-core-discord');
			var dispatch = null
			try {
				var stream = await ytdl(args[0],{liveBuffer: 10000, streamBuffer: 10000, highWaterMark: 1 << 15, qualitybuffer: '95' });
				var dispatch = await vc.playOpusStream(stream, {type: 'opus', highWaterMark: 1})
			} catch(promiseRejection) {
				console.log(promiseRejection)
			}
			
			if (dispatch) {
				dispatch.on("end", () => {
					stream.end()
					stream.destroy()
					global.gc()
				});
			}
		} else {
			message.channel.send("Enter a valid URL")
		}
	} else {
		if (!args[0]) {
			message.channel.send("``-play <url>``")
		} else {
			message.channel.send("Join a VC")
		}
	}

	message.delete()
}

module.exports.help = {
	name: "play",
}