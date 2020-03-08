/*    
	play.js - joins a VC and plays music with YT link specified
	
    Copyright (C) 2020  QuantixOfficial
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
 
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