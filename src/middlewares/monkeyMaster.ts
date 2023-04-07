import { GuildMember } from "discord.js";

export function requireMonkeyMaster (member: GuildMember): boolean {
    const monkeyMasterRole = member.guild.roles.cache.find(r => r.name === "MonkeyMaster");
    if (monkeyMasterRole && !member.roles.cache.has(monkeyMasterRole!.id))
        return false;
    return true;
}