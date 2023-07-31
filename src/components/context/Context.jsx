import React, { createContext, useState, useEffect } from "react";

import { fetchDataFromApi } from "../../utils/api";
export const Context = createContext();

export const AppContext = (props) => {

    const [genresList, setGenresList] = useState({})

    useEffect(() => {
        genresCall();
    },[]);
    
      
    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};
        
        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });
        
        setGenresList(allGenres);
    };

    return (
        <Context.Provider
            value={{
                genresList
            }}
        >
            {props.children}
        </Context.Provider>
    );
};