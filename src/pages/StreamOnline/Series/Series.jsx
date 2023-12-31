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
    let first = [];    
    let episode_list = [];
    const season_number = useRef(1)
    const episode_number = useRef(1)
    const episodeName = useRef('')
    let season_list = [],season_list1 = [];
    const serverList = [1,2,3,4]
    const [container, setContainer] = useState([])
    const [serverSource, setServerSource] = useState(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number.current}&e=${episode_number.current}`);

    const playServer = (server_number) => {
        if(server_number.current === 1)
            setServerSource(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number.current}&e=${episode_number.current}`)
        if(server_number.current === 2)
            setServerSource(`https://vidsrc.to/embed/tv/${id}/${season_number.current}/${episode_number.current}`)
        if(server_number.current === 3)
            setServerSource(`https://www.2embed.cc/embedtv/${id}&s=${season_number.current}&e=${episode_number.current}`)
        // if(server_number.current === 2)
        //     setServerSource(`https://www.2embed.cc/embedtv/${id}&s=${season_number.current}&e=${episode_number.current}`)
        // if(server_number.current === 3)
        //     setServerSource(`https://vidsrc.me/embed/tv?tmdb=${id}&season=${season_number.current}&episode=${episode_number.current}`)
        if(server_number.current === 4)
            setServerSource(`https://remotestre.am/e/?tmdb=${id}&s=${season_number.current}&e=${episode_number.current}`)
    }

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

    const fetchInitialData = () => {
        for(let i=1; i<season_list1?.length; i++){
            fetchDataFromApi(`/tv/${id}/season/${season_list1[i]?.season_number}`).then((res) => {
                setContainer((prev) => [...prev, res?.episodes[0]]);
            });
        }    
    };

    for(let i=0; i<container?.length; i++){
        if(dayjs(container[i]?.air_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
            first.push(container[i]);
        }
    }
    first?.sort((a, b)=> a?.season_number - b?.season_number);
    
    useEffect(() => {
        fetchInitialData();
    },[seasonList_loading === false])


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

    seriesName = seriesName?.split('-').join(' ');


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
                        <div>Season {season_number.current < 10 ? `0${season_number.current}` : season_number.current}</div>
                        <div>{` / `}</div>
                        <div>Episode {episode_number.current < 10 ? `0${episode_number.current}` : episode_number.current}</div>
                        <div>{` - `}</div>
                        <div>{episodeName.current === '' ? episode_list[episode_list?.length - 1]?.name : episodeName.current}</div>
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
                                    episodeName.current = '';
                                    season_number.current = item?.season_number;
                                    episode_number.current = first[ season_number.current - 1]?.episode_number;
                                    playServer(server_number);
                                }}  
                            >
                                Season {item?.season_number < 10 ? `0${item?.season_number}` : item?.season_number} 
                            </div>
                        ))
                    }
                    </div>
                    <div className='servers'>
                        <div className='server'>
                            {
                                serverList?.map((item, index) => (
                                    <div className='serverNumber' key={index}>
                                        <img className='serverPic' src={serverPic} alt='' />
                                        <span className={`serverName serverSelect ${(server_number.current === index + 1) ? `makeBlue` : null}`}
                                            onClick={() => {
                                                server_number.current = index + 1;
                                                playServer(server_number);
                                            }}
                                        >Server {index+1}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='episodeList'>
                            <div className='episodeSelect'>
                            {
                                 episode_list?.map((item,index) => (//98 90 83
                                    <div className={` ${episode_list[0]?.episode_number.toString()?.length <= 2 ? `eight_three` : episode_list[0]?.episode_number.toString()?.length === 3 ? `eight_nine` : `nine_eight` } episodeSelectItem ${episode_number.current === item?.episode_number ? `makeBlue` : null} `} key={index}
                                        onClick={() => {
                                                episodeName.current = item?.name;
                                                episode_number.current = item?.episode_number;
                                                playServer(server_number);

                                        }}
                                    >Episode {item?.episode_number.toString()?.length < episode_list[0]?.episode_number.toString()?.length || episode_list[0]?.episode_number.toString()?.length < 2 ? `0${item?.episode_number}` : item?.episode_number}</div>
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
