import "./MoviesCollection.scss";
import React,{ useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router";
import MovieParts from "./MovieParts/MovieParts";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CollectionDetails from "./CollectionDetails/CollectionDetails";
import CollectionCast from "./CollectionCast/CollectionCast";

const MoviesCollection = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    const { id } = useParams();
    const { data, loading } = useFetch(`/collection/${id}`);
    data?.parts?.sort((a, b)=> !a?.release_date - !b?.release_date  || a.release_date.localeCompare(b.release_date));

    return (
        <div>
            <CollectionDetails data={data} loading={loading} />
            <CollectionCast data={data} loading={loading} />
            <ContentWrapper>
                <div className="number_of_movies">
                    { data?.parts?.length } Movies
                </div>
                {
                    loading === false ?
                    (
                        data?.parts?.map((item, index) => (
                            <React.Fragment key={index}>
                                <MovieParts data={item} />
                                { index < data?.parts?.length - 1 ? <div className='line'></div> : null }
                            </React.Fragment>
                        ))
                    )
                    :
                    (
                        null
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default MoviesCollection;