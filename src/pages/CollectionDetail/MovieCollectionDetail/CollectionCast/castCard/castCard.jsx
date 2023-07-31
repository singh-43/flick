import React from 'react';
import "./castCard.scss";
import Img from "../../../../../components/lazyLoadImage/Img";
import NoAvatarImg from "../../../../../assets/images/avatar.png";
import { url } from "../../../../../utils/constants";

const CastCard = ({ data }) => {

    return (
        <div className='CastCardCollection'>
            <div className='CastCardCollectionLeft'>
                <Img 
                    className="posterImg"
                    src={
                        data?.profile_path ?
                        url + data?.profile_path 
                        :
                        NoAvatarImg
                    }
                />
            </div>
            <div className='CastCardCollectionRight'>
                <div className='name ellipses'>
                    {data?.name}
                </div>
                {
                    data?.character ?
                    <div className='character_and_department ellipses'>
                        {data?.character}
                    </div>
                    :
                    data?.department?.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className='character_and_department'>{ item }</span>
                            <span className='character_and_department'>{data?.department?.length - 1 !== index && ", "}</span>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default CastCard;