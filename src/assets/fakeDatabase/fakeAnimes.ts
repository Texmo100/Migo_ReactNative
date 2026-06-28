export interface AnimeGenre {
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
    genres: AnimeGenre[],
    addedAt: string,
    lastUpdate: string,
}

export const fakeAnimeList: Anime[] = [
    {
        id: 1,
        title: 'bleach',
        episodes: 100,
        seasons: 32,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'fantasy'}, 
            {id: 1, name: 'action'}, 
            {id: 2, name: 'comedy'}, 
            {id: 3, name: 'adventure'}
        ],
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
    {
        id: 2,
        title: 'chainsaw man',
        episodes: 100,
        seasons: 32,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'fantasy'}, 
            {id: 1, name: 'action'}, 
            {id: 2, name: 'comedy'}, 
            {id: 3, name: 'adventure'}
        ],
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
];
