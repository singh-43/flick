import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./Card.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../CircleRating/CircleRating";
import NoPosterImg from "../../assets/images/no-poster.png";
import { url, isoLangs } from "../../utils/constants";
import Genres from "../genres/Genres";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    
    const navigate = useNavigate();

    let lang = (code) => {
        return isoLangs[code]?.name;
    };

    return (
        <div
            className="movieCard"
        >
            <div className="posterBlock"
                onClick={() =>{
                    let title = ( data?.title || data?.name )?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                    navigate(`/${data.media_type || mediaType}/${data.id}/${title}`)
                }}
            >
                <Img className="posterImg" 
                    src={ ( data?.poster_path || data?.backdrop_path ) ? 
                        url+`${ data?.poster_path || data?.backdrop_path }`
                        :
                        NoPosterImg 
                    }
                />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={ data?.vote_average !== 0 ? data?.vote_average?.toFixed(1) : "NA" } />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <div className="info">
                    <span>
                        { 
                            (data?.release_date) !== "" ?
                            dayjs(data?.release_date).format("DD-MM-YYYY") 
                            :
                            "NA"          
                        }
                    </span>
                    <span>{ lang(data?.original_language) }</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;