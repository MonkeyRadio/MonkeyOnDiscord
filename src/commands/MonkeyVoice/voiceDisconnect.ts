import { CommandInteraction, GuildMember, VoiceBasedChannel } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { requireMonkeyMaster } from '../../middlewares/monkeyMaster.js';

export async function stopTheMonkey(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    if (!member) return;
    if (!requireMonkeyMaster(member)) {
        await interaction.reply({ content: "You need to be a Monkey Master to use this command", ephemeral: true });
        return;
    }
    if (!interaction.guild) return;
    const connection = getVoiceConnection(interaction.guild.id);
    if (connection) {
        connection.destroy();
    }
    await interaction.reply({ content: "Stopped the monkey", ephemeral: true });
}
