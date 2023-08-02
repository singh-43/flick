import React,{ useEffect } from 'react';
import "./MoviesOfficialVideos.scss";
import Img from '../../../components/lazyLoadImage/Img';
import { openInNewTab } from '../../../utils/constants';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from "../../../components/Playbtn/Playbtn";
import { useNavigate } from 'react-router';

const OfficialVideos = ({ data, loading }) => {

    const navigate = useNavigate();
    const handleDragStart = (e) => e.preventDefault();
    
    let video = [];
    for(let i=0; i<data?.results?.length; i++){
        if( data?.results?.[i]?.official === true ){
            video.push(data?.results?.[i]);
        }
    }
    video?.sort((a, b)=> !b.published_at - !a.published_at || b.published_at.localeCompare(a.published_at));

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
    },[video?.length > 0])

    useEffect(() => {
        //eslint-disable-next-line
        video = [];
    },[data])

    return (
        <div className="MoviesOfficialVideos">
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
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    );
}

export default OfficialVideos;