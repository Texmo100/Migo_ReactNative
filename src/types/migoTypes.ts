export interface Genre {
    id: number,
    name: string,
}

export interface Demographic {
    id: number,
    name: string,
}

export interface AnimeManga {
    id: number,
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
}
