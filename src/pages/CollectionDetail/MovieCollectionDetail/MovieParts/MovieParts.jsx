import "./MovieParts.scss";
import React from 'react';
import Img from "../../../../components/lazyLoadImage/Img";
import { url } from "../../../../utils/constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import NoPosterImg from "../../../../assets/images/no-poster.png";

const MovieParts = ({ data }) => {

    const navigate = useNavigate();

    return (
        <div className="movieParts">
            <div className="moviePartsItem">
                <div className="moviePartsItemLeft"
                    onClick={() => {
                        let title = data?.title?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                        navigate(`/movie/${data?.id}/${title}`);
                    }}
                >
                    <Img
                        className="posterImg"
                        src={
                            data?.poster_path?
                            url+data?.poster_path
                            :
                            NoPosterImg
                        }
                        alt=''
                    />
                </div>
                <div className="moviePartsItemRight">
                    <div className="name"
                        onClick={() => {
                            let title = data?.title?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
                            navigate(`/movie/${data?.id}/${title}`);
                        }}
                    >
                        <div className="ellipses">
                            {data?.title}
                        </div>
                    </div>
                    <div className="date">
                        { ( data?.release_date !== 0 && data?.release_date?.length !== 0 && data?.release_date !== "" && data?.release_date !== null ) ? dayjs(data?.release_date).format("MMM DD, YYYY") : null }
                    </div>
                    <div className="overview ellipses">
                        { data?.overview ? data?.overview : "There is no description available for this movie." }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieParts;

// const MovieParts = ({ data }) => {

//     const navigate = useNavigate();

//     return (
//         <div className='movieParts'>
//             <div className='seasonCollectionItem'>
//                 <div className='ItemsLeft'
//                     onClick={() => {
//                         let title = data?.title?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
//                         navigate(`/movie/${data?.id}/${title}`);
//                     }}
//                 >
//                     <Img
//                         className="posterImg"
//                         src={
//                             data?.poster_path?
//                             url+data?.poster_path
//                             :
//                             NoPosterImg
//                         }
//                         alt=''
//                     />
//                 </div>
//                 <div className="moviePartsItemRight">
//                     <div className="name"
//                         onClick={() => {
//                             let title = data?.title?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
//                             navigate(`/movie/${data?.id}/${title}`);
//                         }}
//                     >
//                         <div className="ellipses">
//                             {data?.title}
//                         </div>
//                     </div>
//                     <div className="date">
//                         { ( data?.release_date !== 0 && data?.release_date?.length !== 0 && data?.release_date !== "" && data?.release_date !== null ) ? dayjs(data?.release_date).format("MMM DD, YYYY") : null }
//                     </div>
//                     <div className="overview ellipses">
//                         { data?.overview ? data?.overview : "There is no description available for this movie." }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MovieParts;