import config from "../config.js";

export type Track = {
    Type: string;
    late: number;
    trackTStart: number;
    trackTitle: string;
    trackArtist: string;
    trackCover: string;
    trackTDur: number;
    trackTStop: number;
}

export async function getCurrent(): Promise<Track> {
    const response = await fetch(config.monkeyAPI.url + config.monkeyAPI.endpoints.current);
    let data:any = await response.json();
    return data.current;
}
