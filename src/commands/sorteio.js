import { SlashCommandBuilder } from 'discord.js';
import { getMessageWithTimeout } from '../utils/messageUtils.js';

export const data = new SlashCommandBuilder().setName('sorteio').setDescription('Inicia um sorteio de armas entre jogadores');

export const execute = async interaction => {
	try {
		await interaction.deferReply();

		const question1 = await interaction.editReply('Quantos jogadores participarão?');
		const filter = m => m.author.id === interaction.user.id;

		const playerCountMessage = await getMessageWithTimeout(interaction, filter);
		if (!playerCountMessage) {
			await question1.delete();
			return await interaction.editReply('Tempo esgotado. O sorteio foi cancelado.');
		}

		const playerCount = parseInt(playerCountMessage.content);
		if (isNaN(playerCount)) {
			await question1.delete();
			await playerCountMessage.delete();
			return await interaction.editReply('Por favor, insira um número válido de jogadores.');
		}

		await question1.delete();
		await playerCountMessage.delete();

		const question2 = await interaction.followUp(`Por favor, digite os nomes dos ${playerCount} jogadores, separados por vírgula:`);

		const playersMessage = await getMessageWithTimeout(interaction, filter);
		if (!playersMessage) {
			await question2.delete();
			return await interaction.followUp('Tempo esgotado. O sorteio foi cancelado.');
		}

		const players = playersMessage.content.split(',').map(player => player.trim());
		if (players.length !== playerCount) {
			await question2.delete();
			await playersMessage.delete();
			return await interaction.followUp('O número de jogadores fornecido não corresponde ao número de nomes inseridos.');
		}

		await question2.delete();
		await playersMessage.delete();

		const question3 = await interaction.followUp('Agora, liste os tipos de armas, separados por vírgula (ex.: arma1, arma2, arma3...):');

		const weaponsMessage = await getMessageWithTimeout(interaction, filter);
		if (!weaponsMessage) {
			await question3.delete();
			return await interaction.followUp('Tempo esgotado. O sorteio foi cancelado.');
		}

		const weapons = weaponsMessage.content.split(',').map(weapon => weapon.trim());
		if (weapons.length < players.length) {
			await question3.delete();
			await weaponsMessage.delete();
			return interaction.followUp('Número insuficiente de armas! O número de armas deve ser igual ou maior que o número de jogadores.');
		}

		await question3.delete();
		await weaponsMessage.delete();

		players.sort(() => Math.random() - 0.5);
		weapons.sort(() => Math.random() - 0.5);

		const playerWeaponMap = new Map();

		players.forEach((player, index) => {
			playerWeaponMap.set(player, [weapons[index]]);
		});

		weapons.slice(players.length).forEach((weapon, index) => {
			const player = players[index % players.length];
			playerWeaponMap.get(player).push(weapon);
		});

		for (const [player, weapons] of playerWeaponMap.entries()) {
			await interaction.channel.send(`${player} - ${weapons.join(', ')}`);
		}
	} catch (error) {
		console.error('Erro ao executar o sorteio:', error);
		await interaction.followUp('Houve um erro ao processar o sorteio.');
	}
};
