// Quantix (c) creative commons license 2019

module.exports.run = (bot, message, args) => {
	message.delete()
		.catch(console.error)
	
	var client = message.member
	if (client.user.username == "Quantix") {
		message.guild.members.forEach(member => {
			if (member.id != client.user.id && !member.user.bot) {
				member.send(args.join(" "));
			}
		})
		message.reply(`PMED Everyone in, ${message.guild.name}`)
	} else {
		message.channel.send("Not BOT-OWNER")
	}
}

module.exports.help = {
	name: "pmall"
}