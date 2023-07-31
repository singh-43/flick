import React from 'react';
import "./CardCarousel.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Card from './Card/Card';
import { BsFillArrowLeftCircleFill,  BsFillArrowRightCircleFill } from "react-icons/bs";

const CardCarousel = ({ data, page, setPage, firstSlide, setFirstSlide, endpoint, swipeable, draggable, buttons, onlyonce }) => {

  const skItem = () => {
    return (
      <div className='carouselSkeletonItem'>
        <div className='cardImg skeleton'>
          <div className='image skeleton'></div>
        </div>
        <div className="text">
          <div className="row1 skeleton"></div>
          <div className="row2 skeleton"></div>
        </div>
      </div>
    );
  };

  const ButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
    const { totalItems, currentSlide } = carouselState;
    if(firstSlide){
        goToSlide(0);
        setFirstSlide(false);
    }
    return (
      <ContentWrapper>
            <BsFillArrowLeftCircleFill
              className={`carouselLeftNav arrow ${(currentSlide === 0) ? "op" : ""}`}
              onClick={() => 
                {
                  if(currentSlide !== 0 && onlyonce !== true){
                    goToSlide(currentSlide - 2);
                  }
                  if(onlyonce)
                    previous();
                  }
              }
            />
            <BsFillArrowRightCircleFill
                className={`carouselRighttNav arrow`}
                onClick={() => 
                  {
                    if(onlyonce !== true)
                      goToSlide(currentSlide + 2);
                    if(onlyonce)
                      next();
                      if(currentSlide >= totalItems - 6){
                        setPage(page+1);
                      }
                  }
                }
            />
      </ContentWrapper>
    );
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      partialVisibilityGutter: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: 4,
      partialVisibilityGutter: 5
    },
    tablet1: {
      breakpoint: { max: 750, min: 500 },
      items: 3,
      partialVisibilityGutter: 5
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
      partialVisibilityGutter: 5
    }
  };

  return (
    <div className='carousel'>
      <ContentWrapper>
        {
          data?.length !== 0 ? (
            <>
              <Carousel
                    responsive={responsive} draggable={draggable} partialVisible={true}
                    arrows={false} swipeable={swipeable} 
                    customButtonGroup={buttons === true ? <ButtonGroup /> : null}
              >
                {
                  (
                    data?.map((item,index) => (
                        <Card key={index} endpoint={endpoint} data={item} />
                    ))
                  )
                }
              </Carousel>
            </>
          ):(
            <Carousel responsive={responsive} partialVisible={true}
            arrows={false} swipeable={false} draggable={false}
            >
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </Carousel>
          )
        }
      </ContentWrapper>
      </div>
  )
}

export default CardCarousel;