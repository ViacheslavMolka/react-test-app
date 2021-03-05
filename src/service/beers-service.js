export default class BeersService {
    getData = async () => {
        const res = await fetch('https://api.punkapi.com/v2/beers/')
        const data = await res.json();
        return data;
    }
    getComment = async (id) => {
        const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
        const data = await res.json();
        return data;
    }
}