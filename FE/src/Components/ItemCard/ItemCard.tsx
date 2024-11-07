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
    quantity?: number;
    children: ReactNode
}

const ItemCard: React.FC<ItemCardProps> = ({ id, img, name , type, price, quantity, children}) => {
    const priceConvert = (amount: number): string => {
        return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
    }

    return (
        <div id='item_card'>
            <div className="img_container">
                {type === 0 ?
                    img ? 
                        <img src={img} alt={name} />
                        :
                        <img src={Food} alt="Food" />
                :
                type === 1 ?
                    img ? 
                        <img src={img} alt={name} />
                        :
                        <img src={Drink} alt="Drink" />
                :
                    img ? 
                        <img src={img} alt={name} />
                        :
                        <img src={Device} alt="Device" />
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