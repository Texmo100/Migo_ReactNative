import { Manga } from "./migoTypes";

export const fakeMangaList: Manga[] = [
    {
        id: 1,
        title: 'Shuumatsu no Harem',
        episodes: 136,
        volumes: 18,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'sci-fi'},  
            {id: 1, name: 'erotica'},
        ],
        themes: [
            {id: 0, name: 'harem'}, 
        ],
        demographic: 'shounen',
        addedAt: '06/28/2026',
        lastUpdate: '06/28/2026',
    },
    {
        id: 2,
        title: 'caterpillar',
        episodes: 98,
        volumes: 11,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'action'}, 
            {id: 1, name: 'ecchi'}, 
        ],
        themes: [
            {id: 1, name: 'urban fantasy'},
        ],
        demographic: 'seinen',
        addedAt: '06/28/2026',
        lastUpdate: '06/28/2026',
    },
];
