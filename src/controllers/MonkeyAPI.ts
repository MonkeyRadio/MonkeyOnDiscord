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

export type Epg = {
    epgTitle: string;
    epgDesc: string;
    epgHosts: string;
    epgCover: string;
    epgBann: string;
    epgStart: number;
    epgStop: number;
}

export type Current = {
    track: Track;
    epg: Epg;
}

export async function getCurrent(): Promise<Current> {
    const trackR = await fetch(config.monkeyAPI.url + config.monkeyAPI.endpoints.current);
    const track:any = await trackR.json();
    const epgR = await fetch(config.monkeyAPI.url + config.monkeyAPI.endpoints.currentEpg);
    const epg:any = await epgR.json();
    return { 
        track: track.current,
        epg: epg.epgNow
    } as Current;
}
