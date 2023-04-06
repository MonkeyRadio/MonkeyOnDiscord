import { CommandInteraction, SlashCommandBuilder, Embed, EmbedBuilder } from "discord.js";
import { Command } from "../types/Command.js";
import { getCurrent, Track } from "../controllers/MonkeyAPI.js";

export default {
    data: new SlashCommandBuilder()
        .setName("monkey")
        .setDescription("Get the current monkey"),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        const current:Track = await getCurrent();
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Currently on the monkey")
            .setColor(0x00AE86)
            .setThumbnail(current.trackCover)
            .addFields([
                { name: "Title", value: current.trackTitle, inline: true },
                { name: "Artist", value: current.trackArtist, inline: true },
            ]);
        await interaction.reply({ embeds: [embed] });
    }
} as Command;
