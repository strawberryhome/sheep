const { Models: { SlashCommand } } = require('frame');

class Command extends SlashCommand {
	#bot;
	#stores;

	constructor(bot, stores) {
		super({
			name: "about",
			description: "Info about the bot",
			usage: [
				"- Gives info about the bot"
			],
			ephemeral: true,
			v2: true
		})
		this.#bot = bot;
		this.#stores = stores;
	}

	async execute(ctx) {
		var guilds = (await this.#bot.shard.broadcastEval(cli => cli.guilds.cache.size)).reduce((prev, val) => prev + val, 0);
		var users = (await this.#bot.shard.broadcastEval(cli => cli.users.cache.size)).reduce((prev, val) => prev + val, 0);

		return [{
			components: [{
				type: 17,
				components: [
					{
						type: 10,
						content: "-# About"
					},
					{
						type: 14
					},
					{
						type: 10,
						content:
							"# Baa! I'm Sheep!\n" +
							"I help people change their name color here on Discord!\n" +
							"I'm currently selfhosted by the [strawberry home](<https://github.com/strawberryhome>) collective\n" +
							"## Creators\n" +
							"[selenated](https://github.com/selenated)\n" +
							"## Stats\n" +
							`**Guilds:** ${guilds} | **Users:** ${users}`
					},
					{
						type: 14
					},
					{
						type: 9,
						components: [{
							type: 10,
							content: "Invite me!"
						}],
						accessory: {
							type: 2,
							style: '5',
							label: 'Invite',
							url: "https://discordapp.com/api/oauth2/authorize?client_id=1523439468122472509&permissions=268495936&scope=bot%20applications.commands"
						}
					},
					{
						type: 1,
						components: [
							// {
							// 	type: 2,
							// 	style: 5,
							// 	label: "Support server",
							// 	url: "https://discord.gg/EvDmXGt"
							// },
							{
								type: 2,
								style: 5,
								label: "Website",
								url: "https://sheep.strawberryhome.org/"
							},
							{
								type: 2,
								style: 5,
								label: "Github Fork",
								url: "https://github.com/strawberryhome/sheep"
							},
							{
								type: 2,
								style: 5,
								label: "selenated's Ko-Fi",
								url: "https://ko-fi.com/greysdawn"
							}
						]
					}
				]
			}]
		}]
	}
}

module.exports = (bot, stores) => new Command(bot, stores);