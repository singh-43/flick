import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SearchResult.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import NoResult from "../../assets/images/no-results.png";

const SearchResult = () => {

    //eslint-disable-next-line
    const [endpoint="multi", setEndpoint] = useState();
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    let { query } = useParams();
    query = query.split('-').join(' ');

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/${endpoint}?include_adult=false&query=${query}&page=1`).then(
            (res) => {
                setData(res);
                setPageNum(2);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?include_adult=false&query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        window.scrollTo(0,0);
        fetchInitialData();
        //eslint-disable-next-line
    }, [endpoint]);
    
    useEffect(() => {
        fetchInitialData();
        //eslint-disable-next-line
    },[query])    

    return (
        <div className="searchResultsPage">
            <ContentWrapper>
                {loading && <Spinner initial={true} />}
                {
                    data?.results?.length > 0 ?
                    (
                        <div className="pageTitle">
                            {`Search ${
                                data?.total_results > 1
                                    ? "results"
                                    : "result"
                            } of '${query}'`}
                        </div>
                    )
                    : (
                        <span className="resultNotFound">
                            <span>Sorry, Results not found!</span>
                            <img className="NoResult" src={NoResult} alt="" />
                        </span>
                    )
                }
                {!loading && (
                    <>
                        <InfiniteScroll
                            className="content"
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                        >
                            {data?.results?.map((item, index) => {
                                if (item.media_type === "person") return null;
                                return (
                                    <MovieCard
                                        key={index}
                                        data={item}
                                    />
                                );
                            })}
                        </InfiniteScroll>
                        {(pageNum <= data?.total_pages) ? <Spinner className="spinner" /> : null}
                        { data?.results?.length > 0 ? <ScrollButton  /> : null }
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default SearchResult;