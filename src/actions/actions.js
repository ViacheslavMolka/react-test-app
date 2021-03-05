export const beersLoaded = (payload) => ({type: 'BEER_LOADED', payload});

export const beersChanged = (payload, id) => ({type: 'BEER_CHANGED', payload, id});

export const beerDelete = (id) => ({type: 'BEER_DELETE', id});

export const sortCountBeers = () => ({type: 'BEER_COUNT_SORT'})

export const sortNameBeers = () => ({type: 'BEER_NAME_SORT'})

export const beersAdd = (payload) => ({type: 'BEER_ADD', payload});