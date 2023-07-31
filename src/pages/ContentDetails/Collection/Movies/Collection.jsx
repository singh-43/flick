import React from 'react';
import "./Collection.scss";
import ContentWrapper from '../../../../components/contentWrapper/ContentWrapper';
import Img from '../../../../components/lazyLoadImage/Img';
import { url } from '../../../../utils/constants';
import useFetch from '../../../../hooks/useFetch';
import { useNavigate } from 'react-router';

const Collection = ({ id }) => {

    const navigate = useNavigate();
    const { data, loading } = useFetch(`/collection/${id}`);
    data?.parts?.sort((a, b)=> !a?.release_date - !b?.release_date  || a.release_date.localeCompare(b.release_date));

    return (
        <div className='moviesCollection'>
            <ContentWrapper>
                {
                    loading === false ?
                    (
                        <>
                            <div className='moviesCollectionBackdrop'>
                                <Img 
                                    className="posterImg"
                                    src={ url + data?.backdrop_path }
                                />
                            </div>
                            <div className='moviesCollectionInfo'>
                                <div className='collectionName'>
                                    Part of the {data?.name}
                                </div>
                                <div className='moviesNames ellipses'>
                                    Includes {data?.parts?.map((item, i) => (
                                        <span key={i}>
                                            { item?.title } 
                                            {
                                                data?.parts?.length > 2 ?
                                                    i < data?.parts?.length - 2 ? ", " : i === data?.parts?.length - 2 ? ", and " : null
                                                :
                                                    i < data?.parts?.length - 1 && " and "
                                            }
                                        </span>
                                    ))}
                                </div>
                                <div className='viewCollection'
                                    onClick={() => {
                                        let title = data?.name?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                                        navigate(`/collection/${id}/${title}`);
                                    }}
                                >
                                    VIEW THE COLLECTION
                                </div>
                            </div>
                        </>
                    )
                    :
                    <div className='moviesCollectionSkeleton skeleton'></div>
                }
            </ContentWrapper>
        </div>
    )
}

export default Collection;