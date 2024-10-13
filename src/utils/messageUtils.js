export const getMessageWithTimeout = async (interaction, filter, totalWaitTime = 60000, checkInterval = 3000) => {
	const start = Date.now();
	let message;

	while (!message && Date.now() - start < totalWaitTime) {
		const messages = await interaction.channel.awaitMessages({ filter, max: 1, time: checkInterval });
		if (messages.size > 0) {
			message = messages.first();
			break;
		}
	}

	return message;
};
