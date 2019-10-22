// Quantix (c) creative commons license 2019

module.exports.run = (bot, message, args) => {
	message.delete()
		.catch(console.error)
	
	if (args && args[0]) {
		var client = message.member
		const tag = message.mentions.users.first()
		
		if (client.user.username == "Quantix") {
			if (tag) {
				args.shift()
				tag.send(args.join(" "))
				message.channel.send(`Sent to: ${tag.username} `)
			} else {
				message.channel.send("Tag someone.")	
			}
		} else {
			message.channel.send("Not BOT-OWNER")
		}
	} else {
			message.channel.send("Failed.")
	}
}

module.exports.help = {
	name: "pm"
}