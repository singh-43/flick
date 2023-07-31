import React,{ useContext } from "react";
import "./Genres.scss";
import { Context } from "../context/Context";

const Genres = ({ data }) => {

    const { genresList } = useContext(Context);

    return (
        <div className="genres">
            {data?.map((g) => {
                //eslint-disable-next-line
                if (!genresList[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genresList[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;