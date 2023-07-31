import React,{ useState, useEffect } from 'react';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import useFetch from "../../../hooks/useFetch";
import Carousel from '../../../components/CarouselSection/CardCarousel';

const Trending = () => {
    
  const [endpoint="movie", setEndpoint] = useState();
  const [container, setContainer] = useState([]);
  const [page, setPage] = useState(1);
  const [firstSlide, setFirstSlide] = useState(false);

  const { data } = useFetch(`/trending/${endpoint}/day?language=en-US&adult=false&page=+${page}`);

  useEffect(() => {
    if(data?.results?.length){
      setContainer((prev) => [...prev, ...data?.results]);
  }
  },[data])

  // const fetchData = async() => {
  //   try {
  //     const {data} = await tmbd.get(`/trending/${endpoint}/day?api_key=1a5ed212f45d7fb97144438a0c36be6a&language=en-US&page=+${page}`);
  //     setContainer((prev) => [...prev, ...data?.results]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }   

  // useEffect(() => {
  //   fetchData();
  //   //eslint-disable-next-line
  // },[page,endpoint]);

  const onTabChange = (tab) => {
    setEndpoint( tab === "Movies" ? "movie" : "tv" );
  } 

  return (
    <div className='homeSection'>
      <ContentWrapper>
        <div className='TopPart'>
            <span className="Title">Trending</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} 
              onTabChange={onTabChange} 
              setContainer={setContainer}
              setPage={setPage} 
              setFirstSlide={setFirstSlide}
            />
        </div>
      </ContentWrapper>
        <Carousel data={container} page={page} setPage={setPage} endpoint={endpoint}
          firstSlide={firstSlide} setFirstSlide={setFirstSlide} buttons={true} swipeable={false} draggable={false}
        />
    </div>
  )
}

export default Trending;