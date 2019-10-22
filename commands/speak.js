// Quantix (c) creative commons license 2019
module.exports.run = (bot, message, args) => {
	message.delete()
		.catch(console.error)
	
	if (args[0]) {
		let chan = bot.channels.get(args[0].substring(2).slice(0,-1))
		var valid = false
		
		if (message.member.roles.has("635946818869395487")) {
			valid = true
		} else {
			valid = false
		}
		
		if (valid) {
			if (chan) {
				var channel = args.shift()
				chan.send(args.join(" "))
			} else {
				message.channel.send("Channel does not exist.")
			}
		} else {
			message.channel.send("Not kleebcare.")
		}
	} else {
		message.channel.send("Specify a channel.")
	}
}

module.exports.help = {
	name: "speak"
}