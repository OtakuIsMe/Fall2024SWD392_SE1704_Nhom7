import React, { ReactNode } from 'react'
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
    const priceConvert = (amount: number): string => {
        return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
    }

    return (
        <div id='item_card'>
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