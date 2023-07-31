import HeroBanner from './HeroBanner/HeroBanner';
import './Home.scss';
import React,{ useEffect } from 'react';
import Trending from './Trending/Trending';
import Popular from './Popular/Popular';
import TopRated from './TopRated/TopRated';

const Home = () => {
    
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <div className='home'>
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home;