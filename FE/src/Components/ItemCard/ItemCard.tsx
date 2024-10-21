import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router';
import Food from '../../Assets/Food.webp'
import Drink from '../../Assets/Drink.jpg'
import Device from '../../Assets/Device.jpg'
import './ItemCard.css'

interface ItemCardProps {
    id: string;
    img: string;
    name: string;
    type: number;
    price: number;
    children: ReactNode
}

const ItemCard: React.FC<ItemCardProps> = ({ id, img, name , type, price, children}) => {
    const navigate = useNavigate()

    const priceConvert = (amount: number): string => {
        return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
    }

    return (
        <div id='item_card' onClick={() => navigate('/roomDetail/ff0fe7135acf8a5035a4371b146c4c79e7e6469b84e091a53508dde6415c2152')}>
            <div className="img_container">
                {type === 0 ?
                    <img src={Food} alt="" />
                :
                type === 1 ?
                    <img src={Drink} alt="" />
                :
                    <img src={Device} alt="" />
                }
            </div>
            <div className="item_card_info">
                <div className="info_container">
                    <p className='price'>{priceConvert(price)}<p className='currency'>VND</p></p>
                </div>
            </div>
            <div className='title'>
                <div className='name'>{name}</div>
                {children}
            </div>
        </div>
    )
}

export default ItemCard