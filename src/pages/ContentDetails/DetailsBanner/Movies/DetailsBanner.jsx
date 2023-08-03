import React, { useEffect } from 'react';
import "./DetailsBanner.scss";
import { url, toHoursAndMinutes, getNumber, openInNewTab } from '../../../../utils/constants';
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

    let code ="IN";

    let { name } = useParams();
    name = name?.split('-').join(' ');
    let video = '', trailerFound = 0, releaseDateFound = 0, NAForIndia = 0, NAForUSA = 0, NAForJapan = 0, certificationFound=0, NAForIndia1 = 0, NAForUSA1 = 0, NAForJapan1 = 0;
    let releaseDate = "";
    let certification = "";

    const navigate = useNavigate();
    const genres = data?.genres?.map((g) => g.id);

    let director = credits?.crew?.filter((f) => f.job === "Director");
    director = director?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    let writer = credits?.crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );
    writer = writer?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    
    const { data: release_date, loading: release_date_loading } = useFetch(`/movie/${id}/release_dates`);
    
    if(release_date_loading === false && loading === false){
        for(let i=0; i<release_date?.results?.length; i++){
            release_date?.results?.[i]?.release_dates?.sort((a, b)=> !a.release_date - !b.release_date || a.release_date.localeCompare(b.release_date));
        }
        for(let i=0; i<release_date?.results?.length; i++){
            if(release_date?.results?.[i]?.iso_3166_1 === "IN"){
                for(let k=0; k<release_date?.results?.[i]?.release_dates?.length; k++){
                    releaseDateFound = 1;
                    NAForIndia = 1;
                    releaseDate = release_date?.results?.[i]?.release_dates[k]?.release_date;
                    break;
                }
            }
        }
        if(releaseDateFound === 0 && NAForIndia === 0){
            for(let i=0; i<release_date?.results?.length; i++){
                if(release_date?.results?.[i]?.iso_3166_1 === "US"){
                    for(let k=0; k<release_date?.results?.[i]?.release_dates?.length; k++){
                        code="US";
                        releaseDateFound = 1;
                        NAForUSA = 1;
                        releaseDate = release_date?.results?.[i]?.release_dates[k]?.release_date;
                        break;
                    }
                }
            }
        }if(releaseDateFound === 0 && NAForIndia === 0 && NAForUSA === 0){
            for(let i=0; i<release_date?.results?.length; i++){
                if(release_date?.results?.[i]?.iso_3166_1 === "JP"){
                    for(let k=0; k<release_date?.results?.[i]?.release_dates?.length; k++){
                        code="JP";  
                        releaseDateFound = 1;
                        NAForJapan = 1;
                        releaseDate = release_date?.results?.[i]?.release_dates[k]?.release_date;
                        break;
                    }
                }
            }
        }if(releaseDateFound === 0 && NAForIndia === 0 && NAForUSA === 0 && NAForJapan === 0){
            for(let k=0; k<release_date?.results?.[0]?.release_dates?.length; k++){
                code = release_date?.results?.[0]?.iso_3166_1;
                releaseDate = release_date?.results?.[0]?.release_dates[k]?.release_date;
            }
        }
        for(let i=0; i<release_date?.results?.length; i++){
            if(release_date?.results?.[i]?.iso_3166_1 === "IN"){
                if(release_date?.results?.[i]?.release_dates[0]?.certification){
                    certificationFound = 1;
                    NAForIndia1 = 1;
                    certification = release_date?.results?.[i]?.release_dates[0]?.certification;
                    break;
                }
            }
        }if(certificationFound === 0 && NAForIndia1 === 0){
            for(let i=0; i<release_date?.results?.length; i++){
                if(release_date?.results?.[i]?.iso_3166_1 === "US"){
                    if(release_date?.results?.[i]?.release_dates[0]?.certification){
                        certificationFound = 1;
                        NAForUSA1 = 1;
                        certification = release_date?.results?.[i]?.release_dates[0]?.certification;
                        break;
                    }
                }
            }
        }if(certificationFound === 0 && NAForIndia1 === 0 && NAForUSA1 === 0){
            for(let i=0; i<release_date?.results?.length; i++){
                if(release_date?.results?.[i]?.iso_3166_1 === "JP"){
                    if(release_date?.results?.[i]?.release_dates[0]?.certification){
                        certificationFound = 1;
                        NAForJapan1 = 1;
                        certification = release_date?.results?.[i]?.release_dates[0]?.certification;
                        break;
                    }
                }
            }
        }if(certificationFound === 0 && NAForIndia1 === 0 && NAForUSA1 === 0 && NAForJapan1 === 0){
            for(let i=0; i<release_date?.results?.length; i++){
                if(release_date?.results?.[i]?.release_dates[0]?.certification){
                    certification = release_date?.results?.[i]?.release_dates[0]?.certification;
                }
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
        <div className="detailsBanner">
            {loading === false ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        <Img
                                            className={`posterImg ${(data?.status === "Released" && dayjs(releaseDate).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")) ? 'round' : null }`}
                                            src={
                                                data?.poster_path ?
                                                url + data?.poster_path
                                                :
                                                NoPosterImg
                                            }
                                            alt=''
                                        />
                                        {
                                            ( data?.status === "Released" && dayjs(releaseDate).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD") ) &&
                                            <div className='play_movie'
                                                onClick={() => {
                                                    let movieName = name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                                    navigate(`/${id}/${movieName}/streaming-online`);
                                                }}
                                            >
                                                Watch Online
                                            </div>
                                        }
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            { data?.title ? `${data?.title} ` : `${name} `}
                                            {data?.release_date ? `(${dayjs(data?.release_date).format("YYYY")})` : null}
                                        </div>
                                        <div className="subtitle">
                                            {data?.tagline}
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
                                                    { data?.overview ? data?.overview : "There is no description available for this movie." }
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
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {releaseDate ? `${dayjs(releaseDate).format("MMM D, YYYY")} (${code})` : dayjs(data?.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.runtime !== 0 && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes( data?.runtime )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    
                                        {
                                            ( data?.revenue && data?.budget ) ?
                                            <div className="info">
                                                {data?.budget && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Budget:{" "}
                                                        </span>
                                                        <span className="text">
                                                            ${getNumber(data?.budget)}
                                                        </span>
                                                    </div>
                                                )}
                                                {data?.revenue && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Revenue:{" "}
                                                        </span>
                                                        <span className="text">
                                                            ${getNumber(data?.revenue)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            null
                                        }

                                        {/* {data?.spoken_languages?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Language:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.spoken_languages?.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.english_name}
                                                            {data?.spoken_languages?.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )} */}

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.name}
                                                            {director?.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.name}
                                                            {writer?.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
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
                <div className="moviesdetailsBannerSkeleton">
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