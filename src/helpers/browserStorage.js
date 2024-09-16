import React from 'react'

const fetchUserFavMovies=(sessionKey)=>{
    const movies = JSON.parse(sessionStorage.getItem(sessionKey));

    if (movies) {
    console.log('Movies retrieved from sessionStorage:', movies);
    return movies;
    } else {
    console.log('No movies found in sessionStorage.');
    return null;
    }
}

export {
    fetchUserFavMovies
}