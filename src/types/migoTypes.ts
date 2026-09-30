export interface Genre {
    id: number,
    name: string,
}

export interface Demographic {
    id: number,
    name: string,
}

export interface AnimeManga {
    id: string,
    title: string,
    episodes: number,
    seasonsVolumes: number,
    status: string,
    score: number,
    genres: Genre[],
    demographic: Demographic,
    personalComments: string,
    addedAt: string,
    lastUpdate: string,
    itemType: string,
}

export interface AnimeMangaInput {
    title: string,
    episodes: number,
    seasonsVolumes: number,
    status: string,
    score: number,
    genres: Genre[],
    demographic: Demographic,
    personalComments: string,
    addedAt: string,
    lastUpdate: string,
    itemType: string,
}
