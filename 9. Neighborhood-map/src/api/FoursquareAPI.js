import {foursquare_client_id, foursquare_client_secret} from './ApiKeys.js';
const date = '20180808';

function handleErrors(response) {
    const code = response.meta.code;

    if (!(code >= 200 && code < 300)) throw Error(response.status);
        
    return response;
}

export const getAll = () => {
    const request = 'https://api.foursquare.com/v2/venues/search?near=Sankt+Peterburg&intent=browse&radius=15000&limit=15&query=museum,cathedral&client_id=' + foursquare_client_id + '&client_secret=' + foursquare_client_secret + '&v=' + date;
    
    return fetch(request)
        .then(res => res.json())
        .then(res => handleErrors(res))
        .then(venues => venues.response.venues)
        .catch(err => alert('Error loading places from Foursquare.com. Searching places is not available :('));
}