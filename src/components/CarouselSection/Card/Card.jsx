import React from 'react';
import { useNavigate } from 'react-router';
import "./Card.scss";
import NoPosterImg from "../../../assets/images/no-poster.png";
import { url } from "../../../utils/constants";
import dayjs from 'dayjs';
import CircleRating from '../../CircleRating/CircleRating';
import Img from "../../lazyLoadImage/Img";
import { isoLangs } from '../../../utils/constants';
import Genres from '../../genres/Genres';

const Card = ({ data, endpoint }) => {

  const navigate = useNavigate();

  // const _genres = data?.genres?.map((g) => g.id);
    
  let lang = (code) => {
      return isoLangs[code]?.name;
  };

  const handleDragStart = (e) => e.preventDefault();

  return (
    <figure className='card'
      onDragStart={handleDragStart}
    >
      <div className='cardImg'
        onClick={() => {
          let title = ( data?.title || data?.name )?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
          navigate(`/${data?.item || endpoint}/${data?.id}/${title}`);
        }}
      >
        <Img
          src={ ( data?.poster_path || data?.backdrop_path ) ? 
                  url+`${ data?.poster_path || data?.backdrop_path }`
                  :
                  NoPosterImg 
          }
        />
        <div className='genrate'>
          <CircleRating rating={ data?.vote_average !== 0 ? data?.vote_average?.toFixed(1) : "NA" } />
          <Genres data={data?.genre_ids?.slice(0, 2)} />
        </div>
      </div>
      <figcaption className='cardInfo'>
        <p className='cardTitle'
        >{ data?.title || data?.name }</p>
        <div  className='cardText'>
            <span>{ 
                    (data?.release_date || data?.first_air_date) !== "" ?
                      dayjs(data?.release_date || data?.first_air_date).format("DD-MM-YYYY") 
                      :
                      "NA"          
                  }
            </span>
            <span>{ lang(data?.original_language) }</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;