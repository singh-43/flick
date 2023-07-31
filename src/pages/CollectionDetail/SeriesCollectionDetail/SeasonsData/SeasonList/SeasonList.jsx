import React from 'react';
import "./SeasonList.scss";
import dayjs from 'dayjs';
import { url } from "../../../../../utils/constants";
import NoPosterImg from "../../../../../assets/images/no-poster.png";
import Img from "../../../../../components/lazyLoadImage/Img";
import { useNavigate } from 'react-router';

const SeasonList = ({ data, series_name, series_id }) => {

    const navigate = useNavigate();
    
    return (
        <div className='seasonList'>
            <div className='seasonListItem'>
                <div className='ItemsLeft'
                    onClick={() => {
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
                        <div className="date">
                            { ( data?.air_date !== 0 && data?.air_date?.length !== 0 && data?.air_date !== "" && data?.air_date !== null ) ? dayjs(data?.air_date).format("YYYY") : "-------" }  | {data?.episode_count} Episode
                        </div>
                    </div>
                    <div className='overview'>
                        {
                            ( data?.air_date !== 0 && data?.air_date?.length !== 0 && data?.air_date !== "" && data?.air_date !== null ) ?
                                <div className='premiere'>{`Season ${data?.season_number} of ${series_name} ${ dayjs().format("YYYY-MM-DD") > dayjs(data?.air_date).format("YYYY-MM-DD") ? `premiered on ` : `is set to premiere on ` }`}{ dayjs(data?.air_date).format("MMMM DD, YYYY") }. </div>
                                :
                                null
                        } 
                        <div className='description'>
                            { data?.overview !== "" ? data?.overview : "There is no description available for this season." }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeasonList;