import React,{ useState, useEffect } from 'react';
import "./Similar.scss";
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/CarouselSection/CardCarousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const Similar = ({ mediaType, id }) => {

    const [container, setContainer] = useState([]);
    const [page, setPage] = useState(1);  

    const { data, loading} = useFetch(`/${mediaType}/${id}/similar?language=en-US&page=+${page}`);
    useEffect(() => {
        window.scrollTo(0,0);
        setContainer([]);
    },[id])
    useEffect(() => {
        if(container?.length === 0){
            setPage(1);
        }
        if(data?.results?.length){
            setContainer((prev) => [...prev, ...data?.results]);
        }
        //eslint-disable-next-line
    },[data])

    return (
        <div className='Similar'>
            {
                container?.length > 0 ? 
                    <React.Fragment>
                        <ContentWrapper>
                            Similar
                        </ContentWrapper>
                        <Carousel 
                            data={container} loading={loading} page={page} setPage={setPage} endpoint={mediaType}
                            buttons={true} swipeable={false} draggable={false} onlyonce={true}
                        />
                    </React.Fragment>
                :
                null
            }
        </div>
    )
}

export default Similar;