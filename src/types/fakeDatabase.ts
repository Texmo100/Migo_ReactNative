import { AnimeManga } from "./migoTypes";

export const fakeAnimeList: AnimeManga[] = [
    {
        id: 0,
        title: 'bleach',
        episodes: 366,
        seasonsVolumes: 17,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'action'},
            {id: 1, name: 'adventure'},
            {id: 2, name: 'comedy'},
            {id: 6, name: 'fantasy'}, 
        ],
        demographic: { id: 0, name: 'shounen'},
        personalComments: "",
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
    {
        id: 1,
        title: 'chainsaw man',
        episodes: 12,
        seasonsVolumes: 1,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'action'}, 
            {id: 2, name: 'comedy'}, 
        ],
        demographic: { id: 0, name: 'shounen'},
        personalComments: "",
        addedAt: '06/27/2026',
        lastUpdate: '06/27/2026',
    },
];

export const fakeMangaList: AnimeManga[] = [
    {
        id: 0,
        title: 'Shuumatsu no Harem',
        episodes: 136,
        seasonsVolumes: 18,
        status: 'completed',
        score: 10,
        genres: [
            {id: 8, name: 'h'},
            {id: 20, name: 'sci-fi'},  
        ],
        demographic: { id: 0, name: 'shounen'},
        personalComments: "",
        addedAt: '06/28/2026',
        lastUpdate: '06/28/2026',
    },
    {
        id: 1,
        title: 'caterpillar',
        episodes: 98,
        seasonsVolumes: 11,
        status: 'completed',
        score: 10,
        genres: [
            {id: 0, name: 'action'}, 
            {id: 5, name: 'ecchi'}, 
        ],
        demographic: { id: 2, name: 'seinen'},
        personalComments: "",
        addedAt: '06/28/2026',
        lastUpdate: '06/28/2026',
    },
];
