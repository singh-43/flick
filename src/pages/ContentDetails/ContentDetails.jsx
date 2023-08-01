import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useFetch from "../../hooks/useFetch";
import MovieDetails from "./DetailsBanner/Movies/DetailsBanner"
import SeriesDetails from "./DetailsBanner/TvSeries/DetailsBanner"
import Cast from "./Cast/Cast";
import MoviesOfficialVideos from "./OfficialVideos/MoviesOfficialVideos";
import SeriesOfficialVideos from "./OfficialVideos/SeriesOfficialVideos";
import Recommendations from "./ContentSuggestion/Recommendations";
import Similar from "./ContentSuggestion/Similar";
import axios from 'axios';
import { countries } from '../../utils/constants';
import SeriesCollection from "./Collection/Tv/Collection";
import MoviesCollection from "./Collection/Movies/Collection";

const ContentDetails = () => {

    const { id, mediaType } = useParams();

    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
    const { data: video, loading: videosLoading } = useFetch(`/${mediaType}/${id}/videos`);

    if(video){
        video?.results?.sort((a, b)=> !a.published_at - !b.published_at || a.published_at.localeCompare(b.published_at));
    }
    if(mediaType === "tv"){
        data?.seasons?.sort((a, b)=> a?.season_number - b?.season_number  || a.season_number.localeCompare(b.season_number));
    }

    let collectionSeason;
    if(mediaType === "tv"){
        if(data?.seasons?.length > 1){
            collectionSeason = data?.seasons?.filter((f) => f.season_number === data?.last_episode_to_air?.season_number);
        }else {
            collectionSeason = data?.seasons
        }
    }

    return (
        <div>
            {
                mediaType === "movie" ?
                <MovieDetails data={data} loading={loading} videos={video} credits={credits} id={id} />
                    :
                <SeriesDetails data={data} loading={loading} videos={video} credits={credits} id={id}  />
            }
            <Cast data={credits?.cast} loading={creditsLoading} />
            {
                mediaType === "movie" ?
                <MoviesOfficialVideos data={video} loading={videosLoading}/>
                :
                <SeriesOfficialVideos data={video} loading={videosLoading}/>

            }
            {
                mediaType === "movie" ?
                data?.belongs_to_collection != null && <MoviesCollection id={data?.belongs_to_collection?.id} /> 
                :
                <SeriesCollection loading={loading} first_air_date={data?.first_air_date} next_episode_to_air={data?.next_episode_to_air} series_name={data?.name} series_id={data?.id} status={data?.status} data={collectionSeason?.[0]} />
            }
            <Similar mediaType={mediaType} id={id} />
            <Recommendations mediaType={mediaType} id={id} />
        </div>
    )
}

export default ContentDetails;

