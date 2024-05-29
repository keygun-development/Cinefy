export const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Sci-Fi'}
]

export const users = [
    {id: 1, firstname: 'John', lastname: 'Doe'},
    {id: 2, firstname: 'Jane', lastname: 'Doe'},
    {id: 3, firstname: 'Alice', lastname: 'Smith'},
    {id: 4, firstname: 'Bob', lastname: 'Smith'}
]

export const movies = [
    {
        id: 1,
        title: 'The Terminator',
        genreId: 1,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMjAyMTk3ODA2MF5BMl5BanBnXkFtZTcwMTkzNDQyNA@@._V1_.jpg',
        year: 1984,
        description: 'A cyborg assassin is sent back in time to kill Sarah Connor, whose unborn son is destined to lead the'
    },
    {
        id: 2,
        title: 'The Matrix',
        genreId: 4,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        year: 1999,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
    },
    {
        id: 3,
        title: 'The Conjuring',
        genreId: 2,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg',
        year: 2013,
        description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.'
    },
    {
        id: 4,
        title: 'The Hangover',
        genreId: 3,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
        year: 2009,
        description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.'
    },
    {
        id: 5,
        title: 'Stranger Things',
        genreId: 4,
        thumbnail: 'https://occ-0-6144-768.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABer7SeWc6FvkBqWtk61GwL7rshAEVCOARQZVTEJGnLXykYBlO4nbbr6gs7M650BjULuaN6hucXKr5xY2iqPAajrxXd70HawdJeuD.jpg?r=608',
        year: 2016,
        description: 'Set in the 1980s, the series centers around the residents of the fictional small town of Hawkins, Indiana, as they are plagued by a hostile alternate dimension known as the Upside Down, after a nearby human experimentation facility opens a gateway between Earth and the Upside Down.'
    },
    {
        id: 5,
        title: 'Squid Game',
        genreId: 1,
        thumbnail: 'https://phantom-marca.unidadeditorial.es/1dae96dc691d041105915b4915754bc8/crop/0x0/1597x899/resize/828/f/jpg/assets/multimedia/imagenes/2021/10/01/16330974723192.png',
        year: 2021,
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.'
    }
]

export const watchlists = [
    {userId: 1, movieId: 1},
    {userId: 1, movieId: 2},
    {userId: 2, movieId: 3},
    {userId: 3, movieId: 4},
    {userId: 4, movieId: 1},
    {userId: 4, movieId: 3}
]