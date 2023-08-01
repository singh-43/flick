import React, { useEffect } from 'react';
import "./DetailsBanner.scss";
import { url, openInNewTab, toHoursAndMinutes } from '../../../../utils/constants';
import Genres from '../../../../components/genres/Genres';
import Img from '../../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../../components/contentWrapper/ContentWrapper';
import NoPosterImg from "../../../../assets/images/no-poster.png";
import dayjs from 'dayjs';
import CircleRating from '../../../../components/CircleRating/CircleRating';
import { PlayIcon } from "../../../../components/Playbtn/Playbtn";
import { useNavigate, useParams } from 'react-router';
import useFetch from '../../../../hooks/useFetch';
import { ReadMore } from '../../../../utils/constants';

const DetailsBanner = ({ data, loading, videos, credits, id }) => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    // console.log(data)

    let { name } = useParams();
    name = name?.split('-').join(' ')

    const navigate = useNavigate();
    const genres = data?.genres?.map((g) => g.id);

    let creator = [];
    data?.created_by?.map((d) => (
        creator.push(d?.name)
    ))
    if(loading === false && data?.created_by?.length === 0){
        let writer = credits?.crew?.filter(
            (f) => f.job === "Manga" || f.job === "Author" || f.job === "Comic Book" || f.job === "Novel" || f.job === "Original Series Creator" || f.job === "Writer"
        );
        writer = writer?.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )
        writer?.map((d) => (
            creator.push(d?.name)
        ))
    }

    let video = '', trailerFound = 0, certificationFound = 0, NAForIndia = 0, NAForUSA = 0, NAForJapan = 0;
    let certification = "";
    const { data: rating, loading: rating_loading } = useFetch(`/tv/${id}/content_ratings`);
    console.log(rating?.results)
    
    if(rating_loading === false && loading === false){
        for(let i=0; i<rating?.results?.length; i++){
            if(rating?.results?.[i]?.iso_3166_1 === "IN"){
                if(rating?.results?.[i]?.rating){
                    certificationFound = 1;
                    NAForIndia = 1;
                    certification = rating?.results?.[i]?.rating;
                    break;
                }
            }
        }if(certificationFound === 0 && NAForIndia === 0){
            for(let i=0; i<rating?.results?.length; i++){
                if(rating?.results?.[i]?.iso_3166_1 === "US"){
                    if(rating?.results?.[i]?.rating){
                        certificationFound = 1;
                        NAForUSA === 0
                        certification = rating?.results?.[i]?.rating;
                        break;
                    }
                }
            }
        }else if(certificationFound === 0 && NAForIndia === 0 && NAForUSA === 0){
            for(let i=0; i<rating?.results?.length; i++){
                if(rating?.results?.[i]?.iso_3166_1 === "JP"){
                    if(rating?.results?.[i]?.rating){
                        certificationFound = 1;
                        NAForJapan === 0;
                        certification = rating?.results?.[i]?.rating;
                        break;
                    }
                }
            }
        }else if(certificationFound === 0 && NAForIndia === 0 && NAForUSA === 0 && NAForJapan === 0 ){
            if(rating?.results?.[0]?.rating){
                certification = rating?.results?.[0]?.rating;
            }
        }
    }

    for(let i=0; i<videos?.results?.length; i++){
        if(videos?.results?.[i]?.name?.toLowerCase().search("official trailer") !== -1){
            trailerFound = 1;
            video = videos?.results?.[i]?.key;
            break;
        }
    }if(!trailerFound){
        for(let i=0; i<videos?.results?.length; i++){
            if(videos?.results?.[i]?.name?.toLowerCase().search("trailer") !== -1){
                trailerFound = 1;
                video = videos?.results?.[i]?.key;
                break;
            }
        }
    }if(!trailerFound){
        for(let i=0; i<videos?.results?.length; i++){
            if(videos?.results?.[i]?.name?.toLowerCase().search("teaser trailer") !== -1){
                trailerFound = 1;
                video = videos?.results?.[i]?.key;
                break;
            }
        }
    }if(!trailerFound){
        for(let i=0; i<videos?.results?.length; i++){
            if(videos?.results?.[i]?.name?.toLowerCase().search("official teaser") !== -1){
                trailerFound = 1;
                video = videos?.results?.[i]?.key;
                break;
            }
        }
    }if(!trailerFound){
        for(let i=0; i<videos?.results?.length; i++){
            if(videos?.results?.[i]?.name?.toLowerCase().search("teaser") !== -1){
                trailerFound = 1;
                video = videos?.results?.[i]?.key;
                break;
            }
        }
    }
    
    return (
        <div className="seriesdetailsBanner">
            {loading === false ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        <Img
                                            className={`posterImg ${data?.last_air_date !== null ? 'round' : null }`}
                                            src={
                                                data?.poster_path ?
                                                url + data?.poster_path
                                                :
                                                NoPosterImg
                                            }
                                        />      
                                        {
                                            data?.last_air_date !== null &&
                                            <div className='play_movie'
                                                onClick={() => {
                                                    let seriesName = name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                                    navigate(`/series/${id}/${seriesName}/streaming-online`)
                                                }}
                                            >
                                                Watch Online
                                            </div>
                                        }                                  
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            { data?.name ? `${data.name} ` : `${name} `}
                                            { data?.first_air_date ? `(${dayjs(data?.first_air_date).format("YYYY")})` : null }
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <div className='rating_genres'>
                                        {
                                            certification ? <div className='rating'>Rating: {certification}</div> : null
                                        }
                                            <Genres data={genres} />
                                        </div>

                                        <div className="row">
                                            <CircleRating rating={ data?.vote_average ? data?.vote_average?.toFixed(1) : "NA" } />
                                            { video ? 
                                                (
                                                    <div
                                                        className="playbtn"
                                                        onClick={() => {
                                                                navigate(openInNewTab(`https://www.youtube.com/watch?v=${video}`))
                                                        }}
                                                    >
                                                        <PlayIcon />
                                                        <span className="text">
                                                            Watch Trailer
                                                        </span>
                                                    </div>
                                                ) : null 
                                            }
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                <ReadMore>
                                                    { data?.overview ? data?.overview : "There is no description available for this series." }
                                                </ReadMore>
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data?.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        { data.status === "Returning Series" ? "Running" : data.status }
                                                    </span>
                                                </div>
                                            )}
                                            {data?.first_air_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Start Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        { data.first_air_date ? dayjs(data.first_air_date).format("MMM D, YYYY") : "------" }
                                                    </span>
                                                </div>
                                            )}
                                            { ( data?.last_air_date || data?.next_episode_to_air?.length > 0 ) && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        { data?.status === "Returning Series" ? "Next Episode" : "End Date" }
                                                    </span>
                                                    <span className="text">
                                                        { data?.status === "Returning Series" ? 
                                                            data?.next_episode_to_air?.length !== 0 && data?.next_episode_to_air?.air_date  ? dayjs(data?.next_episode_to_air?.air_date).format("MMM D, YYYY") : "------"
                                                            : 
                                                            dayjs(data.last_air_date).format("MMM D, YYYY") }
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="info">
                                            {data?.number_of_seasons && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Seasons:{" "}
                                                    </span>
                                                    <span className="text">
                                                        { data.number_of_seasons }
                                                    </span>
                                                </div>
                                            )}
                                            {data?.number_of_episodes && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Episodes:{" "}
                                                    </span>
                                                    <span className="text">
                                                        { data.number_of_episodes }
                                                    </span>
                                                </div>
                                            )}
                                            {data?.episode_run_time?.length > 0 && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        { data.episode_run_time ? data?.episode_run_time <= 60 ? `${ data.episode_run_time }m`
                                                        : toHoursAndMinutes(data.episode_run_time) : "------" }
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* {data?.spoken_languages?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Language:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.spoken_languages?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.english_name}
                                                            {data?.spoken_languages?.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )} */}

                                        {creator?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {creator?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d}
                                                                {creator
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="seriesdetailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;