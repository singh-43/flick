import React from 'react';
import "./Collection.scss";
import { useNavigate } from 'react-router';
import Img from '../../../../components/lazyLoadImage/Img';
import { url } from '../../../../utils/constants';
import NoPosterImg from "../../../../assets/images/no-poster.png";
import dayjs from 'dayjs';
import ContentWrapper from '../../../../components/contentWrapper/ContentWrapper';

const Collection = ({  loading, next_episode_to_air, series_name, series_id, status, data }) => {

    const navigate = useNavigate();

    return (
        <div className='seasonCollection'>
            <ContentWrapper>
                {
                    loading === false ?
                    (
                        <>
                            <div className='heading'>
                                { ( ( status === "Returning Series" ) && ( next_episode_to_air !== null && next_episode_to_air !== 0 && next_episode_to_air !== "" && next_episode_to_air?.length !== 0 && next_episode_to_air?.season_number === data?.season_number )  ) ? "Current Season" : "Last Season" }
                            </div>
                            <div className='seasonCollectionItem'>
                                <div className='ItemsLeft'
                                    onClick={() => {
                                        series_name = series_name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                        navigate(`/tv/${series_id}/${series_name}/season/${data?.season_number}`)
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
                                    <div className='heading_n_rating'>
                                        <span className='name'                            
                                            onClick={() => {
                                                series_name = series_name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                                navigate(`/tv/${series_id}/${series_name}/season/${data?.season_number}`)
                                            }}
                                        >{data?.name}</span>
                                        { 
                                            ( data?.vote_average !== 0 && data?.vote_average?.length !== 0 && data?.vote_average !== "" && data?.vote_average !== null ) ?
                                                <div className='rating'>
                                                    <span>
                                                        ⭐
                                                    </span>
                                                    <span>
                                                        { data?.vote_average}
                                                    </span>
                                                </div>
                                            :
                                                null
                                        } 
                                    </div>
                                    <div className="date">
                                        { ( data?.air_date !== 0 && data?.air_date?.length !== 0 && data?.air_date !== "" && data?.air_date !== null ) ? dayjs(data?.air_date).format("YYYY") : "-------" }  | {data?.episode_count} Episode
                                    </div>
                                    <div className='overview'>
                                        {
                                            ( data?.air_date !== 0 && data?.air_date?.length !== 0 && data?.air_date !== "" && data?.air_date !== null ) ?
                                                <div className='premiere'>{`Season ${data?.season_number} of ${series_name} premiered on `}{ dayjs(data?.air_date).format("MMMM DD, YYYY") }. </div>
                                                :
                                                null
                                        } 
                                        <div className='description ellipsis'>
                                            { data?.overview !== "" ? data?.overview : "There is no description available for this season." }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='bottom'
                                onClick={() => {
                                    series_name = series_name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                    navigate(`/tv/${series_id}/${series_name}/seasons`)
                                }}
                            >
                                View All Seasons
                            </div>
                        </>
                    )
                    :
                    (
                        <div className="collectionSkeleton">
                            <div className='heading'>
                                <div className='row skeleton'></div>
                            </div>
                            <div className='seasonCollectionItem'>
                                <div className="left skeleton"></div>
                                <div className="right">
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row1 skeleton"></div>
                                    <div className="row1 skeleton"></div>
                                    <div className="row1 skeleton"></div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <div className='row skeleton'></div>
                            </div>
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Collection;