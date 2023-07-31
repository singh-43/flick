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
    const [countryName, setCountryName] = useState('')

    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
    const { data: video, loading: videosLoading } = useFetch(`/${mediaType}/${id}/videos`);

    if(video){
        video?.results?.sort((a, b)=> !a.published_at - !b.published_at || a.published_at.localeCompare(b.published_at));
    }
    if(mediaType === "tv"){
        data?.seasons?.sort((a, b)=> a?.season_number - b?.season_number  || a.season_number.localeCompare(b.season_number));
    }

    const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            setCountryName(data?.country_name);
        }).catch((error) => {
            console.log(error);
        });
    };

    let code = countries?.find(country => country.name === countryName)?.code;

    let collectionSeason;
    if(mediaType === "tv"){
        collectionSeason = data?.seasons?.filter((f) => f.season_number === data?.last_episode_to_air?.season_number);
    }

    useEffect(() => {
        getGeoInfo();
    },[])

    return (
        <div>
            {
                mediaType === "movie" ?
                <MovieDetails code={code} data={data} loading={loading} videos={video} credits={credits} id={id} />
                    :
                <SeriesDetails data={data} code={code} loading={loading} videos={video} credits={credits} id={id}  />
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
                <SeriesCollection loading={loading} next_episode_to_air={data?.next_episode_to_air} series_name={data?.name} series_id={data?.id} status={data?.status} data={collectionSeason?.[0]} />
            }
            <Similar mediaType={mediaType} id={id} />
            <Recommendations mediaType={mediaType} id={id} />
        </div>
    )
}

export default ContentDetails;

