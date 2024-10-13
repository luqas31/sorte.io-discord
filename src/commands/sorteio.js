import { SlashCommandBuilder } from 'discord.js';
import { getMessageWithTimeout } from '../utils/messageUtils.js';

export const data = new SlashCommandBuilder().setName('sorteio').setDescription('Inicia um sorteio de armas entre jogadores');

export const execute = async interaction => {
	try {
		await interaction.deferReply();

		await interaction.editReply('Quantos jogadores participarão?');
		const filter = m => m.author.id === interaction.user.id;

		const playerCountMessage = await getMessageWithTimeout(interaction, filter);
		if (!playerCountMessage) {
			return await interaction.editReply('Tempo esgotado. O sorteio foi cancelado.');
		}

		const playerCount = parseInt(playerCountMessage.content);
		if (isNaN(playerCount)) {
			return await interaction.editReply('Por favor, insira um número válido de jogadores.');
		}

		await interaction.followUp(`Por favor, digite os nomes dos ${playerCount} jogadores, separados por vírgula:`);

		const playersMessage = await getMessageWithTimeout(interaction, filter);
		if (!playersMessage) {
			return await interaction.followUp('Tempo esgotado. O sorteio foi cancelado.');
		}

		const players = playersMessage.content.split(',').map(player => player.trim());
		if (players.length !== playerCount) {
			return await interaction.followUp('O número de jogadores fornecido não corresponde ao número de nomes inseridos.');
		}

		await interaction.followUp('Agora, liste os tipos de armas, separados por vírgula (ex.: arma1, arma2, arma3...):');

		const weaponsMessage = await getMessageWithTimeout(interaction, filter);
		if (!weaponsMessage) {
			return await interaction.followUp('Tempo esgotado. O sorteio foi cancelado.');
		}

		const weapons = weaponsMessage.content.split(',').map(weapon => weapon.trim());
		if (weapons.length < players.length) {
			return interaction.followUp('Número insuficiente de armas! O número de armas deve ser igual ou maior que o número de jogadores.');
		}

		players.sort(() => Math.random() - 0.5);
		weapons.sort(() => Math.random() - 0.5);

		let resultMessage = '';
		const playerWeaponMap = new Map();


		players.forEach((player, index) => {
			playerWeaponMap.set(player, [weapons[index]]);
		});


		weapons.slice(players.length).forEach((weapon, index) => {
			const player = players[index % players.length];
			playerWeaponMap.get(player).push(weapon);
		});


		playerWeaponMap.forEach((weapons, player) => {
			resultMessage += `${player} ganhou ${weapons.join(', ')}\n`;
		});

		await interaction.followUp(resultMessage);
	} catch (error) {
		console.error('Erro ao executar o sorteio:', error);
		await interaction.followUp('Houve um erro ao processar o sorteio.');
	}
};
