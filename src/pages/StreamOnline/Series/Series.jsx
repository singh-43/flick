import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Series.scss"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import serverPic from "../../../assets/images/server.png"
import Similar from "../../ContentDetails/ContentSuggestion/Similar";
import Recommendations from "../../ContentDetails/ContentSuggestion/Recommendations";
import useFetch from '../../../hooks/useFetch';
import dayjs from 'dayjs';
import { fetchDataFromApi } from '../../../utils/api';

const Series = () => {

    const navigate = useNavigate();
    let { id, seriesName} = useParams();

    const server_number = useRef(1)
    const season_number = useRef(1)
    const episode_number = useRef(1)

    let imdb_id = "";
    let season_list = [],season_list1 = [];;

    const { data: seasonList, loading: seasonList_loading } = useFetch(`/tv/${id}`);
    if(seasonList?.seasons?.length > 1){
        for(let i=0; i<seasonList?.seasons?.length-1; i++){
            if(seasonList?.seasons[i]?.season_number !== 0){
                season_list.push(seasonList?.seasons[i]);
            }
        }
        if(dayjs(seasonList?.seasons[seasonList?.seasons?.length-1]?.air_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
            season_list.push(seasonList?.seasons[seasonList?.seasons?.length-1])
        }
    }else{
        season_list.push(seasonList?.seasons[0]);
    }
    season_list?.episodes?.sort((a, b)=> b?.season_number - a?.season_number);
    if(seasonList?.seasons?.length > 1){
        for(let i=0; i<seasonList?.seasons?.length-1; i++){
            if(seasonList?.seasons?.[0]?.season_number !== 0){
                season_list1.push(seasonList?.seasons[i]);
            }
            season_list1.push(seasonList?.seasons[i]);
        }
        if(dayjs(seasonList?.seasons[seasonList?.seasons?.length-1]?.air_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
            season_list1.push(seasonList?.seasons[seasonList?.seasons?.length-1])
        }
    }else{
        season_list1.push(seasonList?.seasons[0]);
    }
    season_list1?.episodes?.sort((a, b)=> b?.season_number - a?.season_number);

    const [container, setContainer] = useState([])
    const fetchInitialData = () => {
        for(let i=1; i<season_list1?.length; i++){
            fetchDataFromApi(`/tv/${id}/season/${season_list1[i]?.season_number}`).then((res) => {
                setContainer((prev) => [...prev, res?.episodes[0]]);
            });
        }    
    };
    let first = [];
    for(let i=0; i<container?.length; i++){
        if(dayjs(container[i]?.air_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
            first.push(container[i]);
        }
    }
    first?.sort((a, b)=> a?.season_number - b?.season_number);
    
    useEffect(() => {
        fetchInitialData();
    },[seasonList_loading === false])

    let episode_list = [];
    let { data: episodeList, loading: episodeList_loading } = useFetch(`/tv/${id}/season/${season_number.current}`);
    if(episodeList?.episodes?.[season_list?.length-1]?.season_number !== season_list[season_list?.length-1]?.season_number){
        for(let i=0; i<episodeList?.episodes?.length; i++){    
            episode_list.push(episodeList?.episodes[i]);
        }
    }else{
        for(let i=0; i<episodeList?.episodes?.length; i++){
            if(dayjs(episodeList?.episodes[i]?.air_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
                episode_list.push(episodeList?.episodes[i])
            }
        }
    }
    episode_list?.sort((a, b)=> b?.episode_number - a?.episode_number);

    const { data: external_ids, loading: external_ids_loading } = useFetch(`/tv/${id}/external_ids`);
    if(external_ids_loading === false){
        imdb_id = external_ids?.imdb_id;
    }

    seriesName = seriesName?.split('-').join(' ');
    const [serverSource, setServerSource] = useState(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number.current}&e=${episode_number.current}`)

    return (
        <div className='streamingSeries'>
            <>
                <ContentWrapper>
                    <div className='name'>
                        <div className='home'
                            onClick={() => {
                                navigate('/')
                            }}
                        >Home</div>
                        <div>{` / `}</div>
                        <div  className='series'
                            onClick={() => {
                                navigate('/discover/tv')
                            }}
                        >Tv Shows</div>
                        <div>{` / `}</div>
                        <div className='details'
                            onClick={() =>{
                                let name = seriesName?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                navigate(`/tv/${id}/${name}`)
                            }}
                        >{seriesName}</div>
                        <div>{` / `}</div>
                        <div>Season {season_number.current}</div>
                        <div>{` / `}</div>
                        <div>Episode {episode_number.current}</div>
                    </div>
                    <div className='player'>
                        <div className='alert'>⚠️ If server 1 doesn't work please use server 2, server 3 or server 4. If the player is showing ads use an adblocker. Thanks for understanding.</div>
                        <iframe src={serverSource} width="100%" height="100%" frameBorder="0" scrolling='no' allowFullScreen={true} ></iframe>
                    </div>
                    <div className='seasonSelect'>
                    {
                        season_list?.map((item, index) => (
                            <div className={`seasonSelectItem ${ (season_number.current === item?.season_number) ? `makeBlue` : null} `} key={index}
                                onClick={() => {
                                    season_number.current = item?.season_number;
                                    episode_number.current = first[ season_number.current - 1]?.episode_number;
                                    setServerSource(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number.current}&e=${episode_number.current}`)
                                }}
                            >
                                Season {item?.season_number}
                            </div>
                        ))
                    }
                    </div>
                    <div className='servers'>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 1</span>
                            </div>
                            <div className='episodeSelect'>
                            {
                                 episode_list?.map((item,index) => (
                                    <div className={`episodeSelectItem ${((server_number.current === 1) && (episode_number.current === item?.episode_number)) ? `makeBlue` : null} `} key={index}
                                        onClick={() => {
                                            episode_number.current = item?.episode_number;
                                            server_number.current = 1;
                                            setServerSource(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number.current}&e=${item?.episode_number}`)
                                        }}
                                    >{(server_number.current === 1) && (episode_number.current === item?.episode_number) ? `▶️` : null}Episode {item?.episode_number}: {item?.name}</div>
                                ))
                            }
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 2</span>
                            </div>
                            <div className='episodeSelect'>
                            {
                                episode_list?.map((item,index) => (
                                    <div className={`episodeSelectItem ${((server_number.current === 2) && (episode_number.current === item?.episode_number)) ? `makeBlue` : null} `} key={index}
                                        onClick={() => {
                                            episode_number.current = item?.episode_number;
                                            server_number.current = 2;
                                            setServerSource(`https://www.2embed.cc/embedtv/${imdb_id}&s=${season_number.current}&e=${episode_number.current}`)
                                        }}
                                    >{(server_number.current === 2) && (episode_number.current === item?.episode_number) ? `▶️` : null}Episode {item?.episode_number}: {item?.name}</div>
                                ))
                            }
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 3</span>
                            </div>
                            <div className='episodeSelect'>
                            {
                                episode_list?.map((item,index) => (
                                    <div className={`episodeSelectItem ${((server_number.current === 3) && (episode_number.current === item?.episode_number)) ? `makeBlue` : null} `} key={index}
                                        onClick={() => {
                                            episode_number.current = item?.episode_number;
                                            server_number.current = 3;
                                            setServerSource(`https://vidsrc.me/embed/tv?tmdb=${id}&season=${season_number.current}&episode=${episode_number.current}`)
                                        }}
                                    >{(server_number.current === 3) && (episode_number.current === item?.episode_number) ? `▶️` : null}Episode {item?.episode_number}: {item?.name}</div>
                                ))
                            }
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 4</span>
                            </div>
                            <div className='episodeSelect'>
                            {
                                 episode_list?.map((item,index) => (
                                    <div className={`episodeSelectItem ${((server_number.current === 4) && (episode_number.current === item?.episode_number)) ? `makeBlue` : null} `} key={index}
                                        onClick={() => {
                                            episode_number.current = item?.episode_number;
                                            server_number.current = 4;
                                            setServerSource(`https://remotestre.am/e/?tmdb=${id}&s=${season_number.current}&e=${episode_number.current}`)
                                        }}
                                    >{(server_number.current === 4) && (episode_number.current === item?.episode_number) ? `▶️` : null}Episode {item?.episode_number}: {item?.name}</div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
                <Similar mediaType={"tv"} id={id} />
                <Recommendations mediaType={"tv"} id={id} />
            </>
        </div>
    )
}

export default Series;