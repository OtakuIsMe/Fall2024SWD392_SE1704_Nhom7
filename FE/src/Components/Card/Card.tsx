import React from 'react'
import { useNavigate } from 'react-router';
import './Card.css'

interface CardProps {
    id: string;
    img: string;
    type: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ id, img, type, price }) => {
    const navigate = useNavigate()

    return (
        <div id='card' onClick={() => navigate('/roomDetail/ff0fe7135acf8a5035a4371b146c4c79e7e6469b84e091a53508dde6415c2152')}>
            <div className="img_container">
                <img src={img} alt="" />
            </div>
            <div className="card_info">
                <div className="info_container">
                    <p className='title'>{type}</p>
                    {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam et at magni beatae laboriosam mollitia assume</p> */}
                </div>
                <p className='price'>{price}k/h</p>
            </div>
        </div>
    )
}

export default Card