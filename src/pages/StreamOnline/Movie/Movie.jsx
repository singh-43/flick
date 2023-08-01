import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Movie.scss"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import serverPic from "../../../assets/images/server.png"
import Similar from "../../ContentDetails/ContentSuggestion/Similar";
import Recommendations from "../../ContentDetails/ContentSuggestion/Recommendations";
import useFetch from '../../../hooks/useFetch';
import { fetchDataFromApi } from '../../../utils/api';
import dayjs from 'dayjs';

const Movie = () => {

    const navigate = useNavigate();
    let { id, movieName } = useParams();
    const [container, setContainer] = useState([])

    
    let currentPart = useRef();
    const { data, loading } = useFetch(`/movie/${id}`);
    let collection_id;
    if(data?.belongs_to_collection !== null){
        collection_id = data?.belongs_to_collection?.id
    }
    const { data: collectionData, loading: collectionData_loading } = useFetch(`/collection/${collection_id}`);
    let collection = [];
    for(let i=0; i<collectionData?.parts?.length; i++){
        if(dayjs(collectionData?.parts[i]?.release_date).format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")){
            collection.push(collectionData?.parts[i])
        }
    }
    collection?.sort((a, b)=> !a?.release_date - !b?.release_date  || a.release_date.localeCompare(b.release_date));
    for(let i=0; i<collection?.length; i++){
        if(collection[i]?.id === data?.id){
            currentPart.current = i;
            break
        }
    }
    let server_number = useRef(1);
    movieName = movieName?.split('-').join(' ');
    const [serverSource, setServerSource] = useState(`https://multiembed.mov/?video_id=${id}&tmdb=1`)

    return (
        <div className='streamingMovie'>
            <>
                <ContentWrapper>
                    <div className='name'>
                        <div className='home'
                            onClick={() => {
                                navigate('/')
                            }}
                        >Home</div>
                        <div>{` / `}</div>
                        <div  className='movies'
                            onClick={() => {
                                navigate('/discover/movie')
                            }}
                        >Movies</div>
                        <div>{` / `}</div>
                        <div className='details'
                            onClick={() =>{
                                let name = movieName?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                navigate(`/movie/${id}/${name}`)
                            }}
                        >{data?.title}</div>
                    </div>
                    <div className='player'>
                        <div className='alert'>⚠️ If server 1 doesn't work please use server 2, server 3 or server 4. If he player is showing ads use an adblocker. Thanks for understanding.</div>
                        <iframe src={serverSource} width="100%" height="100%" frameBorder="0" scrolling='no' allowFullScreen={true} ></iframe>
                    </div>
                    {
                        data?.belongs_to_collection !== null &&
                        <div className='collectionStream'>
                            <div>Part of the {data?.belongs_to_collection?.name}</div>
                            <div className='collectionStreamItem'>
                            {
                                collection?.map((item,index) => (
                                    <div className={`collectionStreamItems ${ currentPart.current === index ? 'makeBlue' : null }`} key={index}
                                        onClick={() => {  
                                            currentPart.current = index;
                                            movieName = item?.title?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                            navigate(`/${item?.id}/${movieName}/streaming-online`);
                                            setServerSource(`https://multiembed.mov/?video_id=${item?.id}&tmdb=1`)
                                        }}
                                    >{item?.title}</div>
                                ))
                            }
                            </div>
                        </div>
                    }
                    <div className='servers'>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 1</span>
                            </div>
                            <div className={`serverSelect ${(server_number.current === 1) ? `makeBlue` : null}`}
                                onClick={() => {
                                    server_number.current = 1;
                                    setServerSource(`https://multiembed.mov/?video_id=${id}&tmdb=1`)
                                }}
                            >{(server_number.current === 1)? `▶️` : null}Play
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 2</span>
                            </div>
                            <div className={`serverSelect ${ server_number.current === 2 ? `makeBlue` : null}`}
                                onClick={() => {
                                    server_number.current = 2;
                                    setServerSource(`https://www.2embed.cc/embed/${id}`)
                                }}
                            >{(server_number.current === 2)? `▶️` : null}Play
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 3</span>
                            </div>
                            <div className={`serverSelect ${ server_number.current === 3 ? `makeBlue` : null}`}
                                onClick={() => {
                                    server_number.current = 3;
                                    setServerSource(`https://vidsrc.me/embed/movie?tmdb=${id}`)
                                }}
                            >{(server_number.current === 3)? `▶️` : null}Play
                            </div>
                        </div>
                        <div className='server'>
                            <div className='serverNumber'>
                                <img className='serverPic' src={serverPic} alt='' />
                                <span className='serverName'>Server 4</span>
                            </div>
                            <div className={`serverSelect ${ server_number.current === 4 ? `makeBlue` : null}`}
                                onClick={() => {
                                    server_number.current = 4;
                                    setServerSource(`https://remotestre.am/e/?tmdb=${id}`)
                                }}
                            >{(server_number.current === 4)? `▶️` : null}Play
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
                <Similar mediaType={"movie"} id={id} />
                <Recommendations mediaType={"movie"} id={id} />
            </>
        </div>
    )
}

export default Movie;
