import { CommandInteraction, EmbedBuilder } from "discord.js";
import { getOnair, Onair } from "../../controllers/MonkeyAPI.js";

export async function getListeners(interaction: CommandInteraction) {
    const onair:Onair = await getOnair();
    const embedOnair: EmbedBuilder = new EmbedBuilder()
        .setTitle("Listeners on the monkey")
        .setColor(0x00AE86)
        .setThumbnail(onair.cover)
        .addFields([
            { name: "Total", value: onair.listeners.total.toString() },
            { name: "CDN", value: onair.listeners.CDN.toString(), inline: true },
            { name: "Icecast", value: onair.listeners.icecast.toString(), inline: true }
    ]);
    await interaction.reply({ embeds: [embedOnair], ephemeral: true } );
}
