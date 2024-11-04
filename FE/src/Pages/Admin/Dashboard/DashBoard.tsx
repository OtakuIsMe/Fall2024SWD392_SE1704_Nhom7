import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import './DashBoard.css'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BorderAll, BorderColor } from '@mui/icons-material';
import Pod1 from '../../../Assets/1POD.jpg';
import Pod2 from '../../../Assets/2POD.jpg';
import Pod4 from '../../../Assets/4POD.jpg';
import Meeting from '../../../Assets/meeting.png';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { ApiGateway } from '../../../Api/ApiGateway';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashBoard: React.FC = () => {
  const [countUser, setCountUser] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [statistic, setStatistic] = useState(
    [
      {
        month: "",
        amount: 0,
        refund: 0
      }

    ]
  )
  const [trending, setTrending] = useState([
    {
      type: 0,
      amount: 0,
      bookingsCount: 0
    }
  ]);
  useEffect(() => {
    fetchUser()
    fetchTotalIncome()
    fetchTotalBooking()
    fetchStatistic(2024)
    fetchTrending()
  }, [])

  async function fetchUser() {
    const data = await ApiGateway.TotalUser()
    setCountUser(data);
  }
  async function fetchTotalIncome() {
    const data = await ApiGateway.TotalIncome()
    setTotalIncome(data);
  }
  async function fetchTotalBooking() {
    const data = await ApiGateway.TotalBooking()
    setTotalBooking(data);
  }
  async function fetchStatistic(year: number) {
    const data = await ApiGateway.Statistic(year);
    setStatistic(data);
  }
  async function fetchTrending() {
    const data = await ApiGateway.Trending();
    setTrending(data);
  }
  const priceConvert = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
  };
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Income",
        data: statistic.map(item => item.amount),
        backgroundColor: '#35bc94',
      },
      {
        label: "expend",
        data: statistic.map(item => item.refund),
        backgroundColor: '#a8abf7',
      }
    ],
  };
  function TrendCard(item: { type: number; amount: number; bookingsCount: number }) {
    let imageSrc;
    let namecard;
    switch (item.type) {
      case 0:
        imageSrc = Pod1;
        namecard = "Single Room";
        break;
      case 1:
        imageSrc = Pod2;
        namecard = "Duo Room";
        break;
      case 2:
        imageSrc = Pod4;
        namecard = "Fourth Room";
        break;
      case 3:
        imageSrc = Meeting;
        namecard = "Meeting Room";
        break;
    }
    return (
      <div className='trend-card'>
        <div className="img-container">
          <img src={imageSrc} alt="" />
        </div>
        <div className="card-detail">
          <div className='name-price'>
            <p className="name">{namecard}</p>
            <p className='amount'><AiOutlineDollarCircle /> <span>{item.amount}</span></p>
          </div>
          <div className='count-booking'>
            <span className='count'><FaPlus /> {item.bookingsCount}</span>
            <span className='booking'>Bookings</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div className="content">
        <div className="card-statistic">
          <div className="total-user-card card">
            <p className='title'>Total Users</p>
            <p className="value">{countUser}</p>
          </div>
          <div className="total-in-come card">
            <p className='title'>Total Income</p>
            <p className="value">{priceConvert(totalIncome)}</p>
          </div>
          <div className="total-booking card">
            <p className='title'>Total Bookings</p>
            <p className="value">{totalBooking}</p>
          </div>
        </div>
        <div className="contend-container">
          <div className="graph-statistic">
            <div className="info-graph">
              <span className='title'>Income Statistic</span>
              <FaCircleInfo />
            </div>
            <div className="bar-chart">
              <Bar data={data} />
            </div>
          </div>
          <div className="trending">
            <div className="title">
              <p>Trending</p>
            </div>
            <div className="types">
              {trending.map((item: { type: number; amount: number; bookingsCount: number }, index: number) => {
                return (
                  <TrendCard
                    key={index}
                    type={item.type}
                    amount={item.amount}
                    bookingsCount={item.bookingsCount}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="background-color-dashboard"></div>
    </div>
  )
}

export default DashBoard