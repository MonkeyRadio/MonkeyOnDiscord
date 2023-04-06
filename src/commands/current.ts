import { CommandInteraction, SlashCommandBuilder, Embed, EmbedBuilder } from "discord.js";
import { Command } from "../types/Command.js";
import { getCurrent, Current } from "../controllers/MonkeyAPI.js";

export default {
    data: new SlashCommandBuilder()
        .setName("monkey")
        .setDescription("Get the current monkey"),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        const current:Current = await getCurrent();
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Currently on the monkey")
            .setColor(0x00AE86)
            .setThumbnail(current.track.trackCover)
            .addFields([
                { name: "Title", value: current.track.trackTitle },
                { name: "Artist", value: current.track.trackArtist },
                { name: "Show", value: current.epg.epgTitle},
                { name: "Hosts", value: current.epg.epgHosts },
            ]);
        await interaction.reply({ embeds: [embed], ephemeral: true } );
    }
} as Command;
