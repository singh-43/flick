import React, { useEffect } from 'react';
import "./Cast.scss";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { url } from '../../../utils/constants';
import Img from '../../../components/lazyLoadImage/Img';
import NoAvatarImg from "../../../assets/images/avatar.png";

const Cast = ({ data, loading }) => {

    useEffect(() => {
        const slider = document.querySelector('.listItems');
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
    },[loading === false])

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const handleDragStart = (e) => e.preventDefault();

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems"
                        onDragStart={handleDragStart}
                    >
                        {data?.map((item) => {
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img
                                            src={  
                                                item?.profile_path ? 
                                                    url + item?.profile_path
                                                    :
                                                    NoAvatarImg 
                                            }
                                        />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;