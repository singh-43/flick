import React,{ useEffect, useState } from 'react';
import "./SeriesOfficialVideos.scss";
import Img from '../../../components/lazyLoadImage/Img';
import { openInNewTab } from '../../../utils/constants';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from "../../../components/Playbtn/Playbtn";
import { useNavigate, useParams } from 'react-router';
import { fetchDataFromApi } from '../../../utils/api';
import useFetch from '../../../hooks/useFetch';

const OfficialVideos = ({ data, loading }) => {

    const navigate = useNavigate();
    const handleDragStart = (e) => e.preventDefault();

    let video = [];
    const { id } = useParams();
    const [container, setContainer] = useState([]);

    for(let i=0; i<data?.results?.length; i++){
        if( data?.results?.[i]?.official === true ){
            video.push(data?.results?.[i]);
        }
    }

    //eslint-disable-next-line
    const { data: series } = useFetch(`/tv/${id}`);
    series?.seasons?.sort((a, b)=> a?.season_number - b?.season_number  || a.season_number.localeCompare(b.season_number));


    const fetchInitialData = () => {
        for(let i=1; i<series?.seasons?.length; i++){
            fetchDataFromApi(`/tv/${id}/season/${series?.seasons?.[i]?.season_number}/videos`).then((res) => {
                setContainer((prev) => [...prev, res?.results]);
            });
        }    
    };

    if(container?.length > 0){
        for(let i=0; i<container?.length; i++){
            for(let k=0 ; k<container?.[i]?.length; k++){
                if( container?.[i]?.[k]?.official === true ){
                    video.push(container?.[i]?.[k]);
                }
            }
        }
    }

    video = video?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    video?.sort((a, b)=> !b.published_at - !a.published_at || b.published_at.localeCompare(a.published_at));

    useEffect(() => {
        // eslint-disable-next-line
        setContainer([]);
        fetchInitialData();
        // eslint-disable-next-line
    },[series])

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    useEffect(() => {
        const slider = document.querySelector('.videos');
        let isDown = false;
        let startX;
        let scrollLeft;

        if(slider){
            slider.addEventListener('mousedown',(e)=>{
                isDown = true;
                slider.classList.add('active')
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            })
            slider.addEventListener('mouseleave',()=>{
                isDown = false;
                slider.classList.add('active')
            })
            slider.addEventListener('mouseup',()=>{
                isDown = false;
                slider.classList.add('active')
            })
            slider.addEventListener('mousemove',(e)=>{
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
    
            })
        }
        //eslint-disable-next-line
    },[container])

    return (
        <div className="SeriesOfficialVideos">
            <ContentWrapper>
                {
                    loading === false ?
                    (
                        video?.length > 0 &&
                        (
                            <>
                                <div className='sectionHeading'>
                                    Official Videos
                                </div>
                                <div className="videos"
                                    onDragStart={handleDragStart}
                                >
                                    {video?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="videoItem"
                                        >
                                            <div className="videoThumbnail">
                                                <Img
                                                    src={`https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`}
                                                />
                                                <div className='playbtn'
                                                    onClick={() => {
                                                        navigate(openInNewTab(`https://www.youtube.com/watch?v=${item?.key}`))
                                                    }}
                                                >
                                                    <PlayIcon />
                                                </div>
                                            </div>
                                            <div className="videoTitle ellipsis">{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    )
                    :
                    (
                        <>
                            <div className="sectionHeadingSkeleton">
                                <div className="row skeleton"></div>
                            </div>
                            <div className="videoSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        </>
                    )
                }
            </ContentWrapper>
        </div>
    );
}

export default OfficialVideos;