import "./SeasonData.scss";
import React,{ useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ContentWrapper from '../../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../../hooks/useFetch';
import dayjs from 'dayjs';
import NoPosterImg from "../../../../assets/images/no-poster.png";
import { url } from "../../../../utils/constants";
import Img from "../../../../components/lazyLoadImage/Img";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import EpisodeList from "./EpisodeList/EpisodeList";
import ScrollButton from "../../../../components/ScrollButton/ScrollButton";

const SeasonData = () => { 

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    const skItem = () => {
        return (
            <div className='episodesListSkeleton'>
                <div className="episodesListLeft skeleton"></div>
                <div className="episodesListRight">
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                </div>
            </div>
        )
    }
    
    const navigate = useNavigate();
    const { id, title } = useParams();
    let { season_number } = useParams();
    const { data, loading } = useFetch(`/tv/${id}/season/${season_number}`);
    const { data: seasonsList } = useFetch(`/tv/${id}`);
    seasonsList?.seasons?.sort((a, b)=> a?.season_number - b?.season_number);

    const series_name = title;

    return (
        <div className='seasonData'>
            <ContentWrapper>
                {
                    loading === false ? 
                    (
                        <>
                            <div className='seasonItem'>
                                <div className='ItemsLeft'
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    <Img
                                        className="posterImg"
                                        src={
                                            data?.poster_path?
                                            url+data?.poster_path
                                            :
                                            NoPosterImg
                                        }
                                        alt=''
                                    />
                                </div>
                                <div className='ItemsRight'>
                                    <div className='heading'>
                                        <div className='seriesName'
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                        >
                                            { data?.name }
                                        </div>
                                        <div className='year'>
                                        { ( data?.air_date !== 0 && data?.air_date?.length !== 0 && data?.air_date !== "" && data?.air_date !== null ) ? `(${dayjs(data?.air_date).format("YYYY")})` : null }
                                        </div>
                                    </div>
                                    <div className='navigation'
                                        onClick={() => {
                                            navigate(`/tv/${id}/${series_name}/seasons`)
                                        }}
                                    >
                                        <BsArrowLeft />
                                        Back to season list
                                    </div>
                                </div>
                            </div>
                            {
                                ( seasonsList?.seasons?.length > 1 ) && (
                                    <div className="seasonNavigation">
                                        <div className={`previousNav ${ parseInt(seasonsList?.seasons[0]?.season_number) === parseInt(season_number) ? `hide` : null } `}
                                            onClick={() => {
                                                season_number = parseInt(season_number) - 1;
                                                navigate(`/tv/${id}/${series_name}/season/${season_number}`)
                                            }}
                                            >
                                            <BsArrowLeft />
                                            Previous Season
                                        </div>
                                        <div className={`nextNav ${ parseInt(seasonsList?.seasons[seasonsList?.seasons?.length - 1]?.season_number) === parseInt(season_number) ? `hide` : null } `}
                                            onClick={() => {
                                                season_number = parseInt(season_number) + 1;
                                                navigate(`/tv/${id}/${series_name}/season/${season_number}`)
                                            }}
                                        >
                                            Next Season
                                            <BsArrowRight />
                                        </div>
                                    </div>
                                )
                            }
                            { 
                                data?.episodes?.length > 0 &&
                                <div className="episodesNumber">
                                    <span>Episodes </span>
                                    <span>{ data?.episodes?.length }</span>
                                </div>
                            }
                            {
                                data?.episodes?.map((items,index) => (
                                    <React.Fragment key={index}>
                                        <EpisodeList data={items} index={index} length = {data?.episodes?.length -1} />
                                    </React.Fragment>
                                ))
                            }
                            <ScrollButton />
                        </>
                    ):
                    (
                        <>
                            <div className='seasonItemSkeleton'>
                                <div className="seasonItemLeft skeleton"></div>
                                <div className="seasonItemRight">
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                </div>
                            </div>
                            <div className="seasonNavigation">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                            <div className="episodesNumber">
                                <div className="row skeleton"></div>
                            </div>
                            {skItem()}
                            <div className='line'></div>
                            {skItem()}
                        </>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default SeasonData;