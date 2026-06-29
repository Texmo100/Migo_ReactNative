export interface Genre {
    id: number,
    name: string,
}

export interface Theme {
    id: number,
    name: string,
}

export interface Anime {
    id: number,
    title: string,
    episodes: number,
    seasons: number,
    status: string,
    score: number,
    genres: Genre[],
    themes: Theme[],
    demographic: string,
    addedAt: string,
    lastUpdate: string,
}

export interface Manga {
    id: number,
    title: string,
    episodes: number,
    volumes: number,
    status: string,
    score: number,
    genres: Genre[],
    themes: Theme[],
    demographic: string,
    addedAt: string,
    lastUpdate: string,
}
