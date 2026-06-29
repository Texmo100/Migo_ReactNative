import { Anime } from "./migoTypes";

export const fakeAnimeList: Anime[] = [
    {
        id: 1,
        title: 'bleach',
        episodes: 366,
        seasons: 17,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'action'},  
            {id: 1, name: 'adventure'},
            {id: 2, name: 'supernatural'},
        ],
        themes: [
            {id: 0, name: 'fantasy'}, 
            {id: 1, name: 'action'}, 
            {id: 2, name: 'comedy'}, 
            {id: 3, name: 'adventure'}
        ],
        demographic: 'shounen',
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
    {
        id: 2,
        title: 'chainsaw man',
        episodes: 12,
        seasons: 1,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'fantasy'}, 
            {id: 1, name: 'action'}, 
        ],
        themes: [
            {id: 0, name: 'gore'}, 
            {id: 1, name: 'urban fantasy'},
        ],
        demographic: 'shounen',
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
];
