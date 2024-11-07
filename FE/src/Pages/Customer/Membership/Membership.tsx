import React, { useContext, useEffect, useState } from "react";
import "./Membership.css"
import Header from "../../../Components/Header/Header";
import { ApiGateway } from "../../../Api/ApiGateway";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import background from "../../../Assets/Background-wave.jpg"
import { AuthenContext } from "../../../Components/AuthenContext";


const Membership: React.FC = () => {
    const context = useContext(AuthenContext);
    if (!context) {
        throw new Error("useAuthenContext must be used within an AuthenProvider");
    }

    const { user } = context;
    const [memberships, setMemberships] = useState([]);
    useEffect(() => {
        fetchMembership()
    }, [])
    async function fetchMembership() {
        const data = await ApiGateway.GetAllMemberships();
        console.log(data);
        setMemberships(data);
    }
    const colorString = (index: number): string => {
        switch (index) {
            case 0: return '#ffacdc'
            case 1: return '#fece63'
            case 2: return '#b491ff'
            default: return '#ffacdc'
        }
    };

    const fetchBuyMembership = async (userId: string, membershipId: string): Promise<void> => {
        const data = await ApiGateway.BuyMembership(userId, membershipId);
        window.location.href = data.message;
    }

    return (
        <div id="membership-page">
            <Header isTransparent={false} />
            <div className="body-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
                <div className="body">
                    <h1 className="title">Choose your membership plan</h1>
                    <div className="cards">
                        {memberships.map((membership, index) => {
                            return (
                                <div className="card"
                                    style={{ border: `3px solid ${colorString(index)}` }}
                                    onClick={() => { user ? fetchBuyMembership(user.id, membership.id) : window.location.href = '/login' }}
                                >
                                    <div className="head-card" style={{ backgroundColor: colorString(index) }}>
                                        {membership.name}
                                    </div>
                                    <div className="body-card">
                                        <h2 className="price"><PiCurrencyCircleDollar />{membership.price / 1000}K</h2>
                                        <p className="time-left">/{membership.timeLeft} Days</p>
                                        <p className="discount">Discount {membership.discount * 100}% every day</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership;