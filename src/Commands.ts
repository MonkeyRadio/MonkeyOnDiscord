import { Command } from "./types/Command.js";
import { pingMonkey } from "./commands/ping.js";
import { current } from "./commands/current.js";

export const Commands: Command[] = [
    pingMonkey,
    current
];