import React from 'react'
import Food from '../../Assets/Food.webp'
import Drink from '../../Assets/Drink.jpg'
import Device from '../../Assets/Device.jpg'
import './SelectedItemCard.css'

interface SelectedItem {
    service: ServiceData;
    amount: number;
}
interface ServiceData {
    index: number;
    type: number;
    name: string;
    price: number;
}

const SelectedItemCard:React.FC<SelectedItem> = ({service, amount}) => {
    const priceConvert = (amount: number): string => {
        return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
    }

    return (
        <div id='slt-item'>
            <div className="image"> 
                {service.type === 0 ?
                    <img src={Food} alt="" />
                :
                service.type === 1 ?
                    <img src={Drink} alt="" />
                :
                    <img src={Device} alt="" />
                }
            </div>
            <div className="info">
                <p className="name">{service.name}</p>
                <p className="price">{priceConvert(service.price)}VND</p>
                <p className="amount">x{amount}</p>
            </div>
        </div>
    )
}

export default SelectedItemCard