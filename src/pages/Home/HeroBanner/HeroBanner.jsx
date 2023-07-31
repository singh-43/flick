import './HeroBanner.scss';
import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Img from '../../../components/lazyLoadImage/Img';
import useFetch from '../../../hooks/useFetch';
import { url } from '../../../utils/constants';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

  const navigate = useNavigate();

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("")
  const [movieName, setMovieName] = useState("")
  const [movieId, setMovieId] = useState(null)

  const {data, loading} = useFetch(`/movie/upcoming`);

  const random = Math.floor(Math.random() * 20);

  useEffect(() => {
      const bg = url + data?.results?.[random]?.backdrop_path;
      const title = data?.results?.[random]?.title;
      const id = data?.results?.[random]?.id;

      setBackground(bg);
      setMovieName(title);
      setMovieId(id);
      //eslint-disable-next-line
  },[data])

  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query.length > 0){
      let title = ( query )?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
      navigate(`/search/${title}`);
    }
  }

  return (
    <div className='heroBanner'>
      {
        !loading && (
            <div className="backdrop-img">
              <Img src={background} />
            </div>
        ) 
      }  
      <div className="opacity-layer"></div>
      <span className='movieTitle'
        onClick={() => {
          let title = movieName.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
          navigate(`/movie/${movieId}/${title}`);
        }}
      >{movieName}</span>
      <ContentWrapper>
        <div className='heroBanner-content'>
          <span className='title' >Flick.</span>
          <span className='subTitle' >Search Your Favourite Movie or Tv Show ...</span>
          <div className='searchInput'>
            <input 
              type='search'
              placeholder='Search for a movie or tv show ...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button
              onClick={() => {
                if(query.length > 0){
                  let title = ( query )?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                  navigate(`/search/${title}`);
                }
              }}
            >Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner;