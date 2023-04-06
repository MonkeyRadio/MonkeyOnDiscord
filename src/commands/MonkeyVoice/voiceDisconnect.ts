import { CommandInteraction, GuildMember, VoiceBasedChannel } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

async function stop(channel: VoiceBasedChannel): Promise<void> {
    const connection = getVoiceConnection(channel.guild.id);
    if (connection) {
        connection.destroy();
    }
}

export async function stopTheMonkey(interaction: CommandInteraction) {
    const member = interaction.member;
    if (!member) return;
    const voiceChannel = member as GuildMember;
    if (!voiceChannel.voice.channel) {
        await interaction.reply({ content: "You need to be in a voice channel to use this command", ephemeral: true });
        return;
    }
    await stop(voiceChannel.voice.channel);
    await interaction.reply({ content: "Stopped the monkey", ephemeral: true });
}
