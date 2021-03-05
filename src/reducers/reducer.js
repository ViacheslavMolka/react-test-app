const initialState = {
    beers: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BEER_LOADED':
            if (state.beers) {
                return {
                    beers: state.beers
                }
            }
            return {
                beers: action.payload
            };

        case 'BEER_COUNT_SORT':
            function byCountField(field) {
                return (a, b) => a[field] > b[field] ? 1 : -1;
            }
            const sortCountArray = [...state.beers.sort(byCountField('ebc'))];
            return {
                beers: sortCountArray
            }
        
        case 'BEER_NAME_SORT':
            function byNameField(field) {
                return (a, b) => a[field] > b[field] ? 1 : -1;
            }
            const sortNameArray = [...state.beers.sort(byNameField('name'))];
            return {
                beers: sortNameArray
            }    

        case 'BEER_DELETE':    
            const idx = parseInt(action.id);
            const newState = [...state.beers.slice(0, idx), ...state.beers.slice(idx + 1)];
            console.log(newState)
            return {
                beers: newState
            }

        case 'BEER_ADD':            
            const newArr = [{...action.payload, id: Date.now(), isAddedNews: true}, ...state.beers];
            console.log(newArr)
            return {
                beers: newArr
            };

        case 'BEER_CHANGED':
            const changedElem = action.payload;
            const id = parseInt(action.id);
            const newItem = [
                    ...state.beers.slice(0, id),
                    {...state.beers[id], ...changedElem},
                    ...state.beers.slice(id + 1)
                ];
            return {
                beers: newItem
            };

        default: 
            return state;
    }   
};

export default reducer;