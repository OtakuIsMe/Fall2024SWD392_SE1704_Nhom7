import React from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import './DashBoard.css'

const DashBoard: React.FC = () => {
  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div className="content">
        <div className="card-statistic">
          <div className="total-user-card card">
            <p className='title'>Total Users</p>
            <p className="value">1</p>
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
          </div>
          <div className="new-booking">

          </div>
        </div>
      </div>
      <div className="background-color-dashboard"></div>
    </div>
  )
}

export default DashBoard