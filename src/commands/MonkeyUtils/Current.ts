import { CommandInteraction, EmbedBuilder } from "discord.js";
import { getCurrent as getCur, Current } from "../../controllers/MonkeyAPI.js";

export async function getCurrent(interaction: CommandInteraction, ephemeral: boolean = true) {
    const current:Current = await getCur();
    let dateLabel: string = "";
    dateLabel += ("0" + new Date(current.epg.epgStart * 1000).getHours()).slice(-2) + ":";
    dateLabel += ("0" + new Date(current.epg.epgStart * 1000).getMinutes()).slice(-2) + " - ";
    dateLabel += ("0" + new Date(current.epg.epgStop * 1000).getHours()).slice(-2) + ":";
    dateLabel += ("0" + new Date(current.epg.epgStop * 1000).getMinutes()).slice(-2);
    const embedCur: EmbedBuilder = new EmbedBuilder()
        .setTitle("Currently on the monkey")
        .setColor(0x00AE86)
        .setThumbnail(current.track.trackCover)
        .addFields([
            { name: "Title", value: current.track.trackTitle },
            { name: "Artist", value: current.track.trackArtist },
            { name: "Show", value: current.epg.epgTitle, inline: true },
            { name: "Hosts", value: current.epg.epgHosts, inline: true },
            { name: "Hours", value: dateLabel, inline: true }
        ]);
    await interaction.reply({ embeds: [embedCur], ephemeral: ephemeral } );
}
