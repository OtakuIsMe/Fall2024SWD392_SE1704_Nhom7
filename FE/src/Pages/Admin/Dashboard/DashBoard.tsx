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
  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    const data = await ApiGateway.TotalUser()
    setCountUser(data);
  }
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // Nhãn cho trục X
    datasets: [
      {
        label: "Income",
        data: [100, 200, 500, 100, 200, 300, 100, 200, 300, 100, 200, 300],
        backgroundColor: '#35bc94',
      },
      {
        label: "expend",
        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
        backgroundColor: '#a8abf7',
      }
    ],
  };
  function TrendCard() {
    return (
      <div className='trend-card'>
        <div className="img-container">
          <img src={Pod1} alt="" />
        </div>
        <div className="card-detail">
          <div className='name-price'>
            <p className="name">Single Room</p>
            <p className='amount'><AiOutlineDollarCircle /> <span>20,000</span></p>
          </div>
          <div className='count-booking'>
            <span className='count'><FaPlus /> 20</span>
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
            <p className="value">210,000 VND</p>
          </div>
          <div className="total-booking card">
            <p className='title'>Total Bookings</p>
            <p className="value">1</p>
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
              <TrendCard />
            </div>
          </div>
        </div>
      </div>
      <div className="background-color-dashboard"></div>
    </div>
  )
}

export default DashBoard