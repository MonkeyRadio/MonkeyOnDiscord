import { CommandInteraction, EmbedBuilder } from "discord.js";
import { getCurrent, Current } from "../../controllers/MonkeyAPI.js";

export async function getShow(interaction: CommandInteraction) {
    const currentEpg:Current = await getCurrent();
    let epgdateLabel: string = "";
    epgdateLabel += ("0" + new Date(currentEpg.epg.epgStart * 1000).getHours()).slice(0, 2) + ":";
    epgdateLabel += ("0" + new Date(currentEpg.epg.epgStart * 1000).getMinutes()).slice(0, 2) + " - ";
    epgdateLabel += ("0" + new Date(currentEpg.epg.epgStop * 1000).getHours()).slice(0, 2) + ":";
    epgdateLabel += ("0" + new Date(currentEpg.epg.epgStop * 1000).getMinutes()).slice(0, 2);
    const embedShow: EmbedBuilder = new EmbedBuilder()
        .setTitle("Current Show")
        .setColor(0x00AE86)
        .setThumbnail(currentEpg.epg.epgCover)
        .addFields([
            { name: "Title", value: currentEpg.epg.epgTitle, inline: true },
            { name: "Hosts", value: currentEpg.epg.epgHosts, inline: true },
            { name: "Hours", value: epgdateLabel, inline: true },
            { name: "Description", value: currentEpg.epg.epgDesc }
        ]);
    await interaction.reply({ embeds: [embedShow], ephemeral: true } );
}
