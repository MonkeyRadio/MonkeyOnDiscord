import { ApplicationCommandOption, Client, CommandInteraction, Guild, GuildMember, VoiceBasedChannel } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, getVoiceConnection } from '@discordjs/voice';
import { getOnair, Onair } from '../../controllers/MonkeyAPI.js'
import { getCurrent } from '../MonkeyUtils/Current.js';
import { requireMonkeyMaster } from '../../middlewares/monkeyMaster.js';

async function play(channel: VoiceBasedChannel, guild: Guild, onair: Onair): Promise<void> {
    if (!channel) return;
    if(getVoiceConnection(channel.guild.id)) return;
    const connection = joinVoiceChannel({
        channelId: channel!.id.toString(),
        guildId: guild.id.toString(),
        adapterCreator: guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(onair.IceDiffLinkPath, {
        inlineVolume: true,
    });
    resource.volume?.setVolume(0.07);
    player.play(resource);
    const subscription = connection.subscribe(player);
    connection.on(VoiceConnectionStatus.Disconnected, () => {
        player.stop(true);
        subscription!.unsubscribe();
        connection.destroy();
    });
    connection.on(VoiceConnectionStatus.Destroyed, () => {
        player.stop(true);
        subscription!.unsubscribe();
    });
}

export async function playTheMonkey(interaction: CommandInteraction, client: Client) {
    const member = interaction.member as GuildMember;
    if (!member) return;
    if (!requireMonkeyMaster(member)) {
        await interaction.reply({ content: "You need to be a Monkey Master to use this command", ephemeral: true });
        return;
    }
    let channel = interaction.options.get("voicechannel")?.channel as VoiceBasedChannel;
    if (!channel) {
        channel = member.voice.channel as VoiceBasedChannel;
        if (!channel) {
            await interaction.reply({ content: "You need to be in a voice channel to use this command", ephemeral: true });
            return;
        }
    }
    await play(channel, interaction.guild!, await getOnair());
    await getCurrent(interaction, false);
}
