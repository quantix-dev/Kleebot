// Quantix (c) creative commons license 2020
var connectionX = null
const Discord = require("discord.js")
const ytdl = require('ytdl-core-discord');

const ytdlOptions = {
	filter: 'audioonly', // Just grabbing the audio

	liveBuffer: 10000, 
	streamBuffer: 10000, 
	highWaterMark: 1 << 25, // 32 MB 
	qualitybuffer: '55'
}

const streamOptions = {
	seek: 0,
	volume: .5,

	/// Non-Opus (Volume Control)
	//passes: 2,
	//bitrate: 'auto'

	/// OPUS (No Volume Control)
	highWaterMark: 1
};

module.exports.run = async (bot, message, args) => {
	/// Code in here.
	var voiceChannel = message.member.voiceChannel

	if (!voiceChannel) { 
    	message.channel.send("Ewwie you are not in voicechan").catch()
    	return; 
  	}
  
	// Creating the YTDL audio
	const stream = await ytdl(args[0], ytdlOptions)
		.catch(console.log)
		  
	// VoiceChannel connection, and playing stream.
	let voiceConnection = await voiceChannel.join()
	const dispatch = voiceConnection.playOpusStream(stream, streamOptions)

	/*dispatch.on("end", function(reason){
		console.log(`Stream ended because, ${reason}`)
	})*/
}

module.exports.help = {
	name: "play",

	category: "other",
  	commandHelp: "[-play <youtube link>] Play a song (be in a VC)",
  	cooldown: 2
}