import React,{ useEffect } from 'react';
import "./SeasonsData.scss";
import { useNavigate, useParams } from 'react-router';
import ContentWrapper from '../../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../../hooks/useFetch';
import dayjs from 'dayjs';
import NoPosterImg from "../../../../assets/images/no-poster.png";
import { url } from '../../../../utils/constants';
import Img from '../../../../components/lazyLoadImage/Img';
import { BsArrowLeft } from "react-icons/bs";
import SeasonList from "./SeasonList/SeasonList";
import ScrollButtton from "../../../../components/ScrollButton/ScrollButton";

const SeasonsData = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    const skItem = () => {
        return (
            <div className='seasonsListSkeleton'>
                <div className="seasonsListLeft skeleton"></div>
                <div className="seasonsListRight">
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                </div>
            </div>
        )
    }

    const { id } = useParams();
    const navigate = useNavigate();    

    const { data, loading } = useFetch(`/tv/${id}`);
    data?.seasons?.sort((a, b)=> a?.season_number - b?.season_number);
    const series_name = data?.name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');

    return (
        <div className='seasonsData'>
            <ContentWrapper>
                {
                    loading === false ?
                    (
                        <>
                            <div className='seasonsItem'>
                                <div className='ItemsLeft'
                                    onClick={() => {
                                        navigate(`/tv/${id}/${series_name}`)
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
                                    <div className='heading'
                                        onClick={() => {
                                            navigate(`/tv/${id}/${series_name}`)
                                        }}
                                    >
                                        <div className='seriesName'>
                                            { data?.name }
                                        </div>
                                        <div className='year'>
                                            ({ dayjs(data?.first_air_date).format("YYYY") })
                                        </div>
                                    </div>
                                    <div className='navigation'
                                        onClick={() => {
                                            navigate(`/tv/${id}/${series_name}`)
                                        }}
                                    >
                                        <BsArrowLeft />
                                        Back to main
                                    </div>
                                </div>
                            </div>
                            {
                                data?.seasons?.map((items,index) => (
                                    <React.Fragment key={index}>
                                        <SeasonList data={items} series_name={series_name} series_id={id} />
                                        { index < data?.seasons?.length - 1 ? <div className='line'></div> : null }
                                    </React.Fragment>
                                ))
                            }
                            <ScrollButtton />
                        </>
                    )
                    :
                    <>
                        <div className='seasonsItemSkeleton'>
                            <div className="seasonsItemLeft skeleton"></div>
                            <div className="seasonsItemRight">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </div>
                        {skItem()}
                        <div className='line'></div>
                        {skItem()}
                    </>
                }
            </ContentWrapper>
        </div>
    )
}

export default SeasonsData;