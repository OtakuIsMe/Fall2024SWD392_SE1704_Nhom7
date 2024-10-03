import React from 'react'
import { useNavigate } from 'react-router';
import './Card.css'

interface CardProps {
    // id: string;
    img: string;
    type: string;
    price: number;
}

const Card:React.FC<CardProps> = ({ img, type, price }) => {
    const navigate = useNavigate()

    return (
        <div id='card' onClick={() => navigate('/roomDetail/:1')}>
            <div className="img_container">
                <img src={img} alt="" />
            </div>
            <div className="card_info">
                <div className="info_container">
                    <h2>{type}</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam et at magni beatae laboriosam mollitia assume</p>
                </div>
                <p>{price}k/h</p>
            </div>
        </div>
    )
}

export default Card