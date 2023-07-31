import "./CollectionDetails.scss";
import React, { useEffect, useState } from 'react';
import Img from "../../../../components/lazyLoadImage/Img";
import { url, getNumber } from "../../../../utils/constants";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import NoPosterImg from "../../../../assets/images/no-poster.png";
import Genres from "../../../../components/genres/Genres";
import { fetchDataFromApi } from "../../../../utils/api";
import CircleRating from "../../../../components/CircleRating/CircleRating";

const CollectionDetails = ({ data, loading }) => {

    const [container, setContainer] = useState([]);

    const fetchInitialData = () => {
        for(let i=0; i<data?.parts?.length; i++){
            fetchDataFromApi(`/movie/${data?.parts?.[i]?.id}`).then((res) => {
                setContainer((prev) => [...prev, res]);
            });
        }    
    };

    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    
    useEffect(() => {
        fetchInitialData();
        //eslint-disable-next-line
    },[loading === false])
    
    let rate = container?.map((i) => {
        return i?.vote_average
    })
    rate = rate?.filter((f) => f !== 0 )
    const rating = rate.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0)/rate?.length;
    
    const rev = container?.map((i) => {
        return i?.revenue
    })
    let revenue = ""
    revenue = rev.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    let genres = container?.map((i) => {
        return i?.genres
    })
    let genresList = [];
    genres?.map((i) => (
        i?.map((k) => (
            genresList.push(k)
        ))
    ))
    genresList = genresList?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name
        ))
    )
    const _genres = genresList?.map((g) => g.id);


    return (
        <div className="moviesCollectionDetails">
        {
            loading === false ?
            (
                <React.Fragment>
                    <div className="backdrop-img">
                        <Img src={
                                  url + data?.backdrop_path
                                } 
                        />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="moviesCollectionDetailsItems">
                            <div className="moviesCollectionDetailsLeft">
                                <Img
                                    className="posterImg"
                                    src={
                                        data?.poster_path ?
                                        url + data?.poster_path
                                        :
                                        NoPosterImg
                                    }
                                    alt=''
                                />
                            </div>
                            <div className="moviesCollectionDetailsRight">
                                <div className="title">
                                    { data?.name }
                                </div>
                                <div className='rating_genres'>
                                    <Genres data={_genres} />
                                </div>
                                <div className="rating">
                                    <CircleRating rating={ rating ? rating?.toFixed(1) : "NA" } />
                                </div>
                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        { data?.overview ? data?.overview : "There is no description available for this movie." }
                                    </div>
                                </div>
                                
                                {data?.parts?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Number of Movies:{" "}
                                        </span>
                                        <span className="text">
                                            { data?.parts?.length }
                                        </span>
                                    </div>
                                )}

                                {revenue !== 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Revenue:{" "}
                                        </span>
                                        <span className="text">
                                            ${ getNumber(revenue) }
                                        </span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </ContentWrapper>
                </React.Fragment>
            )
            :
            (
                <div className="moviesCollectionDetailsSkeleton">
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
            )
        }
        </div>
    )
}

export default CollectionDetails;