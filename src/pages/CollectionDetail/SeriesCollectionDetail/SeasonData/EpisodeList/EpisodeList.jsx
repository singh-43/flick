import React from 'react';
import "./EpisodeList.scss";
import { url, toHoursAndMinutes } from '../../../../../utils/constants';
import dayjs from 'dayjs';
import NoPosterImg from "../../../../../assets/images/no-poster.png";
import Img from '../../../../../components/lazyLoadImage/Img';

const EpisodeList = ({ data, index, length }) => {
    
    return (
        <>
            <div className='episodeItem'>
                <div className='ItemsLeft'>
                    <Img
                        className="posterImg"
                        src={
                            data?.still_path?
                            url+data?.still_path
                            :
                            NoPosterImg
                        }
                        alt=''
                    />
                </div>
                <div className='ItemsRight'>
                    <div className='episodeInfo'>
                        <div className='seriesName'>
                            { data?.episode_number }: { data?.name }
                        </div>
                        <div className='moreInfo'>
                            <div>{ data?.air_date ? dayjs(data?.air_date).format("MMM DD, YYYY") : null }</div>
                            <span className='sign'>
                                { data?.air_date && data?.runtime ? "|" : null }
                            </span>
                            <div>
                                { data?.runtime ? toHoursAndMinutes(data?.runtime) : null }
                            </div>
                        </div>
                    </div>
                    <div className='overview'>
                        { data?.overview ? data?.overview : "There is no description available for this episode." }
                    </div>
                </div>
            </div>
            { index < length ? <div className='line'></div> : null }
        </>
    )
}

export default EpisodeList;