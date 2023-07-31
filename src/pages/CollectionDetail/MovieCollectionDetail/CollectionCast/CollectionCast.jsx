import "./CollectionCast.scss";
import React,{ useState, useEffect } from 'react';
import { fetchDataFromApi } from "../../../../utils/api";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import CastCard from "./castCard/castCard";

const CollectionCast = ({ loading, data }) => {

    const [container, setContainer] = useState([]);

    const fetchInitialData = () => {
        for(let i=0; i<data?.parts?.length; i++){
            fetchDataFromApi(`/movie/${data?.parts?.[i]?.id}/credits`).then((res) => {
                setContainer((prev) => [...prev, res]);
            });
        }    
    };

    useEffect(() => {
        fetchInitialData();
        //eslint-disable-next-line
    },[loading === false])

    const cast = container?.map((i) => {
        return i?.cast
    })
    let fullCast=[];
    for(let i=0; i<cast?.length; i++){
        for(let k = 0 ; k<cast[i]?.length && k<6; k++){
            fullCast.push(cast[i][k]);
        }
    }
    const featuredCast = fullCast?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    
    const crew = container?.map((i) => {
        return i?.crew
    })
    let fullCrew = [];
    crew?.map((i) => (
        i?.map((k) => (
          fullCrew.push(k)
        ))
    ))
    let director = fullCrew?.filter((f) => f.job === "Director");
    director = director?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    let writer = fullCrew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );
    writer = writer?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    let featuredCrew = [];
    for(let k = 0 ; k<director?.length && k<6; k++){
        featuredCrew.push(director[k]);
    }
    for(let k = 0 ; k<writer?.length && k<6; k++){
        featuredCrew.push(writer[k]);
    }
    featuredCrew?.sort((a, b)=> a?.id - b?.id);
    
    featuredCrew = featuredCrew?.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          const newCurr = {
            id: current.id,
            name: current.name,
            profile_path: current.profile_path,
            department: [current.department]
          }
          return acc.concat([newCurr]);
        } else {
          const currData = x.department.filter(d => d === current.department);
          if (!currData.length) {
            const newData = x.department.push(current.department);
            //eslint-disable-next-line
            const newCurr = {
              id: current.id,
              name: current.name,
              profile_path: current.profile_path,
              department: newData
            }
            return acc;
          } else {
            return acc;
          }
        }
      }, []);

    return (
        <div className="CollectionCast">
            <ContentWrapper>
                <div className="featuredCastCrew">
                    <div className="title">
                        Featured Cast
                    </div>
                    <div className="cast_crew">
                        {
                            featuredCast?.map((item, index) =>(
                                <CastCard key={index} data={item} />
                            ))
                        }
                    </div>
                    <div className="line"></div>
                </div>
                <div className="featuredCastCrew">
                    <div className="title">
                        Featured Crew
                    </div>
                    <div className="cast_crew">
                        {
                            featuredCrew?.map((item, index) =>(
                                <CastCard key={index} data={item} />
                            ))
                        }
                    </div>
                    <div className="line"></div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default CollectionCast;